import { createContext, useState } from 'react';

export const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [dark, setDark] = useState(false);

  function toggleTema() {
    setDark(!dark);
  }

  return (
    <TemaContext.Provider value={{ dark, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}
