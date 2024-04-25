const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Fonction pour lancer l'audit d'accessibilité
async function runAccessibilityAudit(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const results = await new AxePuppeteer(page).analyze();
    await browser.close();

    return results;
}

app.post('/audit', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL manquante' });
    }

    try {
        const results = await runAccessibilityAudit(url);
        res.json(results);
    } catch (error) {
        console.error('Erreur lors de l\'audit:', error);
        res.status(500).json({ error: 'Erreur lors de l\'audit' });
    }
});

app.post('/fetch-element-structure', async (req, res) => {
    const { url, selector } = req.body;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        const elementStructure = await page.evaluate(selector => {
            const element = document.querySelector(selector);
            if (!element) return 'Élément non trouvé';
            
            const openingTag = `<${element.tagName.toLowerCase()}${Array.from(element.attributes).map(attr => ` ${attr.name}="${attr.value}"`).join('')}>`;
            const closingTag = `</${element.tagName.toLowerCase()}>`;
            return `${openingTag}...${closingTag}`;
        }, selector);
        
        await browser.close();
        res.json({ structure: elementStructure });
    } catch (error) {
        console.error('Erreur lors de la récupération de la structure de l\'élément :', error);
        res.status(500).send('Erreur lors de la récupération de la structure de l\'élément');
    }
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:${port}`);
});
