
const apiKey = "AIzaSyDJ39d_ug9aJC9DRM8ZgSH_pq6m1wrXlxY";

const candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-2.0-flash-exp",
    "gemini-exp-1206"
];

async function testModel(model) {
    console.log(`Testing ${model}...`);
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] }),
            }
        );

        if (response.ok) {
            console.log(`✅ SUCCESS: ${model}`);
            return true;
        } else {
            console.log(`❌ FAILED: ${model} (${response.status})`);
            if (response.status === 429) console.log("   (Rate Limited)");
            return false;
        }
    } catch (e) {
        console.log(`❌ ERROR: ${model}`, e.message);
        return false;
    }
}

async function run() {
    for (const model of candidates) {
        if (await testModel(model)) break;
    }
}

run();
