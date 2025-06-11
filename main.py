from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.exc import SQLAlchemyError
import os
from dotenv import load_dotenv
from models import Base, Admin, PendingAdmin, FormField, FormText, Application
from sqlalchemy import select, text
from pydantic import BaseModel
from typing import List
import json
import logging
import ssl

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# Database configuration for serverless environment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./frpdb.db")

# For PostgreSQL (Neon), use the provided connection string
if "postgresql" in DATABASE_URL:
    logger.info("Using PostgreSQL database")
    connect_args = {"ssl": ssl.create_default_context()}
else:
    # Fallback to SQLite for local development
    logger.info("Using SQLite database for local development")
    connect_args = {"check_same_thread": False}

try:
    engine = create_async_engine(
        DATABASE_URL, 
        echo=False,  # Set to False for production
        connect_args=connect_args
    )
    async_session = async_sessionmaker(engine, expire_on_commit=False)
    logger.info(f"Database engine created successfully with URL: {DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else DATABASE_URL}")
except Exception as e:
    logger.error(f"Failed to create database engine: {e}")
    raise

app = FastAPI(title="SDU BKFT FRP Sistemleri API")

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Güvenlik için production'da spesifik domainler belirtin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        raise

async def get_session() -> AsyncSession:
    try:
        async with async_session() as session:
            yield session
    except Exception as e:
        logger.error(f"Database session error: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")

@app.get("/")
async def root():
    return {"message": "SDU BKFT FRP Sistemleri API - Python FastAPI + PostgreSQL"}

@app.get("/health")
async def health_check():
    try:
        # Test database connection
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected",
            "environment": "production" if os.getenv("VERCEL") else "development"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "environment": "production" if os.getenv("VERCEL") else "development"
        }

class AdminCreate(BaseModel):
    username: str
    password: str = None
    noPassword: bool = False

class AdminRead(BaseModel):
    id: int
    username: str
    noPassword: bool

    class Config:
        from_attributes = True

@app.post("/admins/", response_model=AdminRead)
async def create_admin(admin: AdminCreate, session: AsyncSession = Depends(get_session)):
    try:
        db_admin = Admin(username=admin.username, password=admin.password, noPassword=admin.noPassword)
        session.add(db_admin)
        await session.commit()
        await session.refresh(db_admin)
        return db_admin
    except SQLAlchemyError as e:
        await session.rollback()
        logger.error(f"Database error creating admin: {e}")
        raise HTTPException(status_code=500, detail="Failed to create admin")
    except Exception as e:
        await session.rollback()
        logger.error(f"Unexpected error creating admin: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/admins/", response_model=List[AdminRead])
async def list_admins(session: AsyncSession = Depends(get_session)):
    try:
        result = await session.execute(select(Admin))
        admins = result.scalars().all()
        return admins
    except SQLAlchemyError as e:
        logger.error(f"Database error listing admins: {e}")
        raise HTTPException(status_code=500, detail="Failed to list admins")
    except Exception as e:
        logger.error(f"Unexpected error listing admins: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# --- PendingAdmin ---
class PendingAdminCreate(BaseModel):
    name: str
    username: str
    password: str
    email: str = None
    approved: bool = False
    approvalToken: str

class PendingAdminRead(BaseModel):
    id: int
    name: str
    username: str
    email: str = None
    approved: bool
    createdAt: str
    approvalToken: str

    class Config:
        from_attributes = True

@app.post("/pending_admins/", response_model=PendingAdminRead)
async def create_pending_admin(pending_admin: PendingAdminCreate, session: AsyncSession = Depends(get_session)):
    try:
        db_obj = PendingAdmin(**pending_admin.dict())
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj
    except SQLAlchemyError as e:
        await session.rollback()
        logger.error(f"Database error creating pending admin: {e}")
        raise HTTPException(status_code=500, detail="Failed to create pending admin")
    except Exception as e:
        await session.rollback()
        logger.error(f"Unexpected error creating pending admin: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/pending_admins/", response_model=List[PendingAdminRead])
async def list_pending_admins(session: AsyncSession = Depends(get_session)):
    try:
        result = await session.execute(select(PendingAdmin))
        return result.scalars().all()
    except SQLAlchemyError as e:
        logger.error(f"Database error listing pending admins: {e}")
        raise HTTPException(status_code=500, detail="Failed to list pending admins")
    except Exception as e:
        logger.error(f"Unexpected error listing pending admins: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# --- FormField ---
class FormFieldCreate(BaseModel):
    label: str
    type: str = "text"
    options: List[str] = None
    maxResponses: List[int] = None
    required: bool = False
    order: int = 0

class FormFieldRead(BaseModel):
    id: int
    label: str
    type: str
    options: List[str] = None
    maxResponses: List[int] = None
    required: bool
    order: int

    class Config:
        from_attributes = True

@app.post("/form_fields/", response_model=FormFieldRead)
async def create_form_field(field: FormFieldCreate, session: AsyncSession = Depends(get_session)):
    try:
        db_obj = FormField(
            label=field.label,
            type=field.type,
            options=json.dumps(field.options) if field.options else None,
            maxResponses=json.dumps(field.maxResponses) if field.maxResponses else None,
            required=field.required,
            order=field.order
        )
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        # JSON alanları deserialize et
        return FormFieldRead(
            id=db_obj.id,
            label=db_obj.label,
            type=db_obj.type,
            options=json.loads(db_obj.options) if db_obj.options else None,
            maxResponses=json.loads(db_obj.maxResponses) if db_obj.maxResponses else None,
            required=db_obj.required,
            order=db_obj.order
        )
    except SQLAlchemyError as e:
        await session.rollback()
        logger.error(f"Database error creating form field: {e}")
        raise HTTPException(status_code=500, detail="Failed to create form field")
    except Exception as e:
        await session.rollback()
        logger.error(f"Unexpected error creating form field: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/form_fields/", response_model=List[FormFieldRead])
async def list_form_fields(session: AsyncSession = Depends(get_session)):
    try:
        result = await session.execute(select(FormField))
        fields = result.scalars().all()
        # JSON alanları deserialize et
        return [FormFieldRead(
            id=f.id,
            label=f.label,
            type=f.type,
            options=json.loads(f.options) if f.options else None,
            maxResponses=json.loads(f.maxResponses) if f.maxResponses else None,
            required=f.required,
            order=f.order
        ) for f in fields]
    except SQLAlchemyError as e:
        logger.error(f"Database error listing form fields: {e}")
        raise HTTPException(status_code=500, detail="Failed to list form fields")
    except Exception as e:
        logger.error(f"Unexpected error listing form fields: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# --- FormText ---
class FormTextCreate(BaseModel):
    title: str
    content: str
    order: int = 0

class FormTextRead(BaseModel):
    id: int
    title: str
    content: str
    order: int
    createdAt: str
    updatedAt: str

    class Config:
        from_attributes = True

@app.post("/form_texts/", response_model=FormTextRead)
async def create_form_text(text: FormTextCreate, session: AsyncSession = Depends(get_session)):
    try:
        db_obj = FormText(
            title=text.title,
            content=text.content,
            order=text.order
        )
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj
    except SQLAlchemyError as e:
        await session.rollback()
        logger.error(f"Database error creating form text: {e}")
        raise HTTPException(status_code=500, detail="Failed to create form text")
    except Exception as e:
        await session.rollback()
        logger.error(f"Unexpected error creating form text: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/form_texts/", response_model=List[FormTextRead])
async def list_form_texts(session: AsyncSession = Depends(get_session)):
    try:
        result = await session.execute(select(FormText))
        return result.scalars().all()
    except SQLAlchemyError as e:
        logger.error(f"Database error listing form texts: {e}")
        raise HTTPException(status_code=500, detail="Failed to list form texts")
    except Exception as e:
        logger.error(f"Unexpected error listing form texts: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# --- Application ---
class ApplicationAnswer(BaseModel):
    field: int
    value: str = None
    selectedOption: int = None

class ApplicationCreate(BaseModel):
    answers: List[ApplicationAnswer]

class ApplicationRead(BaseModel):
    id: int
    answers: List[ApplicationAnswer]
    createdAt: str

    class Config:
        from_attributes = True

@app.post("/applications/", response_model=ApplicationRead)
async def create_application(apply: ApplicationCreate, session: AsyncSession = Depends(get_session)):
    try:
        db_obj = Application(
            answers=json.dumps([a.dict() for a in apply.answers]),
        )
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return ApplicationRead(
            id=db_obj.id,
            answers=json.loads(db_obj.answers),
            createdAt=str(db_obj.createdAt)
        )
    except SQLAlchemyError as e:
        await session.rollback()
        logger.error(f"Database error creating application: {e}")
        raise HTTPException(status_code=500, detail="Failed to create application")
    except Exception as e:
        await session.rollback()
        logger.error(f"Unexpected error creating application: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/applications/", response_model=List[ApplicationRead])
async def list_applications(session: AsyncSession = Depends(get_session)):
    try:
        result = await session.execute(select(Application))
        apps = result.scalars().all()
        return [ApplicationRead(
            id=a.id,
            answers=json.loads(a.answers),
            createdAt=str(a.createdAt)
        ) for a in apps]
    except SQLAlchemyError as e:
        logger.error(f"Database error listing applications: {e}")
        raise HTTPException(status_code=500, detail="Failed to list applications")
    except Exception as e:
        logger.error(f"Unexpected error listing applications: {e}")
        raise HTTPException(status_code=500, detail="Internal server error") 