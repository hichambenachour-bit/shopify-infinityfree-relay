const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        return res.status(200).send('Relais Vercel opérationnel !');
    }

    const INFINITYFREE_URL = 'https://apgestion.free.nf/webhook_receiver.php';

    try {
        const payload = req.body;

        const response = await fetch(INFINITYFREE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Secret': 'MonSuperSecretShopify2026'
            },
            body: typeof payload === 'string' ? payload : JSON.stringify(payload)
        });

        const textResponse = await response.text();
        return res.status(200).json({ success: true, response: textResponse });
    } catch (error) {
        return res.status(200).json({ success: false, error: error.message });
    }
};
