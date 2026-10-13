export default async function handler(req, res) {
    if (req.method === 'POST') {
        const orderData = req.body;

        // Transmettre immédiatement à InfinityFree
        try {
            await fetch('https://apgestion.free.nf/recuperer_commandes.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': 'Vercel-Relay-Agent'
                },
                body: JSON.stringify(orderData)
            });
        } catch (err) {
            console.error("Erreur lors de la transmission vers InfinityFree:", err);
        }

        return res.status(200).json({ status: "received" });
    }

    return res.status(200).send("Relay active");
}
