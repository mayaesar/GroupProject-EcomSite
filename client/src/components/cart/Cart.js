import styled from "styled-components";
import Item from "./Item"
import { useContext, useState } from "react"
import { UserActionContext } from "../UserActionContext";
import ActionBar from "./ActionBar";
import { UserContext } from "../UserContext";
import CheckoutForm from "./CheckoutForm";
import Loading from "../shared/Loading";
import DisplayError from "../shared/DisplayError";
import Confirmation from "./Confirmation";

const Cart = () => {
    const {cartDetails, getItemDetails, setCartDetails} = useContext(UserActionContext);
    const {cart, isItemsUpdated, isErr, setIsErr, getUserData, userId} = useContext(UserContext);
    const [checkout, setCheckout] = useState(false);
    const [formData, setFormData] = useState({address: {}, payment: {}, _id: userId});
    const [orderNumber, setOrderNumber] = useState(null);
    const [orderErrMsg, setOrderErrMsg] = useState(null);

    // To calculate subtotal
    const getSubTotal = () => {
        if(!cart) return;
        const arrPrice = cart.map(item => (parseFloat(item.price.replace('$', '')) * item.qty))
        return arrPrice.reduce((a, b) => a+b, 0).toFixed(2)
    }
    
    console.log('cart', cart)
    console.log(cartDetails)
    console.log({isItemsUpdated})

    ////////////////// This block will be removed once we confirm the site is fully functional
    // This is to render the page and update list items
    // useEffect (() => {
    //     isItemsUpdated && getItemDetails(cart, setCartDetails)
    // }, [isItemsUpdated])


    const handleChange = (name, value) => {
        let addressKey = null;
        let paymentKey = null;
        if(name.includes('address.')) {
        addressKey = name.replace('address.', '') 
        setFormData({
            ...formData,
            address: {...formData.address, [addressKey]:value},
            totalPrice: getSubTotal(),
        })
        } else if(name.includes('payment.')){
        paymentKey = name.replace('payment.', '') 
        setFormData({
            ...formData,
            payment: {...formData.payment, [paymentKey]:value},
            totalPrice: getSubTotal(),
        })
        }
    }

    console.log('formData', formData)

    // To closeModal and reset formData
    const closeModal = () => {
        setCheckout(false)
        setFormData({})
    }

    // This is to submit an order
    const placeOrder = async (e) => {
        e.preventDefault()
        // Add userId and subtotal to formData
        
        // formData['_id'] = '460d7e55-fab0-48de-9c07-f61b222bfab6'
        console.log(formData)
        try {
            const res = await fetch('/api/add-order', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    }
                })
            const data = await res.json();
            console.log(data)
            if(data.status === 200) {     
                setOrderNumber(data.orderId) // <========== With this state, we can display a confirmation message
                // Call this function to update user data
                getUserData(); 
            } else {
                setOrderErrMsg(data.message) // <========== Will display an error message e.g. out of stock etc
            }
        } catch (err) {
            setIsErr(true)
        }
    }

    if (isErr) {
        return (<Wrapper>
            <DisplayError errorMsg={orderErrMsg}/>
            </Wrapper>);
        }
    if (orderNumber){
        return <Confirmation orderNumber={orderNumber} userId={userId}/>
    }
    return cart ? (
        <Wrapper>
            <div className="container">
                <h1>My Bag {cart.length > 0 && <span>({cart.length} items)</span>}</h1>
                {/* {cartDetails && cartDetails.map(item =>  */}
                {cart && cart.map(item => 
                <ItemWrapper>
                    <Item key={`cart-${item._id}`} item={item} />
                    <ActionBar item={item} />
                </ItemWrapper>
                )}
            </div>
            {cart.length > 0 && 
            <OrderSummary>
                <div className="container">
                    <h1>Order Summary</h1>
                    <p>Subtotal: ${getSubTotal()}</p>
                    <p>Shipping: FREE</p>
                    <p>Tax: Calculated at checkout</p>
                    <p>Estimated Total: ${getSubTotal()}</p>
                    <Button onClick={() => setCheckout(true)}>
                        CHECKOUT
                    </Button>
                </div>
            <CheckoutForm open={checkout} 
                          closeModal={closeModal} 
                          handleChange={handleChange} 
                          formData={formData} 
                          placeOrder={placeOrder}
                          />
            </OrderSummary>
            }
        </Wrapper>
    ) : (
        <Loader>
          <Loading/>
        </Loader>
        );
}

export default Cart;

const Wrapper = styled.div`
    font-size: 1vw;
    padding-top: 2vw;
    width: 90%;
    max-width: var(--max-page-width);
    margin: auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    
    .container{
        padding: 2vw
    }
    h1{
        font-size: 1.3vw;
        padding-bottom: 1vw;
    }
    p{
        padding-bottom: .5vw;
    }
`
const Button = styled.button`
    background-color: white;
    border: var(--border);
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    line-height: 20px;
    margin-right: 20px;
    padding: 13px 23px;
    text-align: center;
    transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
        transform 0.1s;
    width: 170px;

    &:focus-visible {
        box-shadow: #222222 0 0 0 2px, white 0 0 0 4px;
        transition: box-shadow 0.2s;
    }

    &:active {
        background-color: white;
        border-color: black;
        transform: scale(0.96);
    }
`;

const ItemWrapper = styled.div`
    border: var(--border);
    height: 13vw;
`
const OrderSummary = styled.div`

`

const Loader = styled.div`
  width: 90%;
  margin: auto;
  text-align: center;
  padding-top: 15vw;
  padding-bottom: 15vw;
`;