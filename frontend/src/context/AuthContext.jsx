import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("JWTtoken"));

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("loggedUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null;
    }
  });

  const setUserSession = (newToken, newUser) => {
    localStorage.setItem("JWTtoken", newToken);
    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logOut = async () => {
    try {
      const res = await logoutUser();
      if (res?.success) {
        toast.success(res?.message);
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("JWTtoken");
        setUser(null);
        setToken(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "Failed to log out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, setUserSession, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Optional: Create a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
