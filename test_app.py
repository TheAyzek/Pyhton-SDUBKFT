#!/usr/bin/env python3
"""
Simple test script to verify the FastAPI application works correctly with PostgreSQL
"""
import asyncio
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

async def test_app():
    try:
        from main import app, engine, async_session
        from models import Base, Admin
        from sqlalchemy import text
        
        print("✅ All imports successful")
        
        # Check database URL
        db_url = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./frpdb.db")
        print(f"📊 Database URL: {db_url.split('@')[1] if '@' in db_url else db_url}")
        
        # Test database connection
        async with async_session() as session:
            result = await session.execute(text("SELECT 1"))
            print("✅ Database connection successful")
        
        # Test creating tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Database tables created successfully")
        
        print("✅ All tests passed! Application is ready for PostgreSQL.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

if __name__ == "__main__":
    success = asyncio.run(test_app())
    sys.exit(0 if success else 1) 