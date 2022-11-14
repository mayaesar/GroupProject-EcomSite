import styled from "styled-components";
import SickIcon from '@mui/icons-material/Sick';
import { Link } from "react-router-dom";

const DisplayError = ({errorMsg}) => {

    return (
        <Wrapper>
            <SickIcon sx={{ fontSize: 100 }} />
            <h2>OOPS!</h2>
            <div>
                <p>Something went wrong, try again!</p>
                <p>Error code: 404</p>
                <Button to="/" >Back to Home Page</Button>
            </div>
            
            
        </Wrapper>
    );

}

const Wrapper = styled.div`
    font-size: 1.3vw;
    width: 90%;
    margin: auto;
    display: grid;
    gap: 2vw;
    h2{
        font-size: 5vw;
    }
`;

const Button = styled(Link)`
    color: var(--primary-colour);
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
    width: 250px;

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
export default DisplayError;