
# Nexus Analytica Frontend

This is the frontend application for Nexus Analytica, a React + TypeScript project built with Vite. The application consumes the OMDb API to display movie information.

## Features

- Search movies by title.
- View detailed movie information.
- Responsive design.
- Animated UI components with Framer Motion.
- Routing handled by React Router DOM.
- Environment variable support for API key management.

## Setup and Installation

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://your-repository-url.git
cd your-repository-folder
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root of your project with the following content:

```env
VITE_OMDB_API_KEY=77144624
```

This key is used to access the OMDb API.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Scripts

- `dev`: Starts the development server with hot module replacement.
- `build`: Builds the app for production.
- `preview`: Previews the production build locally.
- `lint`: Runs ESLint checks.

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Ant Design
- Framer Motion
- ESLint with TypeScript and React plugins

## ESLint Configuration

The project uses advanced ESLint rules for TypeScript and React to ensure code quality:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

You can optionally add React-specific lint rules using:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## Environment Variables

The app expects the following environment variable in `.env`:

```
VITE_OMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OMDb API key.

## License

MIT License

---

Made with ❤️ for Nexus Analytica.
