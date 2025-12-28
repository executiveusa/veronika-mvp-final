# Veronika Design System - Design Tokens

## Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2D6A4F` | Primary brand color, CTAs, links |
| `primary-light` | `#40916C` | Hover states, gradients |
| `primary-dark` | `#1B4332` | Active states, dark accents |

### Secondary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `secondary` | `#C44536` | Secondary CTAs, warnings |
| `secondary-light` | `#E76F51` | Hover states |
| `terracotta` | `#FB7185` | Error states, alerts |

### Accent Colors
| Token | Value | Usage |
|-------|-------|-------|
| `emerald-400` | `#4ADE80` | Success, highlights |
| `cyan-400` | `#22D3EE` | Info, links |
| `indigo-400` | `#818CF8` | Interactive elements |
| `amber-400` | `#FBBF24` | Warnings, stars |

### Background Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg-dark-primary` | `#0F172A` | Dark section backgrounds |
| `bg-dark-secondary` | `#1E293B` | Dark card backgrounds |
| `bg-light-primary` | `#FAFBFC` | Light section backgrounds |
| `bg-light-secondary` | `#FFFFFF` | Cards on light backgrounds |

### Text Colors
| Token | Value | Usage |
|-------|-------|-------|
| `text-white` | `#FFFFFF` | Primary text on dark |
| `text-white-muted` | `rgba(226, 232, 240, 0.8)` | Secondary text on dark |
| `text-white-subtle` | `rgba(226, 232, 240, 0.5)` | Tertiary text on dark |
| `text-dark` | `#1A1A1A` | Primary text on light |
| `text-dark-muted` | `#4A4A4A` | Secondary text on light |

## Typography

### Font Families
- **Display**: `'Playfair Display', Georgia, serif` - Headlines, h1-h6
- **Body**: `'DM Sans', system-ui, sans-serif` - Body text, UI elements

### Font Sizes
| Token | Size | Usage |
|-------|------|-------|
| `text-7xl` | 4.5rem (72px) | Hero headlines |
| `text-6xl` | 3.75rem (60px) | Section headlines |
| `text-5xl` | 3rem (48px) | Large headlines |
| `text-4xl` | 2.25rem (36px) | Medium headlines |
| `text-xl` | 1.25rem (20px) | Large body text |
| `text-lg` | 1.125rem (18px) | Body text |
| `text-sm` | 0.875rem (14px) | Small text, labels |

## Spacing

### Base Unit: 4px
| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-24` | 96px |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 0.5rem (8px) | Small buttons, badges |
| `radius-md` | 0.75rem (12px) | Default buttons |
| `radius-lg` | 1rem (16px) | Cards |
| `radius-xl` | 1.5rem (24px) | Large cards |
| `radius-2xl` | 2rem (32px) | Hero elements |
| `radius-full` | 9999px | Circular elements |

## Shadows

### Light Mode
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.07);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08);
```

### Glow Effects
```css
--glow-primary: 0 4px 20px rgba(45, 106, 79, 0.4);
--glow-emerald: 0 0 40px rgba(74, 222, 128, 0.3);
```

## Gradients

### Brand Gradients
```css
/* Primary CTA Gradient */
background: linear-gradient(135deg, #2D6A4F 0%, #40916C 100%);

/* Hero Background */
background: linear-gradient(135deg, #0F172A 0%, #1E293B 25%, #0F172A 50%, #1E1B4B 75%, #0F172A 100%);

/* Text Gradient */
background: linear-gradient(135deg, #4ADE80 0%, #22D3EE 50%, #818CF8 100%);

/* CTA Section */
background: linear-gradient(135deg, #2D6A4F 0%, #40916C 50%, #84A98C 100%);
```

## Animation Tokens

### Durations
| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Hover states |
| `duration-normal` | 300ms | Default transitions |
| `duration-slow` | 500ms | Page transitions |
| `duration-float` | 4-6s | Floating animations |

### Easing
```css
--ease-smooth: cubic-bezier(0.25, 0.4, 0.25, 1);
--ease-spring: spring(1, 100, 10, 0);
```

### Motion Presets
```js
// Fade in up
{
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
}

// Floating
{
  animate: { y: [-10, 10, -10] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
}

// Pulse glow
{
  animate: { scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
}
```

## Glassmorphism

### Standard Glass
```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(10px);
```

### Strong Glass
```css
background: rgba(15, 23, 42, 0.95);
border: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px);
```

## Accessibility

### Color Contrast Requirements
- **AA Standard**: 4.5:1 for normal text, 3:1 for large text
- **AAA Standard**: 7:1 for normal text, 4.5:1 for large text

### Verified Combinations
| Background | Text Color | Contrast Ratio |
|------------|------------|----------------|
| `#0F172A` | `#FFFFFF` | 15.8:1 ✓ |
| `#0F172A` | `rgba(226, 232, 240, 0.8)` | 10.2:1 ✓ |
| `#FAFBFC` | `#1A1A1A` | 12.6:1 ✓ |
| `#2D6A4F` | `#FFFFFF` | 5.3:1 ✓ |

## Focus States
```css
:focus-visible {
  outline: none;
  ring: 2px solid var(--primary);
  ring-offset: 2px;
  ring-offset-color: var(--background);
}
```

---

*Last updated: December 2024*
*Design System Version: 2.0*
