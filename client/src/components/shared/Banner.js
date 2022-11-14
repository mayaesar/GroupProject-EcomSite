import styled from "styled-components";
import { Link } from "react-router-dom";

import Banner3 from "../../assets/Banner-3.jpg";

const Banner = () => {
  return (
    // banner in the products display pages
    <Wrapper>
      <Link to="/products">
        <Img src={Banner3} alt="banner-img" />
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 90%;
  max-height: 150px;
  margin: auto;
  border-radius: 8px;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 150px;
  border-radius: 8px;
`;

export default Banner;
