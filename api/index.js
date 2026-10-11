// Stockage temporaire en mémoire des dernières commandes sur Vercel
let commandesQueue = [];

module.exports = async (req, res) => {
    // 1. Si Shopify envoie une commande (POST)
    if (req.method === 'POST') {
        try {
            const payload = req.body;
            console.log("DONNEES SHOPIFY REÇUES :", JSON.stringify(payload, null, 2));
            
            // On ajoute la commande à la liste (maximum 50 stockées)
            commandesQueue.push({
                received_at: new Date().toISOString(),
                data: payload
            });
            if (commandesQueue.length > 50) commandesQueue.shift();

            return res.status(200).json({ success: true, message: 'Stocké sur Vercel' });
        } catch (error) {
            return res.status(200).json({ success: false, error: error.message });
        }
    }

    // 2. Si InfinityFree vient récupérer les commandes (GET avec un secret)
    if (req.method === 'GET') {
        const secret = req.query.secret;
        
        // Sécurité basique pour protéger l'accès aux commandes
        if (secret !== 'MonSuperSecret2026') {
            return res.status(403).json({ error: 'Accès non autorisé' });
        }

        // On renvoie la liste des commandes et on vide la file d'attente
        const currentCommandes = [...commandesQueue];
        commandesQueue = []; // Optionnel : décommentez si vous voulez vider après lecture

        return res.status(200).json({ 
            success: true, 
            count: currentCommandes.length,
            commandes: currentCommandes 
        });
    }

    return res.status(405).send('Méthode non autorisée');
};
