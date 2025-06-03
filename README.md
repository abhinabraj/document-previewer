# Document Previewer

A simple document previewer built with React and TypeScript, where we can visualize the structure of a document and select specific sections to highlight.

## Features

- Displays the structure of a document with different sections
- Allows users to select specific sections to highlight
- Provides zoom functionality to zoom in and out
- Provides a reset button to reset the zoom and fit the document to the screen

## Installation

1. Clone the repository
2. Install dependencies using `yarn`
3. Run the application using `yarn dev`

## Usage

1. Open the application in your browser
3. Select the sections you want to highlight
4. Zoom in and out using the zoom controls
5. Reset the zoom and fit the document to the screen using the reset button

## Packages used

### Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that allows you to style your application with a set of pre-defined classes. It provides a wide range of utility classes, such as `text-gray-500`, `bg-blue-500`, `rounded-lg`, and `p-4`. It is used to in this project to quickly style the application.

### React Icons

[React Icons](https://react-icons.github.io/react-icons/) is a library of icons that can be used in React applications. It provides a set of SVG icons that can be easily integrated into your application. In this project, we use it to display the "more" icon in the sidebar.

## Google Lighthouse Insight
![image](https://github.com/user-attachments/assets/c81b7d3f-8e30-4dcb-a4c0-c8df2d3f1d83)



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
