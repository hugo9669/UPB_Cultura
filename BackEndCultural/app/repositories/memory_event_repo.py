from typing import Optional, Dict, List
from uuid import uuid4, UUID
from datetime import datetime

from app.schemas.event import EventCreate, EventOut, EventUpdate


class MemoryEventRepo:
    def __init__(self) -> None:
        self._store: Dict[UUID, EventOut] = {}

    async def create(self, data: EventCreate) -> EventOut:
        eid = uuid4()
        evt = EventOut(
            id=eid,
            title=data.title,
            description=data.description,
            category=data.category,     # o type si lo tienes así
            group_id=data.group_id,
            location=data.location,
            start_at=data.start_at,
            end_at=data.end_at,
            visibility=getattr(data, "visibility", "publico"),
            tickets_url=getattr(data, "tickets_url", None),
            contact_url=getattr(data, "contact_url", None),
            published_at=getattr(data, "published_at", None),
        )
        self._store[eid] = evt
        return evt

    async def list(
        self,
        q: Optional[str],
        group_id: Optional[UUID],
        category: Optional[str],
        date_from: Optional[datetime],
        date_to: Optional[datetime],
        upcoming: bool,
        limit: int,
        offset: int,
    ) -> List[EventOut]:
        items = list(self._store.values())

        if q:
            ql = q.lower()
            items = [
                e for e in items
                if ql in e.title.lower()
                or (e.description and ql in e.description.lower())
                or (e.location and ql in e.location.lower())
            ]
        if group_id:
            items = [e for e in items if e.group_id == group_id]
        if category:
            items = [e for e in items if e.category == category]

        def naive(dt: datetime) -> datetime:
            return dt.replace(tzinfo=None) if dt.tzinfo else dt

        now = datetime.utcnow()
        if upcoming:
            items = [e for e in items if naive(e.start_at) >= now]
        if date_from:
            df = naive(date_from)
            items = [e for e in items if naive(e.start_at) >= df]
        if date_to:
            dtv = naive(date_to)
            items = [e for e in items if naive(e.start_at) <= dtv]

        items.sort(key=lambda e: e.start_at)
        return items[offset: offset + limit]

    async def get(self, event_id: UUID) -> Optional[EventOut]:
        return self._store.get(event_id)

    async def update(self, event_id: UUID, data: EventUpdate) -> Optional[EventOut]:
        current = self._store.get(event_id)
        if not current:
            return None
        updated = EventOut(
            id=current.id,
            title=data.title or current.title,
            description=current.description if data.description is None else data.description,
            category=data.category or current.category,
            group_id=data.group_id or current.group_id,
            location=data.location or current.location,
            start_at=data.start_at or current.start_at,
            end_at=data.end_at or current.end_at,
            visibility=data.visibility or getattr(current, "visibility", "publico"),
            tickets_url=data.tickets_url if data.tickets_url is not None else getattr(current, "tickets_url", None),
            contact_url=data.contact_url if data.contact_url is not None else getattr(current, "contact_url", None),
            published_at=data.published_at if data.published_at is not None else getattr(current, "published_at", None),
        )
        self._store[event_id] = updated
        return updated

    async def delete(self, event_id: UUID) -> bool:
        return self._store.pop(event_id, None) is not None
