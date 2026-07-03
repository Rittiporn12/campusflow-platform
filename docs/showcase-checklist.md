# CampusFlow Showcase Checklist

Use this checklist when preparing GitHub README images, portfolio screenshots, or a short project walkthrough.

## Screenshot Checklist

Capture these screens after the backend, frontend, and seeded database are running locally:

| # | Screen | Recommended path |
| - | ------ | ---------------- |
| 1 | Login page | `docs/screenshots/01-login.png` |
| 2 | Dashboard overview | `docs/screenshots/02-dashboard.png` |
| 3 | Tickets list | `docs/screenshots/03-tickets.png` |
| 4 | Create Ticket modal | `docs/screenshots/04-create-ticket-modal.png` |
| 5 | Ticket Detail with status, assignment, comments, and history visible | `docs/screenshots/05-ticket-detail.png` |
| 6 | Assets list with search/filter and badges visible | `docs/screenshots/06-assets.png` |
| 7 | Create Asset modal | `docs/screenshots/07-create-asset-modal.png` |
| 8 | Asset Detail with update, status, archive, and history visible | `docs/screenshots/08-asset-detail.png` |
| 9 | Mobile Dashboard | `docs/screenshots/09-mobile-dashboard.png` |
| 10 | Mobile Navigation drawer | `docs/screenshots/10-mobile-navigation.png` |
| 11 | Postman collection overview | `docs/screenshots/11-postman-collection.png` |

## Demo Flow

Recommended short walkthrough:

1. Log in as the admin demo account.
2. Open the dashboard and point out ticket and asset summaries.
3. Create or review a ticket.
4. Update ticket status, assign technician, and add a comment.
5. Create or review an asset.
6. Update asset information and status.
7. Archive or retire the asset safely.
8. Open a narrow mobile viewport and show the compact navigation drawer.
9. Show Postman collection coverage for Auth, Ticket, and Asset APIs.

## Capture Notes

- Use demo seed data only.
- Do not show real secrets, local `.env` files, JWT tokens, database URLs, or private credentials.
- Prefer a clean browser window and consistent viewport size.
- Capture both desktop and narrow/mobile responsive views.
- Use a mobile viewport around 390px wide to verify the iPhone 12 Pro layout.
- Keep screenshots focused on implemented features, not future planned modules.
