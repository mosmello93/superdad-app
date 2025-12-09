
const apiKey = "AIzaSyDJ39d_ug9aJC9DRM8ZgSH_pq6m1wrXlxY";

async function testFlash() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "Hello" }] }] }),
            }
        );

        console.log("Status:", response.status);
        if (!response.ok) {
            console.log("Error Body:", await response.text());
        } else {
            const data = await response.json();
            console.log("Success:", data.candidates[0].content.parts[0].text);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testFlash();
