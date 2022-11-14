// Use this to create client
const { createClient } = require('./createClient');

// Use this to generate unique ids
const { v4: uuidv4 } = require("uuid");

// Return an array of all orders for current user
const getOrders = async (req, res) => {
    // This function to create client
    const { client, db } = createClient('eCommerce');
    // Collection used for this function
    const orders = db.collection('orders');

    const {user} = req.params;
    console.log(user)

    try {
        await client.connect();
        const result = await orders.find({'userId': user}).toArray();
        console.log(result)

        result.length > 0?
        res.status(200).json({status: 200, data: result}) :
        res.status(404).json({status: 404, data: "Order not found."})
    } catch (err) {
        res.status(500).json({status: 500, message: err.message})
    } finally {
        client.close();
        console.log('disconnected')
    }
}

// Return a single order
const getSingleOrder = async (req, res) => {
    // This function to create client
    const { client, db } = createClient('eCommerce');
    // Collection used for this function
    const orders = db.collection('orders');

    const {order} = req.params;

    try {
        await client.connect();
        const result = await orders.findOne({_id: order});
        result?
        res.status(200).json({status: 200, data: result}) :
        res.status(404).json({status: 404, data: "Order not found."})
    } catch (err) {
        res.status(500).json({status: 500, message: err.message})
    } finally {
        client.close();
        console.log('disconnected')
    }
}

// Create a new order
const addOrder = async (req, res) => {
    // This function to create client
    const { client, db } = createClient('eCommerce');
    // Collections used for this function
    const orders = db.collection('orders');
    const users = db.collection('users');
    const items = db.collection('items');

    const {_id, address, totalPrice } = req.body;
    console.log({_id})
    console.log({address})

    try {
        await client.connect();
        const user = await users.findOne({_id});
        console.log({user})

        // Validate userId
        if(!user) {
            return res.status(404).json({status: 404, data: {_id}, message: "User not found."})
        }
        // Validate userAddress
        if(!user.address && !address) {
            return res.status(400).json({status: 400, "userId": _id, message: "Missing user address."})
        }

        const orderedItems = user.cart;
        console.log({orderedItems})

        // Validate cart
        if(orderedItems.length === 0) {
            return res.status(400).json({status: 400, data: {_id}, message: "Empty cart."})
        }

        // Check if items are in stock
        const itemQuery = [];
        orderedItems.map(item => itemQuery.push({'_id':item._id, 'numInStock': {$gte: item.qty}}))
        console.log({itemQuery})
        
        const itemsInStock = await items.find({$or: itemQuery}).toArray();
        console.log({itemsInStock})
        console.log('itemsInStock', itemsInStock.length)
        console.log('orderedItems', orderedItems.length)

        // If none of the items are in stock
        if (itemsInStock.length === 0) {
            return res.status(400).json({status: 400, data: {'userId': _id}, message: "Item(s) out of stock."})
        }

        // If some of the items are out of stock or numStock is lower than the ordered qty, return an array of items with limited/no stock
        if(itemsInStock.length < orderedItems.length) {
            const query = [];
            orderedItems.map(item => query.push({'_id':item._id, 'numInStock': {$lt: item.qty}}))
            console.log({query})
            const lowStockItems = await items.find({$or: query}).toArray();
            console.log(lowStockItems)
            res.status(400).json({status: 400, data: lowStockItems, message: "Not enough stock for some items"})
        }

        // If all of the items are in stock
        if(itemsInStock.length === orderedItems.length) {
            // Create an order
            const newOrder = {'_id': uuidv4(), 'userId': _id, 'items': orderedItems, 'totalPrice': totalPrice}
            const result = await orders.insertOne(newOrder);
            console.log(result)

            // Update the numInStock of each item
            const updateNumInStock = orderedItems.map(item => {
                return {'updateOne':{"filter":{'_id': item._id}, "update":{$inc: {'numInStock': -item.qty}}}}
            })
            const response = await items.bulkWrite(updateNumInStock);
            console.log(response)

            // Update user: empty the cart, add the order and update the address as needed
            const userDataToUpdate = {order: [...user.order, result.insertedId], 
                                      cart: [],
                                      address: address
                                    }
            const userUpdate = await users.updateOne({_id}, {$set: userDataToUpdate})
            console.log(userUpdate) 

            res.status(200).json({status: 200, orderId: result.insertedId, message: "Order created"})
        }

    } catch (err) {
        res.status(500).json({status: 500, message: err.message})
    } finally {
        client.close();
        console.log('disconnected')
    }
}

// Delete Order
const deleteOrder = async (req, res) => {
    // This function to create client
    const { client, db } = createClient('eCommerce');
    // Collections used for this function
    const orders = db.collection('orders');
    const users = db.collection('users');
    const items = db.collection('items');

    const {order} = req.params

    try {
        await client.connect();
        const result = await orders.findOne({_id: order});
        console.log(result)
        if(!result) {
        return res.status(404).json({status: 404, 'orderId': order, message: "Order not found"});
        }

        // Update the numInStock of each item
        const updateNumInStock = result.items.map(item => {
            return {'updateOne':{"filter":{'_id': item._id}, "update":{$inc: {'numInStock': +item.qty}}}}
        })
        const response = await items.bulkWrite(updateNumInStock);
        console.log(response)

        // Delete order from user document
        const updateUser = await users.updateOne({'_id': result.userId}, {$pull: {order: {$in:[order]}}})
        console.log(updateUser)
        
        // Delete the order from orders collection
        await orders.deleteOne({_id: order})
        res.status(200).json({status: 200, message: "Order cancelled"})

        } catch (err) {
            res.status(500).json({status: 500, message: err.message})
        } finally {
            client.close();
            console.log('disconnected');
        }
}

module.exports = { getOrders, getSingleOrder, addOrder, deleteOrder}