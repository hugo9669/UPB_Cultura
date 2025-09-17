from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

class EventCreate(BaseModel):
    title: str = Field(min_length=2, max_length=120)
    description: str | None = None
    category: str = Field(description="Ej: concierto, exposición, función, taller")
    group_id: UUID
    location: str
    start_at: datetime
    end_at: datetime

class EventUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    category: str | None = None
    group_id: UUID | None = None
    location: str | None = None
    start_at: datetime | None = None
    end_at: datetime | None = None

class EventOut(BaseModel):
    id: UUID
    title: str
    description: str | None = None
    category: str
    group_id: UUID
    location: str
    start_at: datetime
    end_at: datetime
