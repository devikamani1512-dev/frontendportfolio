import json
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "https://frontendportfolio-three.vercel.app",  # Vercel frontend
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

projects = [
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


class Message(BaseModel):
    name: str
    email: str
    message: str


@app.get("/projects")
def get_projects():
    return projects


@app.post("/contact")
def contact(msg: Message):
    with open("messages.jsonl", "a") as f:
        f.write(json.dumps({**msg.model_dump(), "time": str(datetime.now())}) + "\n")
    return {"status": "received"}