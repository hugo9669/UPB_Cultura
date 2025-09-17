from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.auth import RegisterIn
from app.schemas.common import Token
from app.schemas.user import PublicUser
from app.utils.security import verify_password, create_access_token, get_current_user
from app.deps import user_repo

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=PublicUser, status_code=201)
async def register(payload: RegisterIn):
    try:
        user = await user_repo.create(payload)
        # No devolvemos el hash
        return PublicUser(id=user.id, username=user.username, email=user.email, full_name=user.full_name)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = await user_repo.get_by_username(form.username)
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")
    token = create_access_token(sub=user.username)
    return Token(access_token=token)

@router.get("/me", response_model=PublicUser)
async def me(current = Depends(get_current_user)):
    return PublicUser(id=current.id, username=current.username, email=current.email, full_name=current.full_name)
