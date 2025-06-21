import { createContext, useState } from "react";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartNum, setCartNum] = useState(0);

  return (
    <CartContext.Provider value={{ cartNum, setCartNum }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
