import styled from "styled-components";

const Action = ({label, onClickFunc, itemId, itemObj, disabled}) => {
    return <Button onClick={() => onClickFunc(itemObj)} disabled={disabled} id={itemId}>{label}</Button>
}

export default Action;

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