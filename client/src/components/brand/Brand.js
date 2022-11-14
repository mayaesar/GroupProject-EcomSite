import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayError from "../shared/DisplayError";
import Loading from "../shared/Loading";
import Banner from "../shared/Banner";
import ItemsDisplay from "../shared/ItemsDisplay";

const Brands = () => {
  const { brandId } = useParams();

  //set state to render the products
  const [error, setError] = useState(null);
  //set the error state
  const [itemProducts, setItemProducts] = useState(null);
  // sets the brand name
  const [brandName, setBrandName] = useState(null);

  const array = [];
  // sets the array to the brand's item
  const displayProducts = () => {
    setItemProducts(array);
  };

  //fetch all products for Item to render "/api/get-items"
  useEffect(() => {
    const getItems = () => {
      fetch("/api/get-items")
        .then((res) => res.json())
        .then((data) => {
          data.data.map((product) => {
            if (product.companyId == brandId) {
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
    };

    const getBrandName = () => {
      fetch("/api/get-companies")
        .then((res) => res.json())
        .then((data) => {
          data.data.map((company) => {
            if (company._id == brandId) {
              setBrandName(company.name);
            }
          });
        })
        .catch((err) => setError(err));
    };
    getItems();
    getBrandName();
  }, [brandId]);

  if (error) {
    return <DisplayError errorMsg={error}/>;
  }
  return itemProducts ? (
    <Wrapper>
      <Banner>
        This will be the banner for ProductsPage and brandsPage...
      </Banner>

      <Section>
        <h2>- {brandName} -</h2>

        <ItemsDisplay array={itemProducts} />
      </Section>
    </Wrapper>
  ) : (
    <Loader>
      <Loading />
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

export default Brands;
