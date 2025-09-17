# app/deps.py
from app.repositories.memory_user_repo import MemoryUserRepo
from app.repositories.memory_group_repo import MemoryGroupRepo
from app.repositories.memory_event_repo import MemoryEventRepo

# Instancias únicas para toda la app
user_repo = MemoryUserRepo()
group_repo = MemoryGroupRepo()
event_repo = MemoryEventRepo()
# Aquí podrías agregar más repositorios o servicios según se necesite en la app