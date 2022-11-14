import styled from "styled-components";
import { NavLink } from "react-router-dom";


// This component is to display a single item
const Item = ({item}) => {

    return (
        
            <Wrapper>       
                <Img src={item.imageSrc} />
                <div>
                    <Container to={`/products/${item._id}`}>
                        <p className="name">{item.name}</p>
                        <p className="price">{item.price}</p>
                    </Container>
                    
                </div>
                
            </Wrapper>
        
    )
};

const Wrapper = styled.div`
    width: 40vw;
    display: flex;
`;

const Img = styled.img`
    padding: 1vw;
    width: 10vw;
    height: 10vw;

`
const Container = styled(NavLink)`
    color: var(--primary-colour);
    padding: 1vw;
`

export default Item;