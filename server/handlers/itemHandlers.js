const { createClient} = require('./createClient');

// Return an array of all items
const getItems = async (req, res) => {
    // This function to create a client
    const { client, db } = createClient('eCommerce');   
    // Collection used for this function
    const items = db.collection('items')

    try {
        await client.connect();
        const result = await items.find().toArray();
        result.length > 0 ?
        res.status(200).json({status: 200, data: result}) :
        res.status(404).json({status: 404, data: "Data not found."})
    } catch (err) {
        res.status(500).json({status: 500, message: err.message})
    } finally {
        client.close();
        console.log('disconnected')
    }
}

// Return a single item
const getSingleItem = async (req, res) => {
    // This function to create a client
    const { client, db } = createClient('eCommerce');   
    // Collection used for this function
    const items = db.collection('items')
    
    const {item} = req.params;

    try {
        await client.connect();
        const result = await items.findOne({_id: parseInt(item)});
        result?
        res.status(200).json({status: 200, data: result}) :
        res.status(404).json({status: 404, data: "Item not found."})
    } catch (err) {
        res.status(500).json({status: 500, message: err.message})
    } finally {
        client.close();
        console.log('disconnected')
    }
}

module.exports = { getItems, getSingleItem }