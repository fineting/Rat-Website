const { readFileSync } = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    };

    try {
        const dataPath = path.join('/tmp', 'victims.json');
        const fileData = readFileSync(dataPath, 'utf8');
        const victims = JSON.parse(fileData);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(victims)
        };
    } catch (e) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify([])
        };
    }
};
