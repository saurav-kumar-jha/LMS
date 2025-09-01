import React, { createContext, useState, useEffect, useContext } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage when app starts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (course) => {
    if (!wishlist.find((c) => c.id === course.id)) {
      setWishlist([...wishlist, course]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((c) => c.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishList = ()=> useContext(WishlistContext)