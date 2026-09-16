# Vue Base Admin

A modern, reusable Vue 3 admin template built with TypeScript, Ant Design Vue and ECharts.

`vue-base-admin` focuses on the capabilities most administration products share: a responsive application shell, route-driven navigation, role-based permissions, persistent themes, useful page examples, and a project structure that remains easy to replace.

## Features

- Vue 3, TypeScript and Vite with strict type checking
- Ant Design Vue components loaded on demand
- ECharts wrapper with responsive resizing and dark theme support
- Collapsible desktop sidebar and mobile navigation drawer
- Route tabs, breadcrumbs and route metadata driven menus
- Route, menu, button and component permission examples
- Light, dark and system themes with configurable brand color and density
- Dashboard, tables, forms, users, roles, menus and chart examples
- Vitest coverage for permissions, settings and application bootstrap
- ESLint, production build checks and GitHub Actions workflow

## Demo accounts

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `admin123` | Full access |
| `operator` | `admin123` | Operations and user editing |
| `viewer` | `admin123` | Read-only examples |

## Quick start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173` and sign in with a demo account.

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```

## Project structure

```text
src/
├─ components/       reusable application components
├─ layouts/          shell, header, sidebar, tabs and settings
├─ mocks/            replaceable demonstration data
├─ router/           routes, route types and permission filtering
├─ stores/           session, settings and tab state
├─ styles/           semantic design tokens and global styles
├─ utils/            framework-independent helpers
└─ views/            dashboard, examples, system and account pages
```

The stable platform code is kept separate from demonstration pages. You can remove a page under `views` and its route without changing the shell.

## Documentation

- [Quick start](docs/quick-start.md)
- [Project structure](docs/project-structure.md)
- [Add a page](docs/add-page.md)
- [API integration](docs/api-integration.md)
- [Permissions](docs/permissions.md)
- [Themes](docs/themes.md)
- [Deployment](docs/deployment.md)

## Browser support

The latest two versions of Chrome, Edge, Firefox and Safari are supported. Node.js 20.19 or later is required for local development.

## License

[MIT](LICENSE)
