# Contributing to Acacia React

Thank you for your interest in contributing to Acacia React! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Development Environment](#development-environment)
  - [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
  - [Creating a New Component](#creating-a-new-component)
  - [Testing](#testing)
  - [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

We expect all contributors to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please make sure you read and understand it before contributing.

## Getting Started

### Development Environment

1. Fork the repository on GitHub
2. Clone your fork to your local machine



git clone https://github.com/YOUR_USERNAME/acacia-react.git
   cd acacia-react
   ```
3. Add the original repository as an upstream remote
   ```
   git remote add upstream https://github.com/ORIGINAL_OWNER/acacia-react.git
   ```
4. Install dependencies
   ```
   npm install
   ```
5. Start the development environment
   ```
   npm run storybook
   ```

### Project Structure

The project is structured as follows:

```
acacia-react/
├── src/                             # Main source code
│   ├── components/                  # Individual components
│   ├── hooks/                       # Custom hooks
│   ├── utils/                       # Utility functions
│   ├── types/                       # TypeScript type definitions
│   ├── styles/                      # Global styles/theme
│   └── index.ts                     # Main entry point
├── stories/                         # Storybook stories
├── examples/                        # Example usage
└── tests/                           # Tests
```

## Development Workflow

### Creating a New Component

1. Create a new branch for your component
   ```
   git checkout -b feature/new-component-name
   ```

2. Create a new folder under `src/components`
   ```
   mkdir -p src/components/NewComponent
   ```

3. Create the following files:
   - `NewComponent.tsx` - The component implementation
   - `NewComponent.test.tsx` - Tests for the component
   - `NewComponent.stories.tsx` - Storybook stories
   - `NewComponent.module.css` (if needed) - Component styles
   - `index.ts` - Export file

4. Implement your component following the project's coding standards and design principles

### Testing

We use Jest and React Testing Library for testing. Please make sure to write tests for your components.

```
npm test
```

To run tests in watch mode:

```
npm run test:watch
```

### Documentation

All components should have:

1. Proper JSDoc comments
2. Storybook stories demonstrating usage
3. Props documentation in Storybook

## Pull Request Process

1. Update your fork with the latest changes from upstream
   ```
   git fetch upstream
   git merge upstream/main
   ```

2. Make sure your code passes all tests and linting
   ```
   npm run lint
   npm test


3. Create a pull request to the main repository

4. Ensure the PR description clearly describes the problem and solution
   - Include the relevant issue number if applicable
   - Provide screenshots or GIFs for UI changes

5. Your PR will be reviewed by maintainers, who may request changes

6. Once approved, a maintainer will merge your PR

## Release Process

Releases are managed by the core team and follow semantic versioning. If you think your changes warrant a new release, please mention it in your PR description.
