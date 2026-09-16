# Deployment

Run `pnpm build` to produce static assets in `dist`. Configure the hosting service to return `index.html` for unknown routes because the application uses history mode.

Set environment variables during the build and never commit credentials to `.env` files. The provided GitHub Actions workflow verifies linting, types, tests, and the production bundle for pushes and pull requests.
