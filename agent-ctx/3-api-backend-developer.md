# Task 3 - API Backend Developer

## Task: Build all API routes for WIFI MURAH BANDUNG

## Work Completed

### Public API Routes (10 files)
| Route | Methods | Description |
|-------|---------|-------------|
| `/api/leads` | POST, GET | Create leads + paginated listing with status/search filter |
| `/api/providers` | GET | List active providers ordered by `order` |
| `/api/testimonials` | GET | List active testimonials ordered by `order` |
| `/api/faqs` | GET | List active FAQs ordered by `order` |
| `/api/articles` | GET | List published articles with pagination & category filter |
| `/api/settings` | GET | Get all settings as key-value object |
| `/api/settings/trust-indicators` | GET | List active trust indicators |
| `/api/settings/keunggulan` | GET | List active keunggulan items |
| `/api/settings/popup` | GET | Get first active popup config |
| `/api/notifications` | GET | List active notifications |

### Admin API Routes (13 files)
| Route | Methods | Description |
|-------|---------|-------------|
| `/api/admin/leads` | GET, PATCH | List leads with filtering + update status/notes |
| `/api/admin/leads/export` | GET | Export leads as CSV with date/status filter |
| `/api/admin/providers` | GET, POST, PUT, DELETE | Full CRUD for providers |
| `/api/admin/testimonials` | GET, POST, PUT, DELETE | Full CRUD for testimonials |
| `/api/admin/faqs` | GET, POST, PUT, DELETE | Full CRUD for FAQs |
| `/api/admin/articles` | GET, POST, PUT, DELETE | Full CRUD for articles |
| `/api/admin/settings` | GET, PUT | Settings grouped by group + upsert individual setting |
| `/api/admin/popups` | GET, POST, PUT, DELETE | Full CRUD for popups |
| `/api/admin/notifications` | GET, POST, PUT, DELETE | Full CRUD for notifications |
| `/api/admin/seo` | GET, PUT | SEO settings list + upsert by page |
| `/api/admin/trust-indicators` | GET, POST, PUT, DELETE | Full CRUD for trust indicators |
| `/api/admin/keunggulan` | GET, POST, PUT, DELETE | Full CRUD for keunggulan |
| `/api/admin/tracking` | GET, POST, PUT, DELETE | Full CRUD for tracking scripts |

## Key Decisions
- All routes use `import { db } from '@/lib/db'` for Prisma client
- Consistent error handling pattern: try/catch with console.error + JSON error response
- Admin DELETE uses query parameter (`?id=xxx`) instead of request body
- Settings upsert pattern used for both settings and SEO routes
- CSV export properly escapes double quotes in fields
- Pagination follows `{ data, pagination: { page, limit, total, totalPages } }` pattern
