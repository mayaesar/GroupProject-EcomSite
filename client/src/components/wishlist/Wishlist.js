import styled from "styled-components";
import Item from "../cart/Item"
import Action from "../cart/Action";
import { useContext } from "react"
import { UserActionContext } from "../UserActionContext";
import { useEffect } from "react";
import { UserContext } from "../UserContext";

const Wishlist = () => {
    const {wishlistDetails, 
            wishlist,
            // setWishlistDetails,  <=====
            deleteFromWishlist, 
            // getItemDetails,      <=====
            moveToCart,
            } = useContext(UserActionContext)
    // const {isItemsUpdated} = useContext(UserContext);        <=====

    ////////////////// This block will be removed once we confirm the site is fully functional
    // This is to render the page and update list items
    // useEffect(() => {
    //     isItemsUpdated && getItemDetails(wishlist, setWishlistDetails)
    // }, [isItemsUpdated])

    console.log('wishlist', wishlist)
    console.log(wishlistDetails)

    return(
        <Wrapper>
            <h1>My Wishlist</h1>
            {/* {wishlistDetails && wishlistDetails.map(item =>  */}
            {wishlist && wishlist.map(item => item &&
            <ItemWrapper>
                <Item item={item} />
                <div className="actionBar">
                    <Action label="Add to Cart" 
                        itemId={item._id} 
                        onClickFunc={moveToCart} 
                        itemObj={{_id: item._id, 
                                  qty: 1, 
                                  price: item.price,
                                  name: item.name,
                                  imageSrc: item.imageSrc,
                                  }}
                                  />
                    <Action label="Delete" 
                        itemId={item._id} 
                        onClickFunc={deleteFromWishlist} 
                        itemObj={{_id: item._id}}/>
                </div>
            </ItemWrapper>
            )}
        </Wrapper>
    );
}

export default Wishlist;

const Wrapper = styled.div`
    font-size: 1vw;
    padding-top: 2vw;
    width: 90%;
    max-width: var(--max-page-width);
    margin: auto;
    display: grid;
    h1{
        font-size: 1.3vw;
        padding-bottom: 1vw;
    }
`
const ItemWrapper = styled.div`
    border: var(--border);
    .actionBar{
        margin-left: 12vw;
        padding-bottom: 2vw;
        margin-top: -2vw;
    }
`