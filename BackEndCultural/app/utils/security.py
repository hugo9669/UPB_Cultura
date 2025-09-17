from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.config import JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from app.deps import user_repo  # debe exponer get_by_username(...)

# ----- Password hashing -----
_pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return _pwd_ctx.hash(password)

def verify_password(plain_password: str, password_hash: str) -> bool:
    return _pwd_ctx.verify(plain_password, password_hash)

# ----- OAuth2 Bearer (para Swagger "Authorize") -----
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ----- JWT helpers -----
def create_access_token(sub: str, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES) -> str:
    """
    sub: normalmente el username o user_id.
    """
    now = datetime.now(timezone.utc)
    payload = {
        "sub": sub,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_minutes)).timestamp()),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

# ----- Dependency: usuario actual -----
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Devuelve el usuario a partir del Bearer token o lanza 401.
    """
    cred_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        username: Optional[str] = payload.get("sub")
        if not username:
            raise cred_exc
    except JWTError:
        raise cred_exc

    user = await user_repo.get_by_username(username)
    if not user:
        raise cred_exc
    return user
