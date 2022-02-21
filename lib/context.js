import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  let sharedState = {
    user: user,
    setUser: setUser,
    token: token,
    setToken: setToken
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}