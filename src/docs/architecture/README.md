## Architecture diagrams (Mermaid)

Files:
- `system-data-flow.mmd` — high-level system architecture and data flow across services
- `auth-sequence.mmd` — detailed signup/login/forgot-reset sequence

How to view/edit:
- In VS Code/Cursor with Mermaid preview extensions, open the `.mmd` files to render.
- Online viewers also work. Copy the contents to a Mermaid live editor.

How to export PNG/SVG:
- Use your editor's Mermaid export or a CLI like `mmdc` (mermaid-cli).

Notes for API integration:
- Use the endpoints in the diagrams as contracts.
- Implement an Axios client with an auth interceptor for tokens and refresh.
- Persist `{ accessToken, refreshToken }` in `localStorage` and mirror user state in `AuthContext`.

