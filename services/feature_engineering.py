import json
from datetime import datetime
from typing import Dict
from datetime import timedelta
import numpy as np
from collections import defaultdict

def parse_submission_calendar(calendar_raw: str) -> Dict:
    """
    Converts LeetCode submissionCalendar string
    into {date: count}
    """
    calendar_dict = json.loads(calendar_raw)

    parsed = {}
    for ts, count in calendar_dict.items():
        date = datetime.utcfromtimestamp(int(ts)).date()
        parsed[date] = count

    return parsed


def longest_streak(calendar: dict) -> int:
    dates = sorted(calendar.keys())
    if not dates:
        return 0

    max_streak = 1
    current = 1

    for i in range(1, len(dates)):
        if dates[i] - dates[i-1] == timedelta(days=1):
            current += 1
            max_streak = max(max_streak, current)
        else:
            current = 1

    return max_streak


def burst_days(calendar: dict, threshold: int = 5) -> int:
    return sum(1 for v in calendar.values() if v >= threshold)

def avg_solves(calendar: dict) -> float:
    if not calendar:
        return 0.0
    return sum(calendar.values()) / len(calendar)


def solve_variance(calendar: dict) -> float:
    return float(np.var(list(calendar.values())))

def classify_solver(stats: dict) -> str:
    if stats["solve_variance"] > 10 and stats["burst_days"] >= 5:
        return "Sprint Solver"
    elif stats["longest_streak"] >= 10 and stats["solve_variance"] < 5:
        return "Consistent Grinder"
    else:
        return "Hybrid Solver"

def peak_day(calendar: dict):
    if not calendar:
        return None
    return max(calendar.items(), key=lambda x: x[1])


def peak_month(calendar: dict):
    monthly = defaultdict(int)
    for date, count in calendar.items():
        # Group by first day of the month
        key = date.replace(day=1) 
        monthly[key] += count
    
    if not monthly:
        return ("N/A", 0)

    best_month_date, count = max(monthly.items(), key=lambda x: x[1])
    # Return ("January 2024", count)
    return (best_month_date.strftime("%B %Y"), count)

def weekday_vs_weekend(calendar: dict):
    weekday = 0
    weekend = 0
    for date, count in calendar.items():
        if date.weekday() >= 5:
            weekend += count
        else:
            weekday += count
    return {"weekday": weekday, "weekend": weekend}


def compute_contest_stats(contest_data: dict):
    if not contest_data:
        return {
            "attendedContestsCount": 0,
            "rating": 0,
            "globalRanking": 0,
            "topPercentage": 0,
            "badge": None
        }
    return contest_data


def compute_topic_stats(tag_data: dict):
    if not tag_data:
        return []
    
    # Flatten all categories
    all_tags = []
    for category in ["advanced", "intermediate", "fundamental"]:
        if category in tag_data:
            all_tags.extend(tag_data[category])
    
    # Sort by problems solved
    sorted_tags = sorted(all_tags, key=lambda x: x['problemsSolved'], reverse=True)
    return sorted_tags[:5] # Top 5


def compute_language_stats(language_data: list):
    if not language_data:
        return []
    
    return sorted(language_data, key=lambda x: x['problemsSolved'], reverse=True)[:3]


def generate_wrapped(username: str, stats: dict):
    return {
        "user": username,
        "highlights": [
            f"Longest streak: {stats['longest_streak']} days",
            f"Solver type: {stats['solver_persona']}",
            f"Burst days: {stats['burst_days']}"
        ],
        "persona": stats["solver_persona"],
        "stats": stats
    }

def compute_user_stats(calendar: dict, raw_data: dict) -> dict:
    # Logic to get total solves (All time)
    total_solves = 0
    submit_stats = raw_data.get("submitStats")
    if submit_stats and "acSubmissionNum" in submit_stats:
        # Find the entry where difficulty is "All"
        for item in submit_stats["acSubmissionNum"]:
            if item["difficulty"] == "All":
                total_solves = item["count"]
                break
    else:
        # Fallback to sum of calendar
        total_solves = sum(calendar.values())

    total_attempts = sum(calendar.values())
    accuracy = (total_solves / total_attempts * 100) if total_attempts > 0 else 0

    stats = {
        "longest_streak": longest_streak(calendar),
        "burst_days": burst_days(calendar),
        "average_solves_per_day": avg_solves(calendar),
        "solve_variance": solve_variance(calendar),
        "total_solves": total_solves,
        "total_attempts": total_attempts,
        "accuracy": round(accuracy, 1),
        "active_days": len(calendar)
    }

    stats["solver_persona"] = classify_solver(stats)
    stats["peak_day"] = peak_day(calendar)
    stats["peak_month"] = peak_month(calendar)
    stats["weekday_vs_weekend"] = weekday_vs_weekend(calendar)
    
    # New Stats
    stats["contest_stats"] = compute_contest_stats(raw_data.get("contestRanking"))
    stats["topic_stats"] = compute_topic_stats(raw_data.get("tagProblemCounts"))
    stats["language_stats"] = compute_language_stats(raw_data.get("languageProblemCount"))

    return stats
