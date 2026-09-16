# API integration

Set `VITE_API_BASE_URL` to the server prefix and keep network calls inside feature service modules. Pages should consume typed results and own their loading, empty, error, and retry states.

Replace demonstration arrays under `src/mocks` with service calls incrementally. Keep the response contract explicit: list endpoints should return the current items, total count, page, and page size. Authentication errors should clear the session and preserve the intended destination in the login redirect.
