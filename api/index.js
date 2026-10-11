const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Permettre uniquement les requêtes POST (de Shopify) ou GET (pour tester)
    if (req.method === 'GET') {
        return res.status(200).send('Relais Vercel opérationnel !');
    }

    const INFINITYFREE_URL = 'https://apgestion.free.nf/webhook_receiver.php';

    try {
        const payload = req.body;

        await fetch(INFINITYFREE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Cookie': '__test=1'
            },
            body: typeof payload === 'string' ? payload : JSON.stringify(payload)
        });

        return res.status(200).json({ success: true, message: 'Relayé vers InfinityFree' });
    } catch (error) {
        console.error('Erreur lors du relais:', error);
        return res.status(200).json({ success: false, error: error.message });
    }
};
