# HaoIn Tools Logo

## Logo Files

The following logo files are available in the `public/` directory:

- `logo.svg` - Main SVG logo (recommended for web use)
- `favicon.svg` - SVG favicon for modern browsers
- `logo.png` - PNG version of the logo
- `favicon.ico` - Traditional ICO favicon (fallback)

## Logo Usage

The logo is used in the following places:

1. **Sidebar Header** - Main navigation logo
2. **Favicon** - Browser tab icon
3. **Logo Component** - Reusable React component

## Logo Component

The `Logo` component is located at `src/components/Logo.tsx` and supports:

- **Size variants**: `sm`, `md`, `lg`
- **Custom styling**: via `className` prop
- **Responsive design**: scales with container

### Usage Example

```tsx
import { Logo } from "@/components/Logo";

// Small logo
<Logo size="sm" />

// Medium logo (default)
<Logo size="md" />

// Large logo with custom styling
<Logo size="lg" className="text-blue-500" />
```

## Logo Design

The logo features:

- **Blue gradient background** (#2563eb to #1d4ed8)
- **White tool icon** representing various tools
- **Rounded corners** (14px border radius)
- **64x64 viewBox** for scalability

## Browser Support

- **SVG favicon**: Supported in modern browsers (Chrome 80+, Firefox 41+, Safari 9+)
- **ICO fallback**: For older browsers
- **PNG versions**: For specific use cases

