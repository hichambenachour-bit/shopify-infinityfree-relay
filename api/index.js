let ordersStore = [];

export default async function handler(req, res) {
  // Config CORS pour autoriser l'accès depuis votre dashboard InfinityFree
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. RECEPTION DU WEBHOOK SHOPIFY (POST)
  if (req.method === 'POST') {
    try {
      const orderData = req.body;
      if (orderData && orderData.id) {
        // Ajouter la commande au début de la liste
        ordersStore.unshift({
          received_at: new Date().toISOString(),
          data: orderData
        });
        // Garder les 50 dernières commandes
        if (ordersStore.length > 50) ordersStore.pop();
      }
      return res.status(200).json({ status: "ok" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 2. LECTURE PAR LE DASHBOARD INFINITYFREE (GET)
  if (req.method === 'GET') {
    return res.status(200).json(ordersStore);
  }

  return res.status(405).send("Method Not Allowed");
}
