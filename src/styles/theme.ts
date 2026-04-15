import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#10b981',
    error: '#ef4444',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '1024px',
    desktop: '1280px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  }
};

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textMuted};
  }
`;
