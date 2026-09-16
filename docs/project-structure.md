# Project structure

Platform concerns live in `router`, `stores`, `layouts`, `components`, and `styles`. Feature pages live in `views`; demonstration data lives in `mocks`. This boundary lets a consumer delete examples without changing the application shell.

Route metadata is the source of menu titles, grouping, icons, ordering, visibility, fixed tabs, and permission requirements. Client state belongs in Pinia only when it is shared across routes or must persist between visits.
