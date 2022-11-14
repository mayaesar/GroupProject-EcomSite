const companies = require('../data/companies.json');
const items = require('../data/items.json');
const { createClient } = require('./createClient');
const { client, db } = createClient('eCommerce')

const batchImport = async (data, collectionName) => {

    try{
        await client.connect();
        await db.collection(collectionName).insertMany(data);
        console.log('Data added')
    } catch (err) {
        console.log(err.message)
    } finally {
        client.close();
        console.log('disconnected')
    }
}

batchImport(companies, 'companies');
batchImport(items, 'items');