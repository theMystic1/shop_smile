import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // cart
  useEffect(() => {
    async function loadCart() {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from AsyncStorage:", error);
      }
    }

    loadCart();
  }, []);

  useEffect(() => {
    async function saveCart() {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to AsyncStorage:", error);
      }
    }

    if (cart.length > 0) {
      saveCart();
    }
  }, [cart]);

  // favorite

  useEffect(() => {
    async function loadFav() {
      try {
        const savedFav = await AsyncStorage.getItem("favorite");
        if (savedFav) {
          setFavoriteItems(JSON.parse(savedFav));
        }
      } catch (error) {
        console.error("Failed to load Fav items:", error);
      }
    }

    loadFav();
  }, []);

  useEffect(() => {
    async function saveFav() {
      try {
        await AsyncStorage.setItem("favorite", JSON.stringify(favoriteItems));
      } catch (error) {
        console.error("Failed to save Favorite item:", error);
      }
    }

    if (favoriteItems.length > 0) {
      saveFav();
    }
  }, [favoriteItems]);

  async function addToCart(cartItem) {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) => item.unique_id === cartItem.unique_id
      );
      let newCart;
      if (itemIndex === -1) {
        newCart = [...prevCart, { ...cartItem, quantity: 1 }];
      } else {
        newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
      }
      return newCart;
    });
  }

  async function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.unique_id !== id));

    await AsyncStorage.removeItem("cart", () =>
      cart.filter((item) => item.unique_id !== id)
    );
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.current_price[0].GBP[0] * item.quantity,
    0
  );

  function clearCart() {
    setCart([]);
  }

  function isInCart(product) {
    return cart.some((prod) => prod.unique_id === product.unique_id);
  }

  function incDecQuantity(id, type) {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.unique_id === id) {
          return {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1),
          };
        }
        return item;
      });
    });
  }

  function addToFav(favItem) {
    setFavoriteItems((prevFav) => [...prevFav, favItem]);
  }
  async function removeFromFav(id) {
    setFavoriteItems((prevFav) =>
      prevFav.filter((fav) => fav.unique_id !== id)
    );
    await AsyncStorage.removeItem("favorite", () =>
      favoriteItems.filter((fav) => fav.unique_id !== id)
    );
  }
  function isFav(favItem) {
    return favoriteItems.some((fav) => fav.unique_id === favItem.unique_id);
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        totalPrice,
        clearCart,
        incDecQuantity,
        isInCart,
        addToFav,
        removeFromFav,
        isFav,
        favoriteItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (context === undefined)
    throw new Error("Cart context was used outside cart Context provider");

  return context;
}

export { useCart, ContextProvider };
