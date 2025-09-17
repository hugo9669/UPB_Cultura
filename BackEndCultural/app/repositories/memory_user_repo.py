from typing import Optional, Dict
from uuid import uuid4, UUID

from app.schemas.user import UserOut, UserCreate
from app.utils.security import hash_password


class MemoryUserRepo:
    def __init__(self) -> None:
        self._by_id: Dict[UUID, UserOut] = {}
        self._by_username: Dict[str, UUID] = {}
        self._by_email: Dict[str, UUID] = {}

    async def create(self, data: UserCreate) -> UserOut:
        if await self.get_by_username(data.username):
            raise ValueError("username ya existe")
        if await self.get_by_email(data.email):
            raise ValueError("email ya existe")

        uid = uuid4()
        user = UserOut(
            id=uid,
            username=data.username,
            email=data.email,
            full_name=data.full_name,
            password_hash=hash_password(data.password),
            role=getattr(data, "role", "miembro"),
        )
        self._by_id[uid] = user
        self._by_username[user.username] = uid
        self._by_email[user.email] = uid
        return user

    async def get_by_id(self, user_id: UUID) -> Optional[UserOut]:
        return self._by_id.get(user_id)

    async def get_by_username(self, username: str) -> Optional[UserOut]:
        uid = self._by_username.get(username)
        return self._by_id.get(uid) if uid else None

    async def get_by_email(self, email: str) -> Optional[UserOut]:
        uid = self._by_email.get(email)
        return self._by_id.get(uid) if uid else None
