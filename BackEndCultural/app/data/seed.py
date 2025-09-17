from datetime import datetime, timedelta
from app.deps import group_repo, event_repo
from app.schemas.group import GroupCreate
from app.schemas.event import EventCreate

async def seed():
    # Evita sembrar doble si ya hay datos (opcional, según tu repo)
    if hasattr(group_repo, "count") and await group_repo.count() > 0:
        return

    # --- Grupos base ---
    coro = await group_repo.create(GroupCreate(
        name="Coro UPB",
        category="musica",
        description="Coro polifónico universitario",
        contact_email="coro@upb.edu.co",
    ))
    danza = await group_repo.create(GroupCreate(
        name="Danza Folclórica",
        category="danza",
        description="Danzas tradicionales de Colombia",
        contact_email="danza@upb.edu.co",
    ))
    teatro = await group_repo.create(GroupCreate(
        name="Teatro Experimental",
        category="teatro",
        description="Montajes y muestras universitarias",
        contact_email="teatro@upb.edu.co",
    ))

    now = datetime.utcnow()

    # --- Eventos próximos ---
    await event_repo.create(EventCreate(
        title="Concierto de Primavera",
        description="Repertorio coral latinoamericano",
        category="presentacion",               # (o type si tu schema lo llama así)
        group_id=coro.id,
        location="Auditorio Central UPB",
        start_at=now + timedelta(days=2),
        end_at=now + timedelta(days=2, hours=2),
        # opcionales si los tienes en el schema:
        visibility="publico",
        tickets_url=None,
        contact_url=None,
        published_at=now + timedelta(days=1),
    ))

    await event_repo.create(EventCreate(
        title="Ensayo General Danza",
        description="Coreografía para festival universitario",
        category="ensayo",
        group_id=danza.id,
        location="Sala Danza 1",
        start_at=now + timedelta(days=1, hours=3),
        end_at=now + timedelta(days=1, hours=5),
        visibility="miembros",
        published_at=now,
    ))

    # --- Evento pasado (para probar upcoming=False) ---
    await event_repo.create(EventCreate(
        title="Taller de Impro Teatral",
        description="Introducción a técnicas de improvisación",
        category="taller",
        group_id=teatro.id,
        location="Sala Negra",
        start_at=now - timedelta(days=10),
        end_at=now - timedelta(days=10, hours=-2),
        visibility="publico",
        published_at=now - timedelta(days=11),
    ))
    # --- Evento futuro no publicado (para probar filtros) ---
    
