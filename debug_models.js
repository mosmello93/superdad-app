import https from 'https';

const apiKey = "AIzaSyD70AO-FEDpU7SYJ30qeJLPX4qUqD0P9QE";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("Checking models via ESM script...");

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log("Status:", res.statusCode);
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("SUCCESS! Available Models:");
                json.models.forEach(m => console.log(`- ${m.name}`));
            } else {
                console.log("Response (No Models):", JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.log("Raw Response (Non-JSON):", data);
        }
    });
}).on('error', (e) => {
    console.error("Connection Error:", e);
});
