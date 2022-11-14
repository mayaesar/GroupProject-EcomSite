import styled from "styled-components"
import { Link } from "react-router-dom";

const Confirmation = ({orderNumber, userId}) => {

    return(
        <Wrapper>
            <h1>Your order is complete!</h1>
            <h2>Your order number is: {orderNumber}</h2>
            <div>
                <Button to="/">Back to Homepage</Button>
                <Button to={`/account/${userId}`}>View account</Button>
            </div>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    h1{
        padding: 1vw;
        font-size: 3vw;
    }
    h2{
        padding-bottom: 1vw;
        font-size: 2vw;
    }
    div{
        width: 30%;
        margin: auto;
        align-items: center;
        display: flex;
    }
`;

const Button = styled(Link)`
    background-color: white;
    color: var(--prime-colour);
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

export default Confirmation;