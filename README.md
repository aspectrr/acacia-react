# Acacia React

A modern React component library built with TypeScript.

## Installation

```bash
npm install @yourorg/acacia-react
```

or with yarn:

```bash
yarn add @yourorg/acacia-react
```

## Usage

```jsx
import { Button } from '@yourorg/acacia-react';
import '@yourorg/acacia-react/styles'; // Import styles

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
    </div>
  );
}
```

## Available Components

- `Button`: A versatile button component with various styles and sizes
- More components coming soon!

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/acacia-react.git
cd acacia-react
```

2. Install dependencies:

```bash
npm install
```

3. Start Storybook:

```bash
npm run storybook
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Features

- 🔥 Modern React with functional components and hooks
- 📦 Tree-shakeable ESM modules
- 🏷️ TypeScript support with comprehensive type definitions
- 🎨 Flexible theming and styling
- 📚 Comprehensive documentation with Storybook
- ✅ Thoroughly tested with Jest and React Testing Library

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/hooks` - Custom React hooks
  - `/utils` - Utility functions
  - `/types` - TypeScript type definitions
  - `/styles` - Global styles and theming
- `/stories` - Storybook configuration and stories
- `/examples` - Example usage
- `/tests` - Test setup and configurations

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
