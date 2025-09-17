from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from app.schemas.group import GroupCreate, GroupOut, GroupUpdate
from app.schemas.user import PublicUser
from app.utils.security import get_current_user
from app.deps import group_repo

router = APIRouter(prefix="/groups", tags=["Grupos"])

@router.post("", response_model=GroupOut, status_code=201)
async def create_group(payload: GroupCreate, _: PublicUser = Depends(get_current_user)):
    return await group_repo.create(payload)

@router.get("", response_model=list[GroupOut])
async def list_groups(
    q: str | None = Query(None, description="Búsqueda por nombre/descr."),
    category: str | None = Query(None, description="Filtro por categoría (coro, música, danza, teatro, artes)"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    return await group_repo.list(q, category, limit, offset)

@router.get("/{group_id}", response_model=GroupOut)
async def get_group(group_id: UUID):
    g = await group_repo.get(group_id)
    if not g:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
    return g

@router.patch("/{group_id}", response_model=GroupOut)
async def update_group(group_id: UUID, payload: GroupUpdate, _: PublicUser = Depends(get_current_user)):
    g = await group_repo.update(group_id, payload)
    if not g:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
    return g

@router.delete("/{group_id}", status_code=204)
async def delete_group(group_id: UUID, _: PublicUser = Depends(get_current_user)):
    ok = await group_repo.delete(group_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")
