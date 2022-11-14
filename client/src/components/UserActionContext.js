import { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";

export const UserActionContext = createContext(null);

export const UserActionProvider = ({ children }) => {
  const {
    cart,
    setCart,
    wishlist,
    setWishlist,
    setIsErr,
    setIsItemsUpdated,
    isErr,
    userId,
  } = useContext(UserContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [wishlistDetails, setWishlistDetails] = useState(null);

  ///////////////////////// We are working change the logic not to do this second fetch to display items in cart and wishlist
  ///////////////////////// Leave this block until we confirm the site is fully functional with another method.
  // To get item details of cart or wishlist
  // This function takes two parameters to update the state
  //  - arrName : cart or wishlist
  //  - setDetails : cartDetails or wishlistDetails
  // const getItemDetails = (arrName, setDetails) => {
  //     const items = arrName.map(item => item._id)
  //     const promises = [];
  //     items.forEach(item => {
  //         promises.push(
  //             fetch(`/api/get-item/${item}`)
  //             .then(res => res.json())
  //             .then(data => data.data)
  //         )
  //     })
  //     Promise.all(promises).then((result) => setDetails(result))
  // }
  /////////////////////////


    // To update cart and/or wishlist
    const updateUserData = async (obj) => {
        obj['_id'] = userId;
        // obj['_id'] = '460d7e55-fab0-48de-9c07-f61b222bfab6';   // <==== This will be removed before submission.  
        try {
            const res = await fetch('/api/update-user', {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(obj)
                })
            const data = await res.json();
            console.log(data)
            // To get updated cart and wishlist
            if(data.status !== 200) return setIsErr(true);
            data.data && setCart(data.data)
            data.data.wishList && setWishlist(data.data.wishList)
        } catch (err) {
            setIsErr(true)
        } finally {
            !isErr && setIsItemsUpdated(true)
        }


    }
  


    // To add an item to cart
    // This function is passed to Wishlist and ProductDetails component
    const addItem = (item) => {
        console.log('ADD TO CART')
        console.log({cart})
        setIsItemsUpdated(false)
        updateUserData({cart:item});
    }


  let updatedCart = [];

  // To update qty
  const updateQty = (item) => {
    // console.log("UPDATE QTY");
    // console.log({ item });
    // setIsItemsUpdated(false);
    // const index = cart.findIndex((obj) => obj._id === item._id);
    // console.log(index);
    // cart.splice(index, 1, item);
    // console.log("updated", cart);
    // updateUserData({ cart: [cart] });
  };


    // To delete an item from cart
    const deleteItem = (item) => {
        console.log('DELETE ITEM')
        console.log({item})
        setIsItemsUpdated(false)
        updatedCart =cart.find(obj => obj._id === item._id)
        updateUserData({cartD: updatedCart});
    }

    // To add an item to wishlist and delete it from cart
    //this function is a strech 
    const saveForLater = (item) => {
        // console.log('SAVE FOR LATER')
        // console.log({item})
        // setIsItemsUpdated(false)
        // console.log(cart)
        // const itemAddMovetoWishList = cart.find(obj => obj._id !== item._id)
        // updatedCart = cart.filter(obj => obj._id !== item._id)
        // updateUserData({cart: updatedCart, wishList: [...wishlist, itemAddMovetoWishList]});
    }

//this function is a strech 
  // To add an item to wishlist
  const addToWishlist = (item) => {
    // console.log("ADD TO WISHLIST");
    // console.log({ item });
    // console.log(wishlist);
    // setIsItemsUpdated(false);
    // updateUserData({ wishList: [...wishlist, item] });
  };

  let updatedWishlist = [];
//this function is a strech 
  // To delete an item from wishlist
  const deleteFromWishlist = (item) => {
    // console.log("DELETE FROM WISHLIST");
    // console.log({ item });
    // setIsItemsUpdated(false);
    // updatedWishlist = wishlist.filter((obj) => obj._id !== item._id);
    // updateUserData({ wishlist: updatedWishlist });
  };

  //this function is a strech 
  // To add an item to cart and remove it from wishlist
  const moveToCart = (item) => {
    // console.log("MOVE TO CART");
    // console.log({ item });
    // setIsItemsUpdated(false);
    // updatedWishlist = wishlist.filter((obj) => obj._id !== item._id);
    // updateUserData({ cart: [...cart, item], wishlist: updatedWishlist });
  };

  return (
    <UserActionContext.Provider
      value={{
        deleteItem,
        addItem,
        updateQty,
        saveForLater,
        addToWishlist,
        deleteFromWishlist,
        moveToCart,
        // getItemDetails,
        cart,
        cartDetails,
        setCartDetails,
        wishlist,
        wishlistDetails,
        setWishlistDetails,
      }}
    >
      {children}
    </UserActionContext.Provider>
  );
};

