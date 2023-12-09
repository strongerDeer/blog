import { ReactNode, createContext, useState } from 'react';

interface ThemeProps {
  children: ReactNode;
}

const ThemeContext = createContext({
  theme: 'light',
  toggleMode: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeProps) => {
  const savedTheme = window.localStorage.getItem('theme');
  const [theme, setTheme] = useState<string>(savedTheme ? savedTheme : 'light');

  const toggleMode = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
