'use strict';

const express = require('express');
const morgan = require('morgan');

const { getItems, getSingleItem } = require("./handlers/itemHandlers");
const { getCompanies } = require("./handlers/companyHandlers");
const { getOrders, getSingleOrder, addOrder, deleteOrder} = require("./handlers/orderHandlers");
const { getUser, addUser, updateUser, deleteUser} = require("./handlers/userHandlers");

const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints
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

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
