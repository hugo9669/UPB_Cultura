from pydantic import BaseModel, EmailStr, Field
from uuid import UUID

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    email: EmailStr
    full_name: str | None = None
    password: str = Field(min_length=6, max_length=128)

class UserOut(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    full_name: str | None = None
    password_hash: str  # guardado sólo en backend; no exponer al front

class PublicUser(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    full_name: str | None = None
