import httpx

graphql_url = 'https://leetcode.com/graphql'

header = {
    "content-type": "application/json",
    "User-Agent": "Mozilla/5.0"
}

USER_PROFILE_QUERY = """
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
"""

SUBMISSION_CALENDAR_QUERY = """
query submissionCalendar($username: String!) {
  matchedUser(username: $username) {
    submissionCalendar
  }
}
"""

CONTEST_QUERY = """
query userContestRankingInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    topPercentage
    badge {
      name
    }
  }
}
"""

TAG_QUERY = """
query skillStats($username: String!) {
  matchedUser(username: $username) {
    tagProblemCounts {
      advanced {
        tagName
        tagSlug
        problemsSolved
      }
      intermediate {
        tagName
        tagSlug
        problemsSolved
      }
      fundamental {
        tagName
        tagSlug
        problemsSolved
      }
    }
  }
}
"""

LANGUAGE_QUERY = """
query languageStats($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
}
"""



async def run_query(query, variables):
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            graphql_url,
            json={"query": query, "variables": variables},
            headers=header  
        )
        response.raise_for_status()
        return response.json()

async def get_user_data(username: str):
    # Fetch all data points
    calendar_data = await run_query(SUBMISSION_CALENDAR_QUERY, {"username": username})
    contest_data = await run_query(CONTEST_QUERY, {"username": username})
    tag_data = await run_query(TAG_QUERY, {"username": username})
    language_data = await run_query(LANGUAGE_QUERY, {"username": username})

    user = calendar_data.get("data", {}).get("matchedUser")
    if not user or not user.get("submissionCalendar"):
        return None

    return {
        "submissionCalendar": user["submissionCalendar"],
        "contestRanking": contest_data.get("data", {}).get("userContestRanking"),
        "tagProblemCounts": tag_data.get("data", {}).get("matchedUser", {}).get("tagProblemCounts"),
        "languageProblemCount": language_data.get("data", {}).get("matchedUser", {}).get("languageProblemCount")
    }
