import styled from "styled-components";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import { Carousel } from "antd";

import Banner1 from "../../assets/Banner-1.jpg";
import Banner2 from "../../assets/Banner-2.jpg";
import Banner4 from "../../assets/Banner-4.jpg";

const AddCarousel = () => {
  return (
    // Carousel in the homepage
    <Wrapper>
      <Carousel autoplay>
        <Link to="/products">
          <ContentStyle>
            <Img src={Banner1} alt="banner-img" />
          </ContentStyle>
        </Link>

        <Link to="/products">
          <ContentStyle>
            <Img src={Banner4} alt="banner-img" />
          </ContentStyle>
        </Link>

        <Link to="/products">
          <ContentStyle>
            <Img src={Banner2} alt="banner-img" />
          </ContentStyle>
        </Link>
      </Carousel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  max-height: 500px;
  margin: auto;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 500px;
`;

const ContentStyle = styled.h3`
  color: white;
  background: none;
  width: 100%;
  max-height: 500px;
`;

export default AddCarousel;
