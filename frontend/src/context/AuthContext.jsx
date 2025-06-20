import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context (make sure to export it)
export const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Your auth logic here...

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Optional: Create a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};