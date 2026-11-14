import os
import time
from collections import defaultdict
from contextlib import asynccontextmanager, contextmanager
from datetime import datetime, timedelta, timezone

import jwt
import psycopg
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from groq import Groq
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb
from pydantic import BaseModel, Field

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# =====================================================
# CHATBOT SETTINGS
# =====================================================

PROFILE = """
Name: U. Devika Manikandan, Gen AI Python Full Stack Developer (Trainee) from Rajapalayam, Tamil Nadu.
Training: Gen AI Python Full Stack Development at Vetri Technology Solutions (Jul 2026 to Nov 2026, in progress). Selected for a Full Stack Developer internship there.
Frontend skills: HTML5, CSS3, JavaScript, React.js, React Native, Tailwind CSS.
Backend and learning: Python, Django, Django REST Framework, FastAPI, REST APIs, PostgreSQL, MySQL, MongoDB, Generative AI (LLMs, LangGraph, Vector Databases).
Tools: GitHub, VS Code, Vercel.
Agentic AI: built LangGraph workflows such as a self-reviewing content loop, support ticket router, content moderation graph, research assistant and interview simulation.
Background: 9 years as Production Incharge in a textile spinning mill (2013 to 2022), then Lecturer in Diploma in Textile Technology at P.A.C. Ramasamy Raja Polytechnic College (2022 to Aug 2026).
Education: BBA from Madurai Kamaraj University (2018), Diploma in Textile Technology (2013).
Contact: devikamani1512@gmail.com, LinkedIn linkedin.com/in/devika-u1503, GitHub github.com/devikamani1512-dev
"""

hits = defaultdict(list)


def rate_limit(request: Request):
    ip = request.client.host
    now = time.time()
    hits[ip] = [t for t in hits[ip] if now - t < 60]
    if len(hits[ip]) >= 10:
        raise HTTPException(429, "Too many requests, try again in a minute")
    hits[ip].append(now)


class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=300)


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

SEED_EXPERIENCE = [
    {
        "role": "Production Incharge",
        "company": "Sri Jayajothi & Company Private Limited",
        "location": "Rajapalayam",
        "duration": "01 June 2013 - 01 May 2022",
        "experience": "9 Years",
        "image": "srijayajothi",
        "type": "company",
    },
    {
        "role": "Lecturer - Diploma in Textile Technology",
        "company": "P.A.C. Ramasamy Raja Polytechnic College",
        "location": "Rajapalayam",
        "duration": "01 June 2022 - 07 August 2026",
        "experience": "4 Years",
        "image": "college",
        "type": "college",
    },
]


# =====================================================
# DATABASE
# =====================================================

TABLES = ("projects", "skills", "messages", "experience")


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

        for t, seed in (
            ("projects", SEED_PROJECTS),
            ("skills", SEED_SKILLS),
            ("experience", SEED_EXPERIENCE),
        ):
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


class Experience(BaseModel):
    role: str
    company: str
    location: str = ""
    duration: str
    experience: str = ""
    image: str = ""
    type: str = "company"


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
# EXPERIENCE
# =====================================================

@app.get("/experience")
def get_experience():
    return list_rows("experience")


@app.post("/experience", dependencies=[Depends(require_admin)])
def add_experience(e: Experience):
    return insert_row("experience", e.model_dump())


@app.put("/experience/{eid}", dependencies=[Depends(require_admin)])
def update_experience(eid: int, e: Experience):
    return update_row("experience", eid, e.model_dump())


@app.delete("/experience/{eid}", dependencies=[Depends(require_admin)])
def delete_experience(eid: int):
    return delete_row("experience", eid)


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


# =====================================================
# RESUME
# =====================================================

@app.get("/resume")
def resume():
    return FileResponse(
        "Devika_Manikandan_Resume.pdf",
        media_type="application/pdf",
        filename="Devika_Manikandan_Resume.pdf",
    )


# =====================================================
# AI CHATBOT
# =====================================================

@app.post("/chat", dependencies=[Depends(rate_limit)])
def chat(m: ChatIn):
    projects_text = "\n".join(
        f"- {p['title']}: {p['description']} (Tech: {', '.join(p['technologies'])})"
        for p in list_rows("projects")
    )
    skills_text = "\n".join(
        f"- {s['title']}: {', '.join(s['tags'])}" for s in list_rows("skills")
    )
    exp_text = "\n".join(
        f"- {x['role']} at {x['company']} ({x['duration']})"
        for x in list_rows("experience")
    )
    system = (
        "You are the AI assistant on Devika Manikandan's portfolio website. "
        "Answer visitors in 2-3 short sentences using ONLY the information below. "
        "If the answer is not there, say you don't have that information and suggest emailing her. "
        "If the question is unrelated to Devika, politely say you can only answer questions about her skills, projects and experience.\n\n"
        f"{PROFILE}\nProjects:\n{projects_text}\nSkills:\n{skills_text}\nExperience:\n{exp_text}"
    )
    try:
        r = client.chat.completions.create(
            model=os.getenv("GROQ_MODEL", "openai/gpt-oss-20b"),
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": m.message},
            ],
        )
    except Exception:
        raise HTTPException(502, "AI service unavailable")
    return {"reply": r.choices[0].message.content}