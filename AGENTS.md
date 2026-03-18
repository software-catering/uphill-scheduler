# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start dev server with Turbopack
- `npm run build` - Production build (static export)
- `npm run lint` - ESLint with Next.js rules
- No test framework is configured

## Architecture

This is a **Next.js 15 static-export app** (Pages Router) that renders an interactive conference schedule for the Uphill Conference (May 6-8, 2026). It deploys to GitHub Pages via the `nextjs.yml` workflow.

### Data Flow

```
Google Sheets (via opensheet.elk.sh API)
  → src/data-source/googleSheetIntegration.ts  (fetches Persons, Places, Schedules per day)
  → src/data-source/useLoadData.ts             (loads into Jotai atoms on mount)
  → src/data-source/useEvents.ts               (reads atoms, applies filters, maps to calendar events)
  → src/data-source/EventMapper.ts             (creates FullCalendar resources/events based on view type)
  → FullCalendar timegrid component            (renders the schedule)
```

The Google Sheet ID is configured in `src/config.ts`. Each conference day has its own sheet tab.

### State Management

**Jotai** with `atomWithHash` (from jotai-location) persists UI state in the URL hash, enabling deep linking and shareable URLs. All atoms are in `src/state.ts`:

- `cd` - selected conference day
- `vt` - view type (`"by Places"` | `"by Persons"` | `"combined"`)
- `ft` - filter type (`"place"` | `"persons"` | `"all"`)
- `p` - selected person name filters
- `selectedPlacesFilter` - selected place filters

### View Types (EventMapper)

- **by Places**: One FullCalendar resource column per location
- **by Persons**: One resource column per person
- **combined**: Single column, all events together

### Key Libraries

- **@fullcalendar/react + timegrid** - Calendar rendering with resource columns
- **@mui/material** - UI components (dialogs, checkboxes, chips, tabs)
- **jotai + jotai-location** - State management with URL hash sync
- **date-fns** - Date formatting/parsing

### Types

Core types in `src/types.ts`: `RawSheetEntry` → `ScheduleEntry` (with parsed persons array) → `Event` (with colors and Date objects). Conference days are typed as string literal unions. `ColorMapper` (`src/util/ColorMapper.ts`) assigns consistent colors from a 20-color palette.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).
