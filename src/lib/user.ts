export async function getUserRequest(accessToken: string) {
  return {
    "message": "User fetched successfully",
    "error": undefined,
    "statusCode": 200,
    "_isSuccess": true,
    "next": "/v1/users/refresh",
    "data": {
      "id": "e66832e3-fa0c-4502-a1a2-752229249a18",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlNjY4MzJlMy1mYTBjLTQ1MDItYTFhMi03NTIyMjkyNDlhMTgiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjczNzYwNzAyLCJleHAiOjE2NzYzNTI3MDJ9.N_9TThq5ZT2ye31fhi3IL3TRxTgXX2WEiyl3vzGnlm0",
      "firstName": "Igor",
      "lastName": "Hakcolt",
      "email": "test@gmail.com",
      "imageUrl": "https://avatars.githubusercontent.com/u/81633773?v=4",
      "gender": "Male",
      "createdAt": "1856-06-10T18:30:51.876-05:00"
    }
  }
}