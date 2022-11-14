import { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [isError, setIsError] = useState(false);

  // handle the email inside the form
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // we don't have any endpoint to validate password currently
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // use the email that user already entered to get the user id to fetch data
  // This is not a normal operation, but we currently don't have a endpoint to validate email
  // We can only pretend we can log in by entering a exist email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/get-user/${email}`);
      const json = await response.json();

      if (response.ok) {
        window.localStorage.setItem("user-id", json.data._id);
        setUserId(json.data._id);
        navigate("/");
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email:</label>
        <input
          type="email"
          required={true}
          value={email}
          onChange={handleEmail}
        />
        <Error isError={isError}>User not found</Error>

        <label>Password:</label>
        <input
          type="password"
          required={true}
          value={password}
          onChage={handlePassword}
        />
        <Button type="submit">Log In</Button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 8px;
    box-sizing: border-box;
    border: var(--border);
    margin-bottom: 20px;
  }
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
  padding: 8px 20px;
  text-align: center;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  min-width: 10%;
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

const Error = styled.p`
  display: ${(props) => (props.isError ? "block" : "none")};
  color: red;
  margin-bottom: 20px;
`;

export default Login;
