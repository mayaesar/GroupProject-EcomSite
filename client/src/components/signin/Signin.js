import styled from "styled-components";

import Login from "./Login";
import Signup from "./Signup";

// this Fun is for the log in / sign up display
const Signin = () => {
  return (
    <Wrapper>
      <div className="loginForm">
        <h2>Log In</h2>
        <Login />
      </div>

      <div className="signupForm">
        <h2>Sign Up</h2>
        <Signup />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 15px;
  line-height: 1rem;
  padding: 40px 0 20px 0;
  width: 90%;
  margin: auto;
  max-width: var(--max-page-width);
  display: flex;
  justify-content: center;

  .loginForm {
    width: 40%;
    height: 100%;
    padding-right: 5vw;
  }

  .signupForm {
    border-left: var(--border);
    width: 40%;
    height: 100%;
    padding-left: 5vw;
  }

  h2 {
    padding-bottom: 5%;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export default Signin;
