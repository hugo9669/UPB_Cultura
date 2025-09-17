from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import CORS_ORIGINS
from app.routers import auth, groups, events, search
from app.data.seed import seed

app = FastAPI(
    title="Plataforma Cultural – Backend",
    version="0.1.0",
    description="API para gestión de grupos culturales y eventos (sin DB, repos en memoria).",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if CORS_ORIGINS == ["*"] else CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(groups.router)
app.include_router(events.router)
app.include_router(search.router)

@app.get("/")
def root():
    return {"ok": True, "service": "cultura-backend", "docs": "/docs"}

@app.on_event("startup")
async def on_startup():
    await seed()
    


