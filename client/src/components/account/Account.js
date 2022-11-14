import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/Loading";
import DisplayError from "../shared/DisplayError";

import Avatar from "../../assets/user-avatar.png";

// this Fun is for "sign out" and display the user's orders
const Account = () => {
  const { user, userId, isErr, setIsErr, setUserId } = useContext(UserContext);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  // To get address
  const getAddress = () => {
    let address = null;
    if (user.address) {
      address = Object.values(user.address).join(" ");
    }
    return address ? address : null;
  };

  // To get order details
  const getOrders = async () => {
    try {
      const res = await fetch(`/api/get-orders/${userId}`);
      // const res = await fetch(`/api/get-orders/460d7e55-fab0-48de-9c07-f61b222bfab6`);
      const data = await res.json();
      setOrders(data.data);
      console.log("ORDERS", data.data);
    } catch (err) {
      setIsErr(true);
    }
  };

  // To display orders
  useEffect(() => {
    getOrders();
  }, []);

  // On signout, remove the userId from local storage and redirect to Home
  const signout = () => {
    setUserId(null);
    window.localStorage.removeItem("user-id");
    navigate("/");
  };

  if (isErr) {
    return (
      <Wrapper>
        <DisplayError />
      </Wrapper>
    );
  }

  return user ? (
    <Wrapper>
      <Section>
        <LeftSection>
          <Icon>
            <Img src={Avatar} alt="avatar" />
          </Icon>
          <Button onClick={() => signout()}>Sign out</Button>
        </LeftSection>

        <RightSection>
          <Title>Name: {user.firstName + user.lastName}</Title>
          {user.address && <Title>Address: {getAddress()}</Title>}
          <OrdersSection>
            <Title>My Orders :</Title>
            {orders == "Order not found." ? (
              <>OOPS! looks like you have no orders</>
            ) : (
              orders &&
              orders.map((order) => (
                <Order>
                  <OrderId>Order id: {order._id}</OrderId>

                  <Hr />

                  <List>Delivery address: {getAddress()}</List>
                  <List>Total Price: ${order.totalPrice}</List>
                  <List>Items in this order: </List>
                  {order.items.map((item) => (
                    <List>
                      <span>Qty: {item.qty} - </span>
                      {item.name}
                    </List>
                  ))}
                </Order>
              ))
            )}
          </OrdersSection>
        </RightSection>
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
  line-height: 1.5rem;
  width: 90%;
  margin: auto;
  max-width: var(--max-page-width);
  padding: 100px 0;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: var(--max-content-width);
  margin: auto;
`;

const LeftSection = styled.div`
  width: 10%;
  width: 120px;
  height: 120px;
  margin-right: 50px;
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
  margin-top: 20px;
  margin-right: 20px;
  padding: 13px 23px;
  text-align: center;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  width: 120px;

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

const Icon = styled.div`
  width: 10%;
  width: 120px;
  height: 120px;
  margin: auto;
`;

const Img = styled.img`
  width: 100%;
`;

const RightSection = styled.div`
  width: 90%;
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  box-sizing: border-box;
  border: var(--border);
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-colour);
  font-weight: bolder;
`;

const OrdersSection = styled.div`
  margin-top: 30px;
`;

const OrderId = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const List = styled.p`
  font-size: 1.2rem;
`;

const Hr = styled.hr`
  border-bottom: var(--border) solid black;
`;

const SubmitButton = styled.button`
  background-color: white;
  border: var(--border);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  line-height: 20px;
  margin-top: 10px;
  margin-right: 20px;
  padding: 13px 23px;
  text-align: center;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  width: 100%;

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

const Order = styled.div`
  box-sizing: border-box;
  border: var(--border);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Loader = styled.div`
  width: 90%;
  margin: auto;
  text-align: center;
  padding-top: 15vw;
  padding-bottom: 15vw;
`;

export default Account;
