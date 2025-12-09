
const apiKey = "AIzaSyDbqNtgd1VZktbCRypz8Ww-0l1YoQZ2bOQ";

async function testConnection() {
    console.log("Testing Gemini API with key:", apiKey.substring(0, 10) + "...");
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "Say Hello" }] }] }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log("SUCCESS! API responded:", data.candidates[0].content.parts[0].text);
        } else {
            console.error("FAILURE! Status:", response.status);
            console.error(await response.text());
        }
    } catch (error) {
        console.error("EXCEPTION:", error);
    }
}

testConnection();
