import https from 'https';

const apiKey = "AIzaSyD70AO-FEDpU7SYJ30qeJLPX4qUqD0P9QE";

const checkModel = (modelName) => {
    return new Promise((resolve) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`[${modelName}] Status: ${res.statusCode}`);
                if (res.statusCode !== 200) {
                    console.log(`[${modelName}] Error Body:`, data.substring(0, 200));
                }
                resolve();
            });
        });

        req.write(JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] }));
        req.end();
    });
};

(async () => {
    console.log("Checking standard model...");
    await checkModel("gemini-2.0-flash");

    console.log("Checking lite model...");
    await checkModel("gemini-2.0-flash-lite-001");
})();
