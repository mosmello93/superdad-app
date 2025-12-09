
const apiKey = "AIzaSyDbqNtgd1VZktbCRypz8Ww-0l1YoQZ2bOQ";

async function listModels() {
    console.log("Listing models...");
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            { method: 'GET' }
        );

        if (response.ok) {
            const data = await response.json();
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.name.includes('gemini')) console.log("- " + m.name);
            });
        } else {
            console.error("FAILURE! Status:", response.status);
            console.error(await response.text());
        }
    } catch (error) {
        console.error("EXCEPTION:", error);
    }
}

listModels();
