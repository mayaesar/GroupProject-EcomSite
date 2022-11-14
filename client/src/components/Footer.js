import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserContext } from "./UserContext";

// This Fun is for insert links to the pages of website
const Footer = () => {
  const { userId } = useContext(UserContext);

  return (
    <Wrapper>
      <TopFooter>
        <div className="col1">
          {/* check if the user sign in */}
          {userId ? (
            <>
              <Links to="/cart">Cart</Links>
              <Links to="/wishlist">Wishlist</Links>
            </>
          ) : (
            <>
              <Links to="/signin">Cart</Links>
              <Links to="/signin">Wishlist</Links>
            </>
          )}

          <Links to="/products">All Products</Links>
        </div>

        <div className="col2">
          <Links
            onClick={(event) => {
              event.stopPropagation();
              window.scrollTo(0, 0);
            }}
          >
            About us
          </Links>

          <Links
            onClick={(event) => {
              event.stopPropagation();
              window.scrollTo(0, 0);
            }}
          >
            Contact us
          </Links>

          <Links
            onClick={(event) => {
              event.stopPropagation();
              window.scrollTo(0, 0);
            }}
          >
            Back to the top ⇪
          </Links>
        </div>

        <div className="col3">
          <p>Sign up for Newsletters: </p>
          <form>
            <input type="text" placeholder="Email:" />
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </form>
        </div>
      </TopFooter>

      <BottomFooter>
        <div className="other">
          <p className="copyright">
            <span>&copy;</span> 2022 Copyright.
          </p>

          <p>Privacy |</p>
          <p>Terms |</p>
          <p>Sitemap</p>
        </div>
      </BottomFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: var(--max-page-width);
  padding-top: 3vw;
  width: 90%;
  margin: auto;
  font-size: 1.2vw;
`;

const TopFooter = styled.div`
  border-top: var(--border);
  padding: 3vw;
  height: 10vw;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  background: var(--primary-colour);
  color: white;

  .col3 {
    font-size: 1.4vw;
    padding-left: 16vw;
  }
  button {
    margin-left: 1vw;
  }
  input {
    height: 2vw;
    padding-left: 1vw;
    font-size: 1.4vw;
    border-radius: var(--border-radius);
    margin-top: 1vw;
    border: none;
    color: black;
  }
  input:focus {
    outline: none;
  }
`;

const BottomFooter = styled.div`
  border-top: var(--border);
  height: 4vw;
  display: flex;
  padding-top: 1vw;
  justify-content: center;

  .other {
    display: flex;
  }
  p {
    padding-right: 0.5vw;
  }
`;

const SubmitButton = styled.button`
  height: 1.6vw;
  font-size: 1vw;
  background-color: white;
  border: var(--border);
  border-radius: 1vw;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  text-align: center;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  color: var(--primary-colour);

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

const Links = styled(Link)`
  text-decoration: none;
  color: white;
  display: block;
  margin-top: 0.3vw;
`;

export default Footer;
