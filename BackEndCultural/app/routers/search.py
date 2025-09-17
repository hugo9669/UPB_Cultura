from fastapi import APIRouter, Query
from app.deps import group_repo, event_repo

router = APIRouter(prefix="/search", tags=["Búsqueda"])

@router.get("")
async def global_search(
    q: str = Query(..., min_length=1, description="Texto a buscar en grupos y eventos"),
    limit_groups: int = 10,
    limit_events: int = 10,
):
    groups = await group_repo.list(q=q, category=None, limit=limit_groups, offset=0)
    events = await event_repo.list(
        q=q, group_id=None, category=None, date_from=None, date_to=None, upcoming=False, limit=limit_events, offset=0
    )
    return {
        "groups": groups,
        "events": events,
    }
