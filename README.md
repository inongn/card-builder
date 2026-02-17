# Card Builder

A powerful, data-driven character builder for D&D 2024. This project uses a reactive node-based system to translate natural language RPG rules into a dynamic digital character sheet.

## Architecture

The project is split into three main parts:
- **The Library**: A collection of YAML files that define the rules, items, classes, and features.
- **The Engine**: A JavaScript-based processor that builds a character by evaluating expressions and applying effects across a four-stage pipeline.
- **The UI**: A React-based interface (using Vite) that allows users to interact with the character tree, make choices via slots, and view the resulting character data.

## Documentation

For a deep dive into how the system works, please refer to the following guides:

- [**The Node System**](./docs/node-system.md): Understanding the building blocks of the rule tree.
- [**Expressions System**](./docs/expressions-system.md): How to use dynamic values and level-based progression.
- [**The Engine**](./docs/engine.md): Technical details on the build pipeline and character data structure.
- [**Content Authoring Guidelines**](./docs/content-authoring.md): How to translate D&D rules into YAML nodes.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Technology Stack

- **Framework**: React + Vite
- **Styling**: Vanilla CSS (Modern CSS features)
- **Data**: YAML (parsed as JSON)
- **Logic**: Custom reactive engine with dynamic expression evaluation.
