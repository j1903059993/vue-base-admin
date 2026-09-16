# Add a page

1. Create a focused component under `src/views/<feature>`.
2. Add a child route to `src/router/routes.ts`.
3. Set `title`, `icon`, `order`, and an optional `permission` or `group` in route metadata.
4. Wrap page content in `PageContainer` for consistent headings and actions.
5. Add a permission unit test when the route is restricted.

The sidebar reads the route configuration automatically. Set `hidden: true` for detail pages that should be reachable by URL but absent from navigation.
