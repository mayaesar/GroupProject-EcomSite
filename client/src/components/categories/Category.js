import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading";
import DisplayError from "../shared/DisplayError";
import Banner from "../shared/Banner";
import ItemsDisplay from "../shared/ItemsDisplay";

const Category = () => {
  const { categoryId } = useParams();

  //set state to render the products
  //set the error state
  const [error, setError] = useState(null);
  // sets the category name
  const [categoryItems, setCategoryItems] = useState(null);

  const array = [];
  // sets the array to the category's item
  const displayProducts = () => {
    setCategoryItems(array);
  };
  //fetch all products for Category to render
  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        data.data.map((product) => {
          if (product.category.toLowerCase() == categoryId) {
            const item = {
              _id: product._id,
              name: product.name,
              imageSrc: product.imageSrc,
              price: product.price,
            };
            array.push(item);
          }
        });
      })
      .catch((err) => setError(err))
      .finally(() => displayProducts());
  }, [categoryId]);

  if (error) {
    return <Wrapper><DisplayError errorMsg={error}/></Wrapper>;
  }
  return categoryItems ? (
    <Wrapper>
      <Banner />

      <Section>
        <h2>- {categoryId} -</h2>

        <ItemsDisplay array={categoryItems} />
      </Section>
    </Wrapper>
  ) : (
    <Loader>
      <Loading/>
    </Loader>
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
  max-width: var(--max-content-widt);

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

export default Category;
