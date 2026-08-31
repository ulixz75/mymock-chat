# MockChat Studio — Generador de Mensajería & Redes

PWA para crear y exportar **maquetas realistas en alta resolución** de conversaciones y comentarios para:

- **Chats:** WhatsApp, Telegram, Instagram DM, Messenger, iMessage, Android SMS / RCS, X (Twitter) DM
- **Comentarios:** Instagram Comment, TikTok Comment
- **Dispositivos:** iPhone 16 Pro, Android, frameless, tarjeta social (`social_card`)
- **Export:** PNG/JPEG hasta 4x (4K UHD), copiar al portapapeles, fondos y aspect ratios para redes sociales

Stack: **React 19 + TypeScript + Vite 6 + Tailwind CSS 4**

## Demo
- `npm run dev` → http://localhost:3000
- Build estático en `dist/` (Vite)

## Requisitos
- Node.js 18+ (recomendado 20 LTS)
- npm o bun

## Instalación

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor Vite en `0.0.0.0:3000` |
| `npm run build` | Build producción (`dist/`) |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Verificación TypeScript `tsc --noEmit` |
| `npm run clean` | Borra `dist/` |

## Estructura

```
src/
  App.tsx                 # Estado global, tabs, modales, guardado en localStorage
  types.ts                # PlatformId, MockState, Message, MockComment, etc.
  data/
    templates.ts          # DEFAULT_MOCK_STATE + TEMPLATES_LIBRARY (8 plantillas)
    avatars.ts            # AVATAR_PRESETS
  components/
    editor/               # PlatformSelector, HeaderEditor, MessagesEditor, CommentEditor, AppearanceEditor
    preview/              # MockCanvas, DeviceStatusBar, DeviceBottomBar, WhatsAppView, Instagram*, Telegram*, etc.
    modals/               # ExportModal, TemplatesModal
  main.tsx / index.css
public/
  manifest.json           # PWA
  assets/aistudio/        # assets AI Studio (opcional)
```

## Funcionalidades clave

- **Editor en vivo:** mensajes/comentarios interactivos, reordenar, reacciones emoji, status checks (sent/delivered/read), tipos `text | image | voice | system`
- **Persistencia:** `localStorage` (`mockchat_current_state`)
- **Export HD:** `html-to-image` con `pixelRatio 1-4`, copiar imagen al clipboard (`ClipboardItem`), confetti, export/import JSON del proyecto
- **Diseño & Marco:** tema light/dark, device chassis realista, backdrop gradients, aspect ratios `auto | 1:1 | 9:16 | 4:5`

## Configuración

No requiere `.env`. Si añades integración Gemini, crea `.env.local`:

```
GEMINI_API_KEY="..."
```

## Deploy

- **Vercel / Netlify / GitHub Pages (static):** `npm run build` y desplegar `dist/`
- **Cloudflare Pages / Firebase Hosting:** idem

## Licencia

MIT — úsalo libremente para demos, marketing, portfolio o clientes.

## Autor

Creado por **ulixz75** — https://github.com/ulixz75/mymock-chat
