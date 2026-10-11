const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        return res.status(200).send('Relais Vercel opérationnel !');
    }

    try {
        const payload = req.body;
        console.log("DONNEES SHOPIFY REÇUES :", JSON.stringify(payload, null, 2));

        return res.status(200).json({ success: true, message: "Données capturées dans les logs Vercel" });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(200).json({ success: false, error: error.message });
    }
};
