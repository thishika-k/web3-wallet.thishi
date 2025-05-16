const express = require('express');
const dotenv = require('dotenv');
const personaEngine = require('./personaEngine');

dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/persona/:walletAddress', async (req, res) => {
    const { walletAddress } = req.params;
    try {
        const persona = await personaEngine(walletAddress);
        res.json(persona);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
