"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { getItems, getSingleItem } = require("./handlers/itemHandlers");
const { getCompanies } = require("./handlers/companyHandlers");
const { getOrders, getSingleOrder, addOrder, deleteOrder} = require("./handlers/orderHandlers");
const { getUser, addUser, updateUser, deleteUser} = require("./handlers/userHandlers");

express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // Endpoints
    .get("/api/get-items", getItems)
    .get("/api/get-item/:item", getSingleItem)

    .get("/api/get-companies", getCompanies)

    .get("/api/get-orders/:user", getOrders)
    .get("/api/get-order/:order", getSingleOrder)
    .post("/api/add-order", addOrder)
    .delete("/api/delete-order/:order", deleteOrder)

    .get("/api/get-user/:user", getUser)
    .post("/api/add-user", addUser)
    .patch("/api/update-user", updateUser)
    .delete("/api/delete-user/:user", deleteUser)

    // ---------------------------------
    // Nothing to modify below this line

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));
