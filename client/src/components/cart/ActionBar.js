import styled from "styled-components";
import Action from "./Action";
import Qty from "./Qty";
import { useContext } from "react";
import { UserActionContext } from "../UserActionContext";

const ActionBar = ({item}) => {
    const {deleteItem, saveForLater} = useContext(UserActionContext)

    return (
        <Wrapper>
            {item &&
            <>
            <span>QTY: {item.qty}</span> 
            {/* <Qty item={item}/>    // There's an issue with this component, will fix it later*/}
            <Action label="Delete" itemId={item._id} onClickFunc={deleteItem} itemObj={{_id: item._id}}/>
            <Action label="Save for later" itemId={item._id} disabled={true} itemObj={{_id: item._id}}/>  
            </>
        }
        </Wrapper>
    )
}

export default ActionBar;

const Wrapper = styled.div`
    margin-left: 12vw;
    margin-top: -3vw;
    display: flex;
    gap: 1.2vw;
`