import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(window.localStorage.getItem("user-id"));
  // user will store firstName, lastName, email, address and order
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [isErr, setIsErr] = useState(false);
  const [isItemsUpdated, setIsItemsUpdated] = useState(false); 

  console.log({userId})

  // To get current user info
  const getUserData = async () => {
    try {
    const res = await fetch(`/api/get-user/${userId}`);
    // const res = await fetch('/api/get-user/460d7e55-fab0-48de-9c07-f61b222bfab6');
    const data = await res.json();
    const userData = data.data
    setCart(userData.cart);
    setWishlist(userData.wishList);
    console.log("!!!!!", userData.cart)
    const filteredUserData = Object.fromEntries(Object.entries(userData)
                              .filter(([key, value]) => key !== 'cart' && key !== 'wishlist'));
    setUser(filteredUserData);
    setIsItemsUpdated(true);
    } catch (err) {
      setIsErr(true);
    }
  }

  ///////////////// need to lookinto this block. For now, see line 6 [userId, setUserId] for a quick fix
  // useEffect(() => {                      
  //   const getUserId = () => {
  //   const extractedInfo = window.localStorage.getItem("user-id");
  //   return extractedInfo && JSON.parse(extractedInfo);
  //   };
  //   setUserId(getUserId());
  //   setIsErr(false);
  //   setIsItemsUpdated(false);
  // }, []);

  useEffect(() =>{
    userId && 
    getUserData();
    setIsErr(false);
    setIsItemsUpdated(false);
  }, [ ,userId])

  return (
    <UserContext.Provider value={{ userId, 
                                   setUserId,
                                   user, 
                                   cart, 
                                   setCart, 
                                   wishlist, 
                                   setWishlist,
                                   getUserData,
                                   isErr,
                                   setIsErr,
                                   isItemsUpdated, 
                                   setIsItemsUpdated,
                                    }}>
      {children}
    </UserContext.Provider>
  );
};
