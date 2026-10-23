# Website deployment

## GitHub Pages

- Repository: https://github.com/giakhuu/websinhnhatthao
- Target URL: https://giakhuu.github.io/websinhnhatthao/
- Branch: `main`
- Workflow: `.github/workflows/pages.yml`
- Public files: `thao-birthday/dist`

The workflow deploys updates automatically. The site's relative asset paths support GitHub Pages project URLs.

## Earlier Cloudflare preview

- Live URL: https://thao-birthday-love.jet-viscount.workers.dev
- Worker: `thao-birthday-love`
- Version: `9abe4f79-a5dd-4064-aaf0-7f3ef36eb4b7`
- Provider: Cloudflare Workers Static Assets
- Initial deployment: temporary account; the owner must claim it within 60 minutes to make it permanent.

The private claim link is in the chat and is intentionally excluded from the source files. Only the four public files in `dist/` are deployed.
