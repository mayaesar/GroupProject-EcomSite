// Use this to create client
const { createClient } = require("./createClient");
// Use this to generate unique ids
const { v4: uuidv4 } = require("uuid");

const getUser = async (req, res) => {
  // This function to create client
  const { client, db } = createClient("eCommerce");
  // Collection used for this function
  const users = db.collection("users");

  //our user
  const { user } = req.params;
  try {
    //connect to the database
    await client.connect();
    // target the user

    const result = await users.findOne({$or:[{ _id: user }, { email:user }]});

    result
      ? //the user found
        res.status(200).json({ status: 200, data: result })
      : // user not found
        res.status(404).json({ status: 404, data: "User not found." });
    // the error message
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    //closing the data base
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const addUser = async (req, res) => {
  // This function to create client
  const { client, db } = createClient("eCommerce");
  // Collection used for this function
  const users = db.collection("users");

  // data schema for users
  const { firstName, lastName, email } = req.body;

  // verify info users before adding to the database : information entred have to be string+no empty string+ require '@' for the email
  if (
    Object.values(req.body).some(
      (data) => typeof data !== "string" || data.length === 0
    ) ||
    !email.includes("@")
  ) {
    res
      .status(400)
      .json({ status: 400, data: req.body, message: "Information missing" });
    return;
  }
  //create a user, in this section only the first, last name and email are displyed in the front end
  // the adress:null, order:[], cart:[], wishList:[] added to the profile of the user
  const newUser = {
    ...req.body,
    address: null,
    order: [],
    cart: [],
    wishList: [],
  };
  try {
    //connect to the database
    await client.connect();
    //verify user exist
    const user = await users.findOne({ email: email });
    if (user) {
      res.status(400).json({ status: 400, message: "duplicate user" });
    } else {
      //attribute an id to the user
      newUser["_id"] = uuidv4();
      // add user to DB and send id to the front end
      await users.insertOne(newUser);
      res
        .status(200)
        .json({ status: 200, userId: newUser._id, message: "user added" });
    }
    // the error message
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    //closing the data base
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const updateUser = async (req, res) => {
  // This function to create client
  const { client, db } = createClient("eCommerce");
  // Collection used for this function
  const users = db.collection("users");
  const items = db.collection("items");

  // information that need to be updated
  const {
    firstName,
    lastName,
    city,
    address,
    postalCode,
    country,

    email, 
    cart,
    cartD,
    wishList,
    _id } = req.body;
    

// console.log(req.body)

    

  try {
    //connect to the database
    await client.connect();
    //finding the user
    const user = await users.findOne({ _id });
    // console.log("result 1",result)
    // not found
    if (!user) {
      res
        .status(404)
        .json({ status: 404, data: "ERROR", message: "user not found" });
    }


    //find the item id what matched the one in the cart 
  //  console.log(req.body)
   if(cart) {
    //checking if item is existing in cart 
    const findItemId = await items.findOne({_id:req.body.cart._id}) 
    const foundItem =user.cart.find(e=> e._id === req.body.cart._id)
    console.log(foundItem)
    

    //if we found the item
    if (foundItem) {
      //check the item is in the stock only if in my cart
      if (foundItem.qty <= findItemId.numInStock) {
        //finding the element in the cart that match the item that is being added to the cart

        await users.updateOne({_id, cart:{$elemMatch:{_id:req.body.cart._id}}}, {$inc:{"cart.$.qty": 1}})

        const updatedUser = await users.findOne({ _id });

        res.status(200).json({
          status: 200,
          data: updatedUser.cart,
          message: "cartItem updated",
        });
      } else {
        res.status(404).json({
          status: 404,
          data: findItemId.numInStock,
          message: `there are only ${findItemId.numInStock} left in stock`,
        });
        return;
      }

      
    }else{
      // if its success add it to the cart 
      await users.updateOne({_id },{$push:{"cart":req.body.cart}})
        const updatedUser = await users.findOne({ _id });
        res.status(200).json({ status: 200, data:updatedUser.cart,  message: "cartItem added" });
    }
  }
  //to delete fron the cart 
  if(cartD) {
  await users.updateOne({_id },{$pull:{"cart":req.body.cartD}})
  const updatedUser = await users.findOne({ _id });
  res.status(200).json({ status: 200, data:updatedUser.cart,  message: "cartItem deleted" });

  }

    // the error message
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    //closing the data base
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const deleteUser = async (req, res) => {
  // This function to create client
  const { client, db } = createClient("eCommerce");
  // Collection used for this function
  const users = db.collection("users");

  const { user } = req.params;
  try {
    //connect to the database
    await client.connect();
    //verify user exist
    const result = await users.findOne({ _id: user });
    //if user not found send 400
    if (!result) {
      res.status(400).json({ status: 400, message: "user not found" });
    } else {
      // delete the user fron the DB
      await users.deleteOne({ _id: user });
      res.status(200).json({ status: 200, message: "user deleted" });
    }
    // the error message
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    //closing the data base
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = { getUser, addUser, updateUser, deleteUser };
