---
name: Finance Assistant
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#43474b'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#73777b'
  outline-variant: '#c3c7cb'
  surface-tint: '#50616c'
  primary: '#00080e'
  on-primary: '#ffffff'
  primary-container: '#10212b'
  on-primary-container: '#788995'
  inverse-primary: '#b7c9d6'
  secondary: '#52652c'
  on-secondary: '#ffffff'
  secondary-container: '#d4eba4'
  on-secondary-container: '#586b32'
  tertiary: '#030900'
  on-tertiary: '#ffffff'
  tertiary-container: '#19220e'
  on-tertiary-container: '#7f8b70'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e5f3'
  primary-fixed-dim: '#b7c9d6'
  on-primary-fixed: '#0c1d27'
  on-primary-fixed-variant: '#384954'
  secondary-fixed: '#d4eba4'
  secondary-fixed-dim: '#b9cf8a'
  on-secondary-fixed: '#141f00'
  on-secondary-fixed-variant: '#3b4d17'
  tertiary-fixed: '#dbe7c8'
  tertiary-fixed-dim: '#bfcbad'
  on-tertiary-fixed: '#151e0b'
  on-tertiary-fixed-variant: '#404a33'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-price:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Work Sans
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  page_margin: 24px
  section_gap: 32px
  element_gap: 16px
  inner_padding: 20px
---

## Brand & Style

The design system is anchored in the concept of "Quiet Confidence." Designed specifically for business owners navigating financial complexity within a mobile environment, it prioritizes mental clarity and ease of use over technical density. 

The aesthetic style is a refined mix of **Minimalism** and **Tactile Paper Design**. It avoids the coldness of traditional fintech by utilizing a "paper-like" texture for critical data points (like receipts or invoices), creating a bridge between the physical and digital worlds. The emotional goal is to make the user feel organized and in control, using generous whitespace and a subdued palette to reduce cognitive load.

## Colors

The palette uses a high-contrast but low-vibrancy approach to maintain a professional atmosphere. 

- **Primary (Dark Navy-Teal):** Used for primary text, iconography, and high-importance interactive elements. It provides the "weight" of the design system.
- **Accent (Muted Olive):** Used sparingly for highlighting active states, secondary buttons, or specific "growth" metrics. It is intentionally understated to avoid distraction.
- **Backgrounds:** The interface lives on a Pure White (#FFFFFF) canvas. To create depth without using heavy grays, soft tints of #EFFBDB are used for container backgrounds and section dividers, echoing a natural, eco-friendly paper tone.
- **Semantic Colors:** Statuses are always paired with icons. The green, ochre, and brick-red tones are desaturated to ensure they fit the "calm" aesthetic while remaining clearly distinguishable.

## Typography

This design system utilizes **Manrope** for its modern, balanced proportions, providing excellent readability for financial data. **Work Sans** is used for labels to provide a subtle "utility" feel that contrasts with the softer curves of Manrope.

Total amounts and prices should always use the Primary color and a Bold/700 weight to ensure immediate recognition. Labels (e.g., "Transaction Date," "Category") use muted grays and a slightly wider letter spacing in Work Sans to distinguish them from user-generated content.

## Layout & Spacing

This design system follows a **Fixed-Fluid Mobile Hybrid** model optimized for Telegram's Mini App viewport. 

The layout relies on a generous **24px outer margin** to give the content "room to breathe," which is significantly larger than the standard 16px. This creates a more premium, editorial feel. Content is organized into "Paper Modules" (cards) that stretch to the margins. 

Vertical rhythm is strictly maintained with a 4px baseline, but visible gaps between sections are kept large (32px) to prevent the "wall of text" effect common in business applications.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Soft Shadows** rather than intense gradients. 

- **Level 0 (Base):** Pure White.
- **Level 1 (Containers):** Soft Tint (#EFFBDB) with a 1px border of the same color, slightly darkened by 5%.
- **Level 2 (Paper Elements):** Pure White cards with a very soft, diffused shadow (`0px 4px 20px rgba(16, 33, 43, 0.04)`). These cards feature a subtle grain texture overlay (2% opacity) to mimic the "paper-like" feel mentioned in the brief.

Interactive elements like buttons do not "lift" on press; instead, they slightly darken in color or use a subtle "inset" shadow to signify physical pressure.

## Shapes

The design system uses a **Rounded** shape language to reinforce the "non-techy" and "approachable" brand personality. 

Standard components like cards and input fields utilize an **8px (0.5rem)** radius. Larger structural containers, such as bottom sheets or primary "paper" modules, use a **16px (1rem)** radius to appear more welcoming. Icons are contained within circular or highly rounded square housings to avoid sharp, aggressive angles.

## Components

- **Buttons:** Primary buttons use the Primary Navy-Teal with white text. Secondary buttons are "Ghost" style with a 1px border in #EFFBDB.
- **Cards (Receipts):** These are the core of the experience. They use the Level 2 elevation, a white background, and a "perforated" divider line (dashed) to separate the header from the transaction details.
- **Input Fields:** Minimalist design with no background—only a bottom border in #EFFBDB that turns Muted Olive Green on focus.
- **Chips/Filters:** Highly rounded (Pill) containers with a background of #EFFBDB and text in the Primary color.
- **Status Badges:** Small, subtle chips using a 10% opacity version of the status color for the background, paired with a solid-colored icon and text.
- **Transaction Lists:** Clean rows with 24px horizontal padding. The amount is right-aligned in Primary bold, with the label in Muted Gray beneath the title.
- **Bottom Sheets:** For financial actions (e.g., "Add Expense"), using a 24px top-corner radius and a tactile "handle" at the top.