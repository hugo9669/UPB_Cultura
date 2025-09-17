from typing import Optional, Dict, List
from uuid import uuid4, UUID
from app.schemas.group import GroupCreate, GroupOut, GroupUpdate

class MemoryGroupRepo:
    def __init__(self) -> None:
        self._store: Dict[UUID, GroupOut] = {}

    async def create(self, data: GroupCreate) -> GroupOut:
        gid = uuid4()
        group = GroupOut(id=gid, name=data.name, category=data.category, description=data.description)
        self._store[gid] = group
        return group

    async def list(self, q: Optional[str], category: Optional[str], limit: int, offset: int) -> List[GroupOut]:
        items = list(self._store.values())
        if q:
            qlow = q.lower()
            items = [g for g in items if qlow in g.name.lower() or (g.description and qlow in g.description.lower())]
        if category:
            items = [g for g in items if g.category.lower() == category.lower()]
        return items[offset: offset + limit]

    async def get(self, group_id: UUID) -> Optional[GroupOut]:
        return self._store.get(group_id)

    async def update(self, group_id: UUID, data: GroupUpdate) -> Optional[GroupOut]:
        current = self._store.get(group_id)
        if not current:
            return None
        updated = GroupOut(
            id=current.id,
            name=data.name or current.name,
            category=data.category or current.category,
            description=data.description if data.description is not None else current.description,
        )
        self._store[group_id] = updated
        return updated

    async def delete(self, group_id: UUID) -> bool:
        return self._store.pop(group_id, None) is not None
