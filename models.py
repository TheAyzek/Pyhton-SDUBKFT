from sqlalchemy.ext.asyncio import AsyncAttrs, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, relationship, Mapped, mapped_column
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, Text
from datetime import datetime
from typing import List, Optional

class Base(AsyncAttrs, DeclarativeBase):
    pass

class Admin(Base):
    __tablename__ = "admins"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    noPassword: Mapped[bool] = mapped_column(Boolean, default=False)

class PendingAdmin(Base):
    __tablename__ = "pending_admins"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    approved: Mapped[bool] = mapped_column(Boolean, default=False)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    approvalToken: Mapped[str] = mapped_column(String, unique=True, nullable=False)

class FormField(Base):
    __tablename__ = "form_fields"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    label: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, default="text")
    options: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # JSON string olarak tutulabilir
    maxResponses: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # JSON string olarak tutulabilir
    required: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, default=0)

class FormText(Base):
    __tablename__ = "form_texts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    order: Mapped[int] = mapped_column(Integer, default=0)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updatedAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Application(Base):
    __tablename__ = "applications"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    answers: Mapped[str] = mapped_column(Text, nullable=False)  # JSON string olarak tutulabilir
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow) 