// api/log.js
export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Redirect to main page with hash
    const password = "Rat123";
    const baseUrl = 'https://logger-67.vercel.app';
    
    res.redirect(302, `${baseUrl}/#${password}`);
}
