from fastapi import APIRouter, HTTPException
from services.leetcode_client import get_user_data
from services.feature_engineering import (
    parse_submission_calendar,
    compute_user_stats,
    generate_wrapped
)

router = APIRouter(prefix="/leetcode", tags=["LeetCode"])

@router.get("/wrapped/{username}")
async def get_wrapped(username: str):
    raw_data = await get_user_data(username)

    if not raw_data:
        raise HTTPException(status_code=404, detail="User not found")

    parsed_calendar = parse_submission_calendar(raw_data["submissionCalendar"])
    stats = compute_user_stats(parsed_calendar, raw_data)
    wrapped = generate_wrapped(username, stats)

    return wrapped
