
const apiKey = "AIzaSyDJ39d_ug9aJC9DRM8ZgSH_pq6m1wrXlxY";

async function testGemini() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        console.log("Status:", response.status);
        if (!response.ok) {
            console.log("Error Body:", await response.text());
        } else {
            const data = await response.json();
            const geminiModels = data.models
                .filter(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'))
                .map(m => m.name);
            console.log("Gemini Models:", JSON.stringify(geminiModels.slice(0, 5), null, 2));
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testGemini();
