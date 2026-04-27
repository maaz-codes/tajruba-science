# Tajruba Science — Build Plan

A faithful recreation of the three screens you shared as a working multi-page app. Visuals match the soft cream palette, rounded cards, and friendly purple/pastel styling. The quiz is fully functional; particle simulation is visual-only for now. Character illustrations are left as clearly marked placeholder slots you can drop your assets into.

## Pages & navigation

```text
/                  Landing  ── "Let's go!" ──▶  /topic/states-of-matter
/topic/$topicId    Topic page (4 game cards)  ── card click ──▶  /game/$gameId
/game/$gameId      Game screen (sim + quiz)
```

Header controls (sound toggle, language switcher, stars counter, back button) appear on the relevant screens exactly as in the mockups.

## Screen 1 — Landing (`/`)

- Cream background `#FBF3E4`, centered layout.
- Top bar: round purple sound button (left), "Tajruba" wordmark with multicolor letters + "Science" pill (center), language switcher EN/AR (right).
- Hero: "Let's explore, experiment & discover!" in deep navy, subtitle, big purple "Let's go!" pill button → routes to `/topic/states-of-matter`.
- Two side mascot slots (panda-with-flask left, magnifier-bird right) — placeholder cards you can replace.
- Three topic cards below: "States of Matter" (active, blue ring, arrow chevron), two "Coming Soon" (dimmed, locked). Each shows 3 stars reflecting saved progress.
- Cat mascot + speech bubble "So many topics to explore!" at bottom.

## Screen 2 — Topic page (`/topic/$topicId`)

- "← All Topics" pill (top-left), audio toggle + language switcher (top-right), stars counter "X / 12".
- Big title "States of Matter" with 2-line subtitle.
- Row of three concept characters: Solid (cube), Liquid (droplet), Gas (cloud) — placeholder slots with labels.
- Cat mascot with "Let's explore the world of matter together!" bubble.
- 4 numbered game cards in a row connected by a dashed path:
  1. **Make Your Own Matter** — "Start here!" badge, purple ring when it's the next game.
  2. **Water the Plant**
  3. **Wadi Crossing**
  4. **Mosque Systems**
- Each card: numbered yellow circle, illustration slot, title, description, 3 empty/filled stars from saved progress.
- Footer line: "Play the games in order to become a Matter Explorer!"
- Clicking a card → `/game/$gameId`.

## Screen 3 — Game (`/game/make-your-own-matter`)

Two-column layout: simulation panel (left, ~⅔) + quiz panel (right, ~⅓).

**Simulation panel (visual-only)**
- Top bar: home button, "← Back to topic", sound on, language, stars.
- Header card: flask icon, "Make Your Own Matter" + subtitle, "Particles added 12 / 50" pill (static display).
- Left column "Choose particles": three stacked draggable-looking cards — Gas (blue), Liquid (teal), Solid (purple) — with mascot slot, name, short description. Visual hover state only.
- Center: large glass jar illustration on a teal platform, tiled floor, decorative flasks in corners, shelf with plant.
- Right: thermometer with Cool/Hot labels and a `20°C` draggable slider knob (visual position only, no physics).
- Bottom legend strip: Solid / Liquid / Gas with one-line descriptions.
- "Drag a particle type and drop it in the container." hint.

**Quiz panel (fully working)**
- Header "Quiz", "Question X of 5", segmented progress dots.
- Question text + 4 answer cards (A/B/C/D circles).
- Click an answer → correct turns green, wrong turns red, correct one highlights, then auto-advance after ~1s.
- "Get a hint" yellow pill → reveals hint speech bubble from the side mascot slot.
- "Stars you can earn" row at bottom: 3 stars fill based on score (5/5 = 3, 3-4 = 2, 1-2 = 1).
- Collapse/expand button (− icon) shrinks the panel.
- Finishing the quiz writes earned stars to localStorage and shows a "Great job!" completion state with a "Back to topic" button.

5 sample questions about states of matter are included.

## Cross-cutting features

**Internationalization (EN + AR with RTL)**
- All UI strings live in `src/i18n/{en,ar}.ts`.
- Language switcher in header writes choice to localStorage.
- When Arabic is active, `<html dir="rtl" lang="ar">` flips and a body class applies mirrored layouts (icons, chevrons, dashed connector path, card column order).

**Local progress (localStorage)**
- Stored shape:
  ```text
  tajruba.progress = {
    topics: { "states-of-matter": { stars: 0..12 } },
    games:  { "make-your-own-matter": { stars: 0..3, completed: bool }, ... }
  }
  ```
- Topic stars = sum of its 4 games' stars (out of 12).
- Landing page topic cards and topic-page game cards both read live from this store.
- Sound on/off and language also persist.

**Asset placeholders**
- Every character illustration is a labeled placeholder component (`<CharacterSlot id="panda-scientist" />`) that renders a soft pastel blob with the character name.
- Single file `src/assets/characters/README.md` lists every slot ID + recommended size + transparent PNG/SVG.
- When you upload assets, swapping a placeholder is a one-line change per character.

## Design system

- Cream background `#FBF3E4`, deep navy text `#2D1B5E`, primary purple `#6E47E0`.
- Accent palette: blue `#9DD8FF`, teal `#7FD9C4`, soft purple `#D9C9FF`, pink `#FFC7DD`, yellow `#FFD66B`, coral `#FF7E7E`.
- Rounded corners (16–24px), soft drop shadows, chunky pill buttons with bottom-shadow press effect.
- Typography: Nunito (or similar rounded sans) loaded from Google Fonts; bold weights for headings, semi-bold for body.
- Reusable components: `PillButton`, `IconPillButton`, `StarRow`, `GameCard`, `TopicCard`, `LanguageSwitcher`, `SoundToggle`, `CharacterSlot`, `SpeechBubble`, `QuizPanel`.

## Technical notes

- TanStack Start file routes: `index.tsx`, `topic.$topicId.tsx`, `game.$gameId.tsx`, plus a shared header component.
- Tailwind v4 design tokens added to `src/styles.css` (custom colors above mapped to semantic names).
- Topic + game data lives in `src/data/topics.ts` so the topic page, landing cards, and game header all read from one source.
- Quiz questions in `src/data/quizzes.ts`, keyed by game ID, with `{ question, options, correctIndex, hint }` per item, fully translated EN/AR.
- Progress hook `useProgress()` wraps localStorage with React state + a custom event so all open tabs/components stay in sync.
- Drag-and-drop on particle cards and thermometer knob: visual hover/active styles only — no logic wiring (kept for a later scope expansion).

## Out of scope (for this build)

- Real particle physics / drag-to-jar interactivity.
- Games 2–4 ("Water the Plant", "Wadi Crossing", "Mosque Systems") — cards route to a friendly "Coming soon — finish Game 1 first!" placeholder.
- Audio playback (toggle persists state but no sounds wired yet).
- Accounts / cloud sync.
