import os
from fastapi import FastAPI
from api.leetcode import router as leetcode_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LeetCode Wrapped")

# Get frontend URL from environment variable, default to local development
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL, 
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(leetcode_router)
