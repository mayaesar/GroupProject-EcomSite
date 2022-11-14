import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  //setting the form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // handle each element inside the form
  const handleFirsName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // sending information to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("user-id", data.userId);

        setUserId(data.userId);
        navigate("/");
      })
      .catch((err) => setError(err));
  };
  if (error) {
    return <Wrapper>Error!!</Wrapper>;
  }
  return (
    <>
      <Wrapper>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>First Name:</label>
          <input
            onChange={handleFirsName}
            value={firstName}
            className="firstName"
            type="text"
            required={true}
          />
          <label>Last Name:</label>
          <input
            onChange={handleLastName}
            value={lastName}
            className="lastName"
            type="text"
            required={true}
          />
          <label>Email:</label>
          <input
            onChange={handleEmail}
            value={email}
            type="email"
            required={true}
          />
          <label>Password:</label>
          <input type="password"></input>
          <Button type="submit">Sign Up</Button>
        </form>
      </Wrapper>
      {/* <Signin isSubmit={isSubmit}/> */}
    </>
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
export default Signup;
