import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { UserContext } from "./UserContext";
import DisplayError from "./shared/DisplayError";

const Header = () => {
  const { userId } = useContext(UserContext);
  const [companyArray, setCompanyArray] = useState([]);
  const [brandArray, setBrandArray] = useState([]);
  const [error, setError] = useState(null);

  const brands = [];
  const companies = [];

  //randomly give 5 companies to be displayed for the brands dropdown
  const getRandomNames = () => {
    const random = [];

    random.push(companies[Math.floor(Math.random() * companies.length)]);
    random.push(companies[Math.floor(Math.random() * companies.length)]);
    random.push(companies[Math.floor(Math.random() * companies.length)]);
    random.push(companies[Math.floor(Math.random() * companies.length)]);
    random.push(companies[Math.floor(Math.random() * companies.length)]);

    random.forEach((element) => {
      const item = (
        <NavLinks key={element.id} to={`/brands/${element.id}`}>
          {element.name}
        </NavLinks>
      );
      setCompanyArray((arr) => [...arr, item]);
    });
  };

  // gives names to be displayed for the categories
  const categoryDisplay = () => {
    brands.forEach((element) => {
      const newElement = element.toLowerCase();
      const item = (
        <NavLinks to={`/categories/${newElement}`}>{element}</NavLinks>
      );
      setBrandArray((arr) => [...arr, item]);
    });
  };

  //this will get all of the names and id of the companies, then store it in the companies array
  useEffect(() => {
    const brand = () => {
      fetch("/api/get-companies")
        .then((res) => res.json())
        .then((data) => {
          data.data.map((company) => {
            const info = {
              name: company.name,
              id: company._id,
            };
            companies.push(info);
          });
        })
        .catch((err) => setError(err))
        .finally(() => getRandomNames());
    };

    // then do the same for the products but creates an array with categories
    const item = () => {
      fetch("/api/get-items")
        .then((res) => res.json())
        .then((data) => {
          data.data.map((product) => {
            if (!brands.includes(product.category)) {
              brands.push(product.category);
            }
          });
        })
        .catch((err) => setError(err))
        .finally(() => categoryDisplay());
    };
    brand();
    item();
  }, []);

  

  if (error) {
    return (<Wrapper>
      <DisplayError/>
      </Wrapper>);
  }

  return (
    <Wrapper>
      <Top>
        <LogoLink to="/">E-Commerce Project</LogoLink>
        <SearchBar/>
        {userId ? (
          <div className="topLinkDiv">
            <TopLinks className="signin" to={`/account/${userId}`}>
              Account
            </TopLinks>
            <TopLinks to="/cart">🛒 Your Cart</TopLinks>
            <TopLinks to="/wishlist">♥︎ Wishlist</TopLinks>
          </div>
        ) : (
          <div className="topLinkDiv">
            <TopLinks className="signin" to="/signin">
              Sign in
            </TopLinks>
            <TopLinks to="/signin">🛒 Your Cart</TopLinks>
            <TopLinks to="/signin">♥︎ Wishlist</TopLinks>
          </div>
        )}
      </Top>

      <Nav>
        <NavLinks to="/">Home</NavLinks>
        <NavLinks to="/products">Products</NavLinks>

        <Dropdown>
          <button className="toggle">Brands</button>
          <div className="dropdownMenu">
            <div className="links">
              {/* this will display 5 random brands */}
              {companyArray.map((company) => {
                return company;
              })}
            </div>
          </div>
        </Dropdown>

        <Dropdown>
          <button className="toggle">Categories</button>

          <div className="dropdownMenu">
            <div className="links">
              {/* this will display all brands */}
              {brandArray.map((brand) => {
                return brand;
              })}
            </div>
          </div>
        </Dropdown>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 1.3vw;
`;

const Top = styled.div`
  padding: 3vw;
  width: 90%;
  margin: auto;
  height: 8vw;
  align-items: baseline;
  display: grid;
  grid-template-columns: 0.5fr 0.8fr 0.8fr;
  gap: 2vw;
  font-size: 1.4vw;
  max-width: var(--max-page-width);

  .topLinkDiv {
    margin-left: 1vw;
    padding-left: 1vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1vw;
  }

  .signin {
    border-right: var(--border);
    padding-left: 15px;
  }
`;

const LogoLink = styled(Link)`
  font-size: 1.5vw;
  color: var(--primary-colour);
`;

const TopLinks = styled(Link)`
  color: var(--primary-colour);
  text-decoration: none;
`;

const Nav = styled.div`
  padding: 2vw;
  width: 90%;
  height: 3vw;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-top: var(--border);
  max-width: var(--max-page-width);
  background-color: var(--primary-colour);
`;

const NavLinks = styled(Link)`
  color: var(--primary-colour);
  text-decoration: none;
  color: white;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  color: black;

  .toggle {
    color: white;
    border: none;
    background-color: var(--primary-colour);
    font-size: 1.3vw;
    font-family: var(--primary-family);
  }

  .dropdownMenu {
    display: none;
    position: absolute;
    z-index: 1;
    width: 20vw;
    border: var(--border);
    border-top: none;
    padding: 1.2vw;
    margin-left: -5vw;
    background: var(--primary-colour);
  }

  .links {
    display: grid;
  }

  &&:hover .dropdownMenu {
    display: block;
  }
`;

export default Header;
