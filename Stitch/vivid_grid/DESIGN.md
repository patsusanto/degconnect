# Design System Strategy: The Electric Curator

## 1. Overview & Creative North Star
This design system is built on the philosophy of **"The Electric Curator."** Traditional event apps often feel like cluttered bulletin boards; this system treats every event as a gallery-worthy masterpiece. We move beyond the "standard app" aesthetic by utilizing high-contrast editorial typography, a vibrant electric-violet palette, and a "No-Line" spatial logic.

The goal is a **High-End Editorial** experience. We achieve this through intentional asymmetry—where text might overlap image containers—and a reliance on tonal depth rather than structural dividers. The interface should feel like a premium digital magazine: breathing, alive, and meticulously composed.

## 2. Colors: Vibrancy Through Tonal Depth
Our palette is anchored in deep indigos and electric purples (`primary: #4441e3`), balanced by a soft, warm lavender foundation (`background: #faf4ff`).

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a card (`surface_container_low`) should sit on the `background` without an outline.
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of stacked, fine papers. 
    *   **Level 0 (Base):** `surface` or `background`
    *   **Level 1 (Sections):** `surface_container_low`
    *   **Level 2 (Interactive Cards):** `surface_container` or `surface_container_highest`
*   **The "Glass & Gradient" Rule:** To move beyond "flat" design, use Glassmorphism for floating navigation or header elements. Apply `surface_container_lowest` at 70% opacity with a `24px` backdrop blur. 
*   **Signature Textures:** For primary CTAs and Hero moments, use a linear gradient transitioning from `primary (#4441e3)` to `primary_container (#9596ff)` at a 135-degree angle. This provides a "soul" that a flat hex code cannot achieve.

## 3. Typography: Editorial Authority
We pair the geometric precision of **Plus Jakarta Sans** for high-impact display with the rhythmic readability of **Be Vietnam Pro** for utility.

*   **Display & Headlines (Plus Jakarta Sans):** These are the "hooks." Use `display-lg` for featured event titles. The tight tracking and bold weights convey an authoritative, modern voice.
*   **Body & Labels (Be Vietnam Pro):** Used for logistical data (dates, venues, descriptions). The generous x-height ensures readability even at `body-sm` for dense event metadata.
*   **Hierarchy Tip:** Use `tertiary (#973775)` for category labels to create a sophisticated color-coded "pop" against the primary violet-heavy environment.

## 4. Elevation & Depth: Tonal Layering
We reject the heavy, muddy shadows of the early 2010s. Depth is an atmospheric quality, not a structural one.

*   **The Layering Principle:** Instead of a shadow, place a `surface_container_lowest` (pure white) card onto a `surface_dim` background. The difference in luminance creates a natural "lift."
*   **Ambient Shadows:** If an element must float (e.g., a "Create Event" FAB), use a shadow with a `32px` blur, `0%` spread, and `6%` opacity, tinted with `on_surface (#312950)`. Never use pure black for shadows.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use `surface_variant` with 40% opacity and a `16px` blur for secondary overlays. This ensures the vibrant "Event Feed" colors bleed through, maintaining a sense of place.

## 5. Components: The Building Blocks

### Cards & Feed Items
*   **Rule:** Forbid the use of divider lines.
*   **Structure:** Use `xl (1.5rem)` corner radius for main feed cards. Separate metadata (date/time) from titles using `1.5rem` of vertical whitespace (Spaced layout) or a subtle background shift to `surface_container_low`.
*   **Imagery:** Event images should use a `lg (1rem)` inner radius to create a "nested" feel within the card.

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `full` roundedness, and `label-md` uppercase text.
*   **Secondary:** `surface_container_high` background with `on_surface` text. No border.
*   **Tertiary:** No background. Use `primary` text weight `600` with a subtle `2px` underline on hover.

### Chips (Event Categories)
*   **Selection:** Use `secondary_container` with `on_secondary_container` text.
*   **Filter:** `surface_container_low` with a `sm (0.25rem)` radius for a more "brutalist" architectural feel compared to buttons.

### Input Fields
*   **Styling:** Use `surface_container_lowest` as the fill. Instead of a 4-sided border, use a `2px` bottom-only highlight in `outline_variant`, which transitions to `primary` on focus.
*   **Error State:** Use `error` for the text and `error_container` as a subtle 10% opacity background wash behind the input.

### Additional Contextual Components
*   **The "Vibe Toggle":** A custom segmented control using `surface_container` for the track and `primary_fixed` for the active thumb to switch between "List View" and "Map View."
*   **Live Indicator:** A pulsing dot using `tertiary_container` to indicate events happening "Now."

## 6. Do's and Don'ts

### Do
*   **Do** use extreme scale. A `display-lg` headline next to a `label-sm` date creates high-end editorial tension.
*   **Do** allow images to bleed to the edges of cards.
*   **Do** use `surface_tint` for subtle overlays on top of photography to ensure text legibility.

### Don't
*   **Don't** use 1px dividers to separate items in a list. Use `1rem` of white space or a tonal shift.
*   **Don't** use pure black `#000000` for text. Use `on_surface (#312950)` to maintain the sophisticated violet-tinted depth.
*   **Don't** use the `DEFAULT` roundedness for everything. Mix `xl` for large cards and `sm` for small tags to create visual rhythm.