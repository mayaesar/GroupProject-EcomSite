import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserActionContext } from "../UserActionContext";
import { UserContext } from "../UserContext";

const Qty = ({item}) => {
    const { updateQty, cartDetails } = useContext(UserActionContext);
    const {cart} = useContext(UserContext);
    const [quantity, setQuantity] = useState(null)
    const [initialQty, setInitialQty] = useState(null)

    useEffect(() => {
        if(cart && item) {
            setInitialQty(cart.find(ele => ele._id === item._id).qty)
        }
    }, [cartDetails])


    // To create drop-down list for QTY. Max. num is 10 or numInStock whichever is greater. 
    const maxNum = item.numInStock >= 11? 11 : item.numInStock
    let arrNum = []
    for (let i = 1; i < maxNum; i++){
        arrNum.push(i)
    }
    
    // When quantity is updated, updateQty function is called to update the cart/database
    useEffect(() => {
        if(quantity) {
        const price = parseFloat(item.price.replace('$', ''))
        const updatedItem = {_id: item._id, qty: parseInt(quantity), totalPrice: quantity*price}
        updateQty(updatedItem)
        }
    }, [quantity])

    return (
        <Quantity>
            <span>Qty: </span>
            <select name='qty' 
                    id='qty' 
                    value={quantity? quantity : initialQty} 
                    onChange={(e) => setQuantity(e.target.value)
                    }>
            {arrNum.map(num => <option value={num}>{num}</option>)}
            </select>
        </Quantity>
    )
}

export default Qty;

const Quantity = styled.div`
    width: 100px;
    display: inline-flex
    
    span{
        
    }
`