import { Dialog, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const CheckoutForm = ({open, closeModal, handleChange, placeOrder, formData}) => {
    const {user} = useContext(UserContext);
    return user && (
        <Dialog open={open} >
            <Box position="absolute" top={5} right={5}>
                <IconButton onClick={() => closeModal()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Wrapper>
                <section>
                <div>
                    <h1>Checkout</h1>
                    <section>
                        <p>Name: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                    </section>
                    
                        {user.adress?(
                            <section>
                                <p>Shipping address:</p>
                                <p>{user.adress}</p>
                            </section>
                            
                        ):(
                            <form onSubmit={(e) => placeOrder(e, formData)}>
                                <p>Shipping address:</p>
                                <input type='text'
                                        name='address.street'
                                        placeholder='Street'
                                        value={formData.street}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                <input type='text'
                                        name='address.city'
                                        Placeholder='City'
                                        value={formData.city}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                <input type='text'
                                        name='address.province'
                                        placeholder='Province'
                                        value={formData.province}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                <input type='text'
                                        name='address.postalcode'
                                        placeholder='Postalcode'
                                        value={formData.postalcode}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                <input type='text'
                                        name='address.country'
                                        placeholder='Country'
                                        value={formData.country}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                <div>
                                <p>Payment:</p>
                                <input type='text'
                                        name='payment.creditCard'
                                        placeholder='Credit Card'
                                        value={formData.creditCard}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                <input type='text'
                                        name='payment.expiration'
                                        placeholder='Expiration'
                                        value={formData.expiration}
                                        required={true}
                                        onChange={e => handleChange(e.target.name, e.target.value)}
                                        />
                                </div>
                                <Button type='submit' >Submit</Button>
                            </form>
                        )}
                </div>
                </section>
            </Wrapper>
        </Dialog>
    )
}

const Wrapper = styled.div`
    width: 90%;
    margin: auto;
    padding: 4vw;
    h1{
        font-size: 1.3vw;
        padding-bottom: 0.5vw;
    }
    form{
        display: grid;
    }
    p{
        padding-top: 1vw;
    }
`;
const Button = styled.button`
    margin-top: 1vw;
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
export default CheckoutForm;
