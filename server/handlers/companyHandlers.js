const { createClient} = require('./createClient');

// Return an array of all companies
const getCompanies = async (req, res) => {
    // This function to create a client
    const { client, db } = createClient('eCommerce');   
    // Collection used for this function
    const companies = db.collection('companies');

    try {
        await client.connect();
        const result = await companies.find().toArray();
        result.length > 0 ?
        res.status(200).json({status: 200, data: result}) :
        res.status(404).json({status: 404, data: "Data not found."});
    } catch (err) {
        res.status(500).json({status: 500, message: err.message});
    } finally {
        client.close();
        console.log('disconnected');
    }
}

module.exports = { getCompanies };