// api/log.js
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'GET') {
        // Redirect to main page with data in hash
        const data = req.query.data;
        if (data) {
            res.redirect(302, `/#${data}`);
        } else {
            res.redirect(302, '/');
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
