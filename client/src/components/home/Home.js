import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemsDisplay from "../shared/ItemsDisplay";
import AddCarousel from "./AddCarousel";
import DisplayError from "../shared/DisplayError";
import Loading from "../shared/Loading";

const Home = () => {
  const [productArr, setProductArr] = useState();
  const [error, setError] = useState();
  const array = [];
  let bestSellers = null;
  let newCollection = null;
  let sales = null;
  let pickedForYou = null;
  let backInStock = null;

  const handleProducts = () => {
    setProductArr(array);
  };

  const getRandom = () => {
    const tempArr = [];
    tempArr.push(productArr[Math.floor(Math.random() * productArr.length)]);
    tempArr.push(productArr[Math.floor(Math.random() * productArr.length)]);
    tempArr.push(productArr[Math.floor(Math.random() * productArr.length)]);
    tempArr.push(productArr[Math.floor(Math.random() * productArr.length)]);
    tempArr.push(productArr[Math.floor(Math.random() * productArr.length)]);
    return tempArr;
  };

  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        data.data.map((product) => {
          const item = {
            _id: product._id,
            name: product.name,
            imageSrc: product.imageSrc,
            price: product.price,
          };
          array.push(item);
        });
      })
      .catch((err) => setError(err))
      .finally(() => handleProducts());
  }, []);

  const getBestSellers = () => {
    bestSellers = getRandom();
    return <ItemsDisplay array={bestSellers} />;
  };
  const getNewCollection = () => {
    newCollection = getRandom();
    return <ItemsDisplay array={newCollection} />;
  };
  const get30Off = () => {
    sales = getRandom();
    return <ItemsDisplay array={sales} />;
  };
  const getPickedForYou = () => {
    pickedForYou = getRandom();
    return <ItemsDisplay array={pickedForYou} />;
  };
  const getBackInStock = () => {
    backInStock = getRandom();
    return <ItemsDisplay array={backInStock} />;
  };

  if (error) {
    return (<Wrapper>
      <DisplayError errorMsg={error}/>
      </Wrapper>);
  }
  return productArr ? (
    <Wrapper>
      <AddCarousel />
      <Section>
        <h2>- Best Sellers -</h2>
        {getBestSellers()}
      </Section>
      <Section>
        <h2>- New Collection -</h2>
        {getNewCollection()}
      </Section>
      <Section>
        <h2>- 30% Off -</h2>
        {get30Off()}
      </Section>
      <Section>
        <h2>- Picked for you -</h2>
        {getPickedForYou()}
      </Section>
      <Section>
        <h2>- Back in Stock -</h2>
        {getBackInStock()}
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
export default Home;
