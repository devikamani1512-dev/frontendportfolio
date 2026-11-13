import os
from contextlib import asynccontextmanager, contextmanager
from datetime import datetime, timedelta, timezone

import jwt
import psycopg
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb
from pydantic import BaseModel, Field

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


# =====================================================
# FIRST-TIME DATA (table empty ah irundha mattum insert aagum)
# =====================================================

SEED_PROJECTS = [
    {
        "title": "Phototype Portfolio",
        "description": "A responsive portfolio website created using HTML, CSS and JavaScript with a clean and user-friendly design.",
        "technologies": ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
        "image": "phototype",
        "link": "https://devikamani1512-dev.github.io/phototype/",
    },
    {
        "title": "FoodFlow Mobile App",
        "description": "A responsive food and mobile application interface developed using modern frontend technologies.",
        "technologies": ["HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "REACT", "REACT NATIVE", "REACT ROUTER"],
        "image": "foodflow",
        "link": "https://foodflow-nine-liart.vercel.app/",
    },
    {
        "title": "GroCo Grocery App",
        "description": "A modern grocery shopping web application with responsive layouts, product categories and a user-friendly interface.",
        "technologies": ["HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "REACT", "REACT ROUTER"],
        "image": "groco",
        "link": "https://groceryapp-one.vercel.app/",
    },
    {
        "title": "HopeHands Charity Website",
        "description": "A responsive charity website with causes, donation, volunteer and contact sections designed for a smooth user experience.",
        "technologies": ["HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "REACT", "REACT ROUTER"],
        "image": "hopehands",
        "link": "https://charityproject-two.vercel.app/",
    },
    {
        "title": "To Do List App (Internship)",
        "description": "A task management app to add, track and complete daily to-dos.",
        "technologies": ["REACT", "JAVASCRIPT", "CSS"],
        "image": "todolist",
        "link": "https://todolist-waoe.vercel.app/",
        "github": "https://github.com/devikamani1512-dev/todolist",
    },
    {
        "title": "Learnova Learning App",
        "description": "A learning platform app with courses and a clean, responsive interface.",
        "technologies": ["REACT", "JAVASCRIPT", "CSS"],
        "image": "learnova",
        "link": "https://learnova-xi-blond.vercel.app/",
        "github": "https://github.com/devikamani1512-dev/learnova",
    },
    {
        "title": "Stationery Shop",
        "description": "A stationery e-commerce web application built with Django.",
        "technologies": ["PYTHON", "DJANGO", "HTML", "CSS"],
        "image": "stationery",
        "link": "https://stationaryshop-hazel.vercel.app/",
        "github": "https://github.com/devikamani1512-dev/stationaryshop",
    },
    {
        "title": "StepUp Shoe Ecommerce",
        "description": "A full stack shoe e-commerce project with a REST API backend and Swagger documentation.",
        "technologies": ["DJANGO", "DRF", "POSTGRESQL", "REACT"],
        "image": "stepup",
        "link": "https://shoeecommerce-six.vercel.app",
        "github": "https://github.com/devikamani1512-dev/shoeecommerce",
        "api": "https://shoeecommerce-snve.onrender.com/api/schema/swagger-ui/",
    },
]

SEED_SKILLS = [
    {
        "title": "Frontend Development",
        "icon": "</>",
        "description": "Creating responsive, user-friendly and modern web and mobile interfaces using modern frontend technologies.",
        "tags": ["HTML", "CSS", "JAVASCRIPT", "REACT", "REACT NATIVE", "TAILWIND CSS"],
    },
    {
        "title": "Backend Development",
        "icon": "PY",
        "description": "Currently developing backend development skills using Python and learning how to build practical backend applications.",
        "tags": ["PYTHON", "BACKEND", "API", "Django", "Django Rest Framework", "MY SQL", "MongoDB"],
    },
    {
        "title": "Tools & Technologies",
        "icon": "⚙",
        "description": "Using modern development tools to build, manage and deploy web applications efficiently.",
        "tags": ["GITHUB", "VS CODE", "VERCEL", "RENDER"],
    },
]


# =====================================================
# DATABASE
# =====================================================

TABLES = ("projects", "skills", "messages")


@contextmanager
def db():
    # connection close aagumbodhu automatic ah commit aagum
    with psycopg.connect(DATABASE_URL, row_factory=dict_row) as conn:
        yield conn


def init_db():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL environment variable set pannala")

    with db() as conn:
        for t in TABLES:
            conn.execute(
                f"""CREATE TABLE IF NOT EXISTS {t} (
                    id SERIAL PRIMARY KEY,
                    data JSONB NOT NULL,
                    created_at TIMESTAMPTZ DEFAULT now()
                )"""
            )

        for t, seed in (("projects", SEED_PROJECTS), ("skills", SEED_SKILLS)):
            count = conn.execute(f"SELECT COUNT(*) AS c FROM {t}").fetchone()["c"]
            if count == 0:
                for item in seed:
                    conn.execute(f"INSERT INTO {t} (data) VALUES (%s)", (Jsonb(item),))


def list_rows(table):
    with db() as conn:
        rows = conn.execute(f"SELECT id, data FROM {table} ORDER BY id").fetchall()
    return [{**r["data"], "id": r["id"]} for r in rows]


def insert_row(table, data):
    with db() as conn:
        row = conn.execute(
            f"INSERT INTO {table} (data) VALUES (%s) RETURNING id", (Jsonb(data),)
        ).fetchone()
    return {**data, "id": row["id"]}


def update_row(table, rid, data):
    with db() as conn:
        row = conn.execute(
            f"UPDATE {table} SET data = %s WHERE id = %s RETURNING id",
            (Jsonb(data), rid),
        ).fetchone()
    if not row:
        raise HTTPException(404, "Not found")
    return {**data, "id": rid}


def delete_row(table, rid):
    with db() as conn:
        row = conn.execute(
            f"DELETE FROM {table} WHERE id = %s RETURNING id", (rid,)
        ).fetchone()
    if not row:
        raise HTTPException(404, "Not found")
    return {"status": "deleted"}


# =====================================================
# APP
# =====================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "https://frontendportfolio-three.vercel.app",  # Vercel frontend
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# MODELS
# =====================================================

class Login(BaseModel):
    username: str
    password: str


class Project(BaseModel):
    title: str
    description: str
    technologies: list[str]
    image: str
    link: str
    github: str | None = None
    api: str | None = None


class Skill(BaseModel):
    title: str
    icon: str = ""
    description: str
    tags: list[str]


class Message(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=3, max_length=200)
    subject: str = Field(default="", max_length=200)
    message: str = Field(min_length=1, max_length=5000)


# =====================================================
# ADMIN AUTH
# =====================================================

bearer = HTTPBearer()


@app.post("/admin/login")
def login(c: Login):
    if c.username != os.getenv("ADMIN_USERNAME") or c.password != os.getenv("ADMIN_PASSWORD"):
        raise HTTPException(401, "Invalid credentials")
    exp = datetime.now(timezone.utc) + timedelta(hours=2)
    token = jwt.encode({"sub": c.username, "exp": exp}, os.getenv("JWT_SECRET"), algorithm="HS256")
    return {"token": token}


def require_admin(cred: HTTPAuthorizationCredentials = Depends(bearer)):
    try:
        jwt.decode(cred.credentials, os.getenv("JWT_SECRET"), algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(401, "Invalid or expired token")


# =====================================================
# PROJECTS
# =====================================================

@app.get("/projects")
def get_projects():
    return list_rows("projects")


@app.post("/projects", dependencies=[Depends(require_admin)])
def add_project(p: Project):
    return insert_row("projects", p.model_dump(exclude_none=True))


@app.put("/projects/{pid}", dependencies=[Depends(require_admin)])
def update_project(pid: int, p: Project):
    return update_row("projects", pid, p.model_dump(exclude_none=True))


@app.delete("/projects/{pid}", dependencies=[Depends(require_admin)])
def delete_project(pid: int):
    return delete_row("projects", pid)


# =====================================================
# SKILLS
# =====================================================

@app.get("/skills")
def get_skills():
    return list_rows("skills")


@app.post("/skills", dependencies=[Depends(require_admin)])
def add_skill(s: Skill):
    return insert_row("skills", s.model_dump())


@app.put("/skills/{sid}", dependencies=[Depends(require_admin)])
def update_skill(sid: int, s: Skill):
    return update_row("skills", sid, s.model_dump())


@app.delete("/skills/{sid}", dependencies=[Depends(require_admin)])
def delete_skill(sid: int):
    return delete_row("skills", sid)


# =====================================================
# CONTACT MESSAGES
# =====================================================

@app.post("/contact")
def contact(msg: Message):
    insert_row("messages", msg.model_dump())
    return {"status": "received"}


@app.get("/admin/messages", dependencies=[Depends(require_admin)])
def get_messages():
    with db() as conn:
        rows = conn.execute(
            "SELECT id, data, created_at FROM messages ORDER BY id DESC"
        ).fetchall()
    return [
        {**r["data"], "id": r["id"], "time": r["created_at"].isoformat()}
        for r in rows
    ]


@app.delete("/admin/messages/{mid}", dependencies=[Depends(require_admin)])
def delete_message(mid: int):
    return delete_row("messages", mid)