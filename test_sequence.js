import https from 'https';

const apiKey = "AIzaSyD70AO-FEDpU7SYJ30qeJLPX4qUqD0P9QE";

const callModel = (prompt) => {
    return new Promise((resolve) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-001:generateContent?key=${apiKey}`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`[${res.statusCode}] Success`);
                    resolve(true);
                } else {
                    console.log(`[${res.statusCode}] Failed: ${data}`);
                    resolve(false);
                }
            });
        });

        req.write(JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }));
        req.end();
    });
};

(async () => {
    console.log("1. Sending first message...");
    await callModel("Hallo, wie geht es dir?");

    console.log("Waiting 2 seconds...");
    await new Promise(r => setTimeout(r, 2000));

    console.log("2. Sending second message...");
    await callModel("Erzähl mir einen Witz.");
})();
