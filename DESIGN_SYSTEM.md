# Cognitive Gym Design System

## Vision & Philosophy

The Cognitive Gym design system embodies the intersection of Apple's refined minimalism and spaceship cockpit precision. Every element serves a purpose, every animation has meaning, and every interaction feels inevitable.

## Color Palette

### Primary Colors
- **Pure Black**: `#000000` - Primary background, infinite depth
- **Pure White**: `#FFFFFF` - Primary actions, text, highlights
- **Neural Gray**: `#171717` - Secondary backgrounds
- **Synapse Gray**: `#262626` - Card backgrounds
- **Thought Gray**: `#404040` - Borders, dividers

### Semantic Colors
- **Success**: `#10B981` - Achievements, positive feedback
- **Warning**: `#F59E0B` - Attention, moderate alerts
- **Error**: `#EF4444` - Critical alerts, errors
- **Info**: `#3B82F6` - Information, links

### Opacity Scale
- **100%**: Primary content
- **90%**: Secondary content
- **70%**: Tertiary content
- **50%**: Disabled states
- **30%**: Subtle elements
- **10%**: Backgrounds, overlays

## Typography

### Font Stack
\`\`\`css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
\`\`\`

### Scale
- **Display**: 48px / 3rem - Hero headings
- **H1**: 36px / 2.25rem - Page titles
- **H2**: 24px / 1.5rem - Section headers
- **H3**: 20px / 1.25rem - Subsection headers
- **Body**: 16px / 1rem - Primary text
- **Small**: 14px / 0.875rem - Secondary text
- **Micro**: 12px / 0.75rem - Captions, labels

### Weights
- **Light**: 300 - Large numbers, displays
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasis
- **Semibold**: 600 - Headings
- **Bold**: 700 - Strong emphasis

## Spacing System

Based on 8px grid for perfect alignment:

- **xs**: 4px - Tight spacing
- **sm**: 8px - Small spacing
- **md**: 16px - Default spacing
- **lg**: 24px - Large spacing
- **xl**: 32px - Extra large spacing
- **2xl**: 48px - Section spacing
- **3xl**: 64px - Page spacing

## Border Radius

- **sm**: 8px - Small elements
- **md**: 12px - Default elements
- **lg**: 16px - Cards, panels
- **xl**: 24px - Large containers
- **full**: 9999px - Pills, badges

## Shadows & Elevation

### Elevation Levels
\`\`\`css
/* Level 1 - Subtle lift */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

/* Level 2 - Card elevation */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06);

/* Level 3 - Modal elevation */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);

/* Level 4 - Maximum elevation */
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15);
\`\`\`

## Animation Principles

### Timing Functions
- **Ease Out**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Entrances
- **Ease In**: `cubic-bezier(0.55, 0.055, 0.675, 0.19)` - Exits
- **Ease In Out**: `cubic-bezier(0.645, 0.045, 0.355, 1)` - Transitions
- **Spring**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` - Interactions

### Duration Scale
- **Fast**: 150ms - Micro-interactions
- **Normal**: 300ms - Standard transitions
- **Slow**: 500ms - Complex animations
- **Slower**: 800ms - Page transitions

### Animation Types

#### Micro-interactions
\`\`\`css
/* Button Press */
.button-press {
  transition: transform 150ms ease-out;
}
.button-press:active {
  transform: scale(0.98);
}

/* Hover Lift */
.hover-lift {
  transition: transform 300ms ease-out;
}
.hover-lift:hover {
  transform: translateY(-2px);
}
\`\`\`

#### Loading States
\`\`\`css
/* Pulse Animation */
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

/* Shimmer Effect */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
\`\`\`

#### Page Transitions
\`\`\`css
/* Slide In */
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
\`\`\`

## Component Patterns

### Cards
- **Background**: Neural Gray with subtle transparency
- **Border**: 1px solid with low opacity
- **Radius**: 16px for premium feel
- **Padding**: 24px for breathing room
- **Hover**: Subtle lift and border brightening

### Buttons
- **Primary**: White background, black text
- **Secondary**: Transparent with white border
- **Ghost**: Text only with hover background
- **Disabled**: 50% opacity, no interactions

### Forms
- **Input**: Minimal border, focus state with white accent
- **Label**: Small text above input
- **Error**: Red accent with descriptive message
- **Success**: Green accent with confirmation

### Navigation
- **Active State**: White text with underline
- **Inactive**: 50% opacity with hover brightening
- **Transition**: Smooth opacity and position changes

## Responsive Breakpoints

\`\`\`css
/* Mobile First Approach */
/* xs: 0px - 639px */
/* sm: 640px - 767px */
/* md: 768px - 1023px */
/* lg: 1024px - 1279px */
/* xl: 1280px - 1535px */
/* 2xl: 1536px+ */
\`\`\`

## Accessibility Guidelines

### Color Contrast
- **AA Standard**: 4.5:1 for normal text
- **AAA Standard**: 7:1 for enhanced accessibility
- **Large Text**: 3:1 minimum ratio

### Focus States
- **Visible**: 2px white outline with 2px offset
- **Keyboard Navigation**: Clear focus indicators
- **Skip Links**: Hidden until focused

### Motion
- **Reduced Motion**: Respect user preferences
- **Essential Motion**: Only for feedback and state changes
- **Decorative Motion**: Can be disabled

## Implementation Guidelines

### CSS Architecture
\`\`\`css
/* Utility-first approach with Tailwind CSS */
/* Custom utilities for brand-specific needs */
/* Component classes for complex patterns */
\`\`\`

### Performance
- **Critical CSS**: Inline above-the-fold styles
- **Lazy Loading**: Non-critical animations and images
- **Hardware Acceleration**: Use transform and opacity for animations

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Graceful Degradation**: Fallbacks for older browsers
- **Progressive Enhancement**: Core functionality first
