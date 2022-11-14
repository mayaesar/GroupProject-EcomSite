import styled from "styled-components";
import DisplayError from "../shared/DisplayError";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserActionContext } from "../UserActionContext";

// This Fun is for display the details of one item
// Also for adding item to shipping cat and wishlist
const ProductDetails = () => {
  const { item } = useParams();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  const { addToWishlist, addItem } = useContext(UserActionContext);

  // fetch data to insert details of item
  useEffect(() => {
    fetch(`/api/get-item/${item}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return (<Wrapper>
      <DisplayError errorMsg={error}/>
      </Wrapper>);
  }

  return (
    <Wrapper>
      {product && (
        <Section>
          <ImgSection>
            <Img src={product.imageSrc} alt="Product-image" />
          </ImgSection>

          <DetailSection>
            <div>
              <ProductName>{product.name}</ProductName>

              <Description>
                {product.category} / {product.body_location}
              </Description>

              <Price>Price: {product.price}</Price>
            </div>

            <ButtonSection>
              {product.numInStock === 0 ? (
                <OutOfStock>Out of stock !!</OutOfStock>
              ) : (
                <>
                  <Button
                    onClick={() =>
                      addItem({
                        _id: product._id,
                        qty: 1,
                        price: product.price,
                        name: product.name,
                        imageSrc: product.imageSrc,
                      })
                    }
                  >
                    Add to cart
                  </Button>
                  <Button
                    onClick={() =>
                      addToWishlist({
                        _id: product._id,
                        price: product.price,
                        name: product.name,
                        imageSrc: product.imageSrc,
                      })
                    }
                  >
                    Add to wishlist
                  </Button>
                </>
              )}
            </ButtonSection>
          </DetailSection>
        </Section>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 20px;
  line-height: 1.5rem;
  padding: 100px 0;
  width: 90%;
  margin: auto;
  max-width: var(--max-page-width);
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: var(--max-content-width);
  margin: auto;
`;

const ImgSection = styled.div`
  width: 40%;
  max-width: 250px;
  max-height: 250px;
  margin-right: 50px;
  border-radius: 8px;
  border: var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  /* width: 100%; */
  height: 100%;
  padding: 20px;
`;

const DetailSection = styled.section`
  width: 80%;
  margin: auto;
`;

const ProductName = styled.h2`
  font-size: 1.5rem;
  font-weight: bolder;
`;

const Description = styled.p`
  margin-top: 30px;
  font-size: 1.1rem;
`;

const Price = styled.p`
  margin-top: 30px;
  font-size: 1.3rem;
  color: var(--primary-colour);
  font-weight: bold;
`;

const ButtonSection = styled.section`
  display: flex;
  margin-top: 50px;
`;

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

const OutOfStock = styled.p`
  font-size: bold;
  color: red;
  font-size: larger;
  text-decoration: underline;
`;

export default ProductDetails;
