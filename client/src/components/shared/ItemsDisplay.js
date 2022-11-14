import styled from "styled-components";
import { Link } from "react-router-dom";

const ItemsDisplay = ({ array }) => {
  // method that goes through the array and return the images, names and prices
  return (
    <Wrapper>
      {/* func display each item in the array */}
      {array.map((item) => {
        const itemId = item._id;
        let name = "";
        if (item.name.length < 30) {
          name = item.name;
        } else {
          name = item.name.substring(0, 40) + "...";
        }
        return (
          <Links to={`/products/${itemId}`}>
            <div>
              <img src={item.imageSrc} />

              <p className="name">{name}</p>
              <p className="price">Price: {item.price}</p>
            </div>
          </Links>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-top: 2vw;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1vw;
  font-size: 1.1rem;
  line-height: 1.5rem;

  div {
    height: 100%;
    width: 100%;
    padding: 1vw;
    border: var(--border);
    border-radius: 8px;
  }
  img {
    width: 100%;
  }
  .name {
    margin-top: 0.5vw;
    border-top: var(--border);
    padding-top: 0.5vw;
  }
  .price {
    padding-top: 1vw;
  }
`;

const Links = styled(Link)`
  color: var(--primary-colour);
  text-decoration: none;
`;

export default ItemsDisplay;
