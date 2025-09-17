from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class Paginated(BaseModel):
    total: int | None = None  # opcional (en memoria no llevamos total exacto)
    limit: int
    offset: int
