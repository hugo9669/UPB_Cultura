from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from datetime import datetime

from app.schemas.event import EventCreate, EventOut, EventUpdate
from app.schemas.user import PublicUser
from app.utils.security import get_current_user
from app.deps import event_repo

router = APIRouter(prefix="/events", tags=["Eventos"])

@router.post("", response_model=EventOut, status_code=201)
async def create_event(payload: EventCreate, _: PublicUser = Depends(get_current_user)):
    if payload.end_at < payload.start_at:
        raise HTTPException(status_code=400, detail="end_at no puede ser anterior a start_at")
    return await event_repo.create(payload)

@router.get("", response_model=list[EventOut])
async def list_events(
    q: str | None = Query(None, description="Texto en título/descr./ubicación"),
    group_id: UUID | None = Query(None),
    category: str | None = Query(None, description="Ej: ensayo, presentacion, taller"),
    date_from: datetime | None = Query(None),
    date_to: datetime | None = Query(None),
    upcoming: bool = Query(True, description="Por defecto solo próximos (start_at >= ahora)"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    return await event_repo.list(q, group_id, category, date_from, date_to, upcoming, limit, offset)

@router.get("/{event_id}", response_model=EventOut)
async def get_event(event_id: UUID):
    e = await event_repo.get(event_id)
    if not e:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return e

@router.patch("/{event_id}", response_model=EventOut)
async def update_event(event_id: UUID, payload: EventUpdate, _: PublicUser = Depends(get_current_user)):
    if payload.start_at and payload.end_at and payload.end_at < payload.start_at:
        raise HTTPException(status_code=400, detail="end_at no puede ser anterior a start_at")
    e = await event_repo.update(event_id, payload)
    if not e:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return e

@router.delete("/{event_id}", status_code=204)
async def delete_event(event_id: UUID, _: PublicUser = Depends(get_current_user)):
    ok = await event_repo.delete(event_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
