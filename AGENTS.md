# Acacia React Library - Agent Documentation

## Project Overview

Acacia React is a modern React component library built with TypeScript, designed to provide reusable UI components with extension field capabilities. The library is structured for ESM and CommonJS consumption with TypeScript type definitions.

## Project Structure

acacia-react/
├── .github/             # GitHub configuration files
├── .storybook/          # Storybook configuration
├── examples/            # Example implementations
├── scripts/             # Build and utility scripts
├── src/                 # Source code
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # CSS and styling utilities
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── index.ts         # Main entry point
├── stories/             # Storybook stories
└── tests/               # Test files


## Key Features

1. **Extension Field System**: The library includes a special `AcaciaWrapper` component that can analyze and display extension fields that aren't directly rendered by child components.

2. **TypeScript Support**: Full TypeScript definitions are available for all components and utilities.

3. **Dual Module Format**: Supports both ESM and CommonJS module systems.

## Build System

The project uses Rollup to bundle the components into different formats:
- ESM (ES modules) for modern bundlers
- CommonJS for Node.js and older bundlers
- Separate type definitions for TypeScript support

## Development Workflow

1. Use Storybook for component development and testing (`npm run storybook`)
2. Build the library with `npm run build`
3. Run tests with `npm test`

## Dependencies

- **React 16.8+**: Utilizes React hooks
- **TypeScript**: For static type checking
- **Rollup**: For bundling
- **Storybook**: For component documentation and testing
- **lucide-react**: For icons

## Recommendations for Agents

1. When adding new components, maintain the extension field pattern established in `AcaciaWrapper`.
2. Use TypeScript for all new code and ensure proper type exports.
3. Include Storybook stories for visual testing and documentation.
4. Update the main export file (`src/index.ts`) when adding new components or utilities.
