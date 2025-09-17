from pydantic import BaseModel, Field
from uuid import UUID

class GroupCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    category: str = Field(description="Ej: coro, musica, danza, teatro, artes")
    description: str | None = None

class GroupUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    description: str | None = None

class GroupOut(BaseModel):
    id: UUID
    name: str
    category: str
    description: str | None = None
