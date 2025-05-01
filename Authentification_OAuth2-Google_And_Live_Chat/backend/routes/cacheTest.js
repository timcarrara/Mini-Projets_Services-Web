const express = require('express');
const router = express.Router();
const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redisClient.connect().catch(console.error);

// Route sans cache
router.get('/test-without-cache', async (req, res) => {
  const start = Date.now();
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulation traitement
  res.json({
    message: "Données non cachées",
    responseTime: `${Date.now() - start}ms`
  });
});

// Route avec cache
router.get('/test-with-cache', async (req, res) => {
  const start = Date.now();
  const cacheKey = 'demo_cache';

  try {
    // 1. Vérifier le cache
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({
        message: "Données du cache Redis",
        responseTime: `${Date.now() - start}ms`,
        data: JSON.parse(cached)
      });
    }

    // 2. Si pas en cache, faire le traitement
    await new Promise(resolve => setTimeout(resolve, 500));
    const fakeData = { value: Math.random(), timestamp: Date.now() };

    // 3. Mettre en cache pour 30 secondes
    await redisClient.setEx(cacheKey, 30, JSON.stringify(fakeData));

    res.json({
      message: "Données fraîches (maintenant en cache)",
      responseTime: `${Date.now() - start}ms`,
      data: fakeData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;