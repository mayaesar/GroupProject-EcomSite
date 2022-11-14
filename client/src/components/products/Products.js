import styled from "styled-components";
import { useState, useEffect } from "react";
import DisplayError from "../shared/DisplayError";
import Loading from "../shared/Loading";
import Banner from "../shared/Banner";
import ItemsDisplay from "../shared/ItemsDisplay";

const Products = () => {
  //set state to render the products
  const [itemProducts, setItemProducts] = useState(null);
  //set the error state
  const [error, setError] = useState(null);
  //fetch all products for Item to render "/api/get-items"
  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItemProducts(data.data);
      })
      .catch((err) => setError(err));
  }, []);
  const array = [];

  //catching the erros
  if (error) {
    return (<Wrapper>
      <DisplayError errorMsg={error}/>
      </Wrapper>);
  }

  return (
    <Wrapper>
      {itemProducts ? (
        <>
          <Banner />
          <Section>
            <h2>- All Products -</h2>

            <ItemsDisplay array={itemProducts} />
          </Section>
        </>
      ) : (
        <Loader>
          <Loading/>
        </Loader>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 20px;
  padding-top: 50px;
  width: 90%;
  margin: auto;
  max-width: var(--max-page-width);
`;
const Section = styled.div`
  padding-top: 40px;

  h2 {
    font-weight: bolder;
    text-align: center;
  }
`;
const Loader = styled.div`
  width: 90%;
  margin: auto;
  text-align: center;
  padding-top: 15vw;
  padding-bottom: 15vw;
`;
export default Products;
