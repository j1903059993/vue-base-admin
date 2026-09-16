# Vue Base Admin Design

## Product position

`vue-base-admin` is a reusable Vue 3 administration template for developers who need to start internal tools and management products quickly. It should feel like a maintained open-source starter rather than a collection of unrelated demo pages. The repository will provide a polished demo, typed configuration, replaceable mock data, and focused documentation.

## Technical foundation

- Vue 3 with TypeScript and `<script setup>`
- Vite for development and production builds
- Ant Design Vue for interface components
- Apache ECharts through `vue-echarts` for charts
- Vue Router for route composition and navigation guards
- Pinia for authentication, preferences, tabs, and other client state
- Axios for the HTTP layer and Mock Service Worker for local demo APIs
- VueUse for reusable browser and interaction primitives
- Vitest and Vue Test Utils for core behavior
- Playwright for the login, navigation, permission, and theme flows
- ESLint, Prettier, Stylelint, Husky, and lint-staged for repository quality

The package manager is pnpm. The first release remains a single Vite application so contributors can understand and reuse it without monorepo overhead.

## Visual direction

The interface uses a quiet developer-tool aesthetic: neutral surfaces, crisp borders, compact information density, and a restrained indigo accent. A slim colored rail on the active navigation item is the signature visual element. Light and dark themes share semantic CSS variables, visible keyboard focus, and reduced-motion behavior.

The application supports desktop, tablet, and mobile widths. Desktop uses a collapsible sidebar and fixed header. Small screens use a drawer menu and keep primary page actions visible.

## Application architecture

The source is organized around stable platform capabilities and removable examples:

- `app`: application bootstrap, providers, global styles, and theme setup
- `router`: static routes, asynchronous routes, guards, and route metadata types
- `stores`: session, permission, settings, and multi-tab state
- `services`: typed HTTP client, error normalization, auth refresh, and API modules
- `layouts`: shell, sidebar, header, breadcrumbs, tabs, and settings drawer
- `components`: reusable application components such as page containers and permission controls
- `views`: dashboard, examples, system pages, account pages, and status pages
- `mocks`: browser-side APIs and realistic fixtures
- `utils`: narrow framework-independent helpers

Route metadata is the source of truth for menu labels, icons, ordering, caching, visibility, and required permissions. The permission store filters routes after sign-in and the router guard prevents direct URL access to unauthorized pages. UI permission components improve presentation, while authorization remains a backend responsibility in real deployments.

## Initial modules

### Workspace

- Overview dashboard with summary cards, activity, traffic, and task progress
- Quick links to template documentation and major examples

### Navigation and layout

- Collapsible sidebar, responsive drawer, breadcrumbs, multi-tabs, and nested routes
- Light/dark/system theme, brand color, compact density, and persistent preferences

### Table examples

- Searchable user list with pagination, sorting, filtering, selection, and batch actions
- Reusable page-table composition that exposes Ant Design Vue slots and events
- Loading, empty, error, and retry states

### Form examples

- Validated basic form, modal form, dynamic fields, and step form
- Examples keep domain validation separate from presentation

### Permission examples

- Demo accounts for administrator, operator, and viewer roles
- Route, menu, button, and component-level permission examples
- Unauthorized and session-expired states

### System management

- User, role, and menu management demonstrations
- Typed create/edit flows backed by mock APIs

### Data visualization

- Responsive ECharts line, bar, donut, and ranking views
- Shared chart wrapper handles resize, theme changes, empty data, and disposal

### Page templates

- Login, profile, details, success, 403, 404, and 500 pages

### Documentation

- Quick start, project structure, adding a page, API integration, permissions, themes, and deployment
- README includes screenshots, demo credentials, commands, features, and architectural decisions

## Data flow and errors

Pages call typed service modules. The HTTP client injects the access token, normalizes API errors, and performs one coordinated refresh when several requests encounter an expired token. Page-level requests retain their own loading, empty, and retry presentation. Authentication failure returns the user to sign-in while preserving the intended destination.

Mock Service Worker implements the same response contract expected from a real server. Mock mode is controlled by an environment variable, so consumers can replace it without changing page components.

## Verification

Unit tests cover route filtering, permission checks, settings persistence, and HTTP error normalization. Component tests cover reusable wrappers where behavior is more valuable than implementation snapshots. Playwright verifies sign-in, role-specific navigation, theme persistence, and a representative create/edit/list flow. CI runs type checking, linting, unit tests, the production build, and browser tests.

## Release scope

The first release ships one complete application and one clean repository. It does not include a backend server, micro-frontends, a plugin marketplace, schema-generated forms, or a monorepo. These can be considered after the template has stable public extension points.
