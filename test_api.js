const apiKey = "AIzaSyDbqNtgd1VZktbCRypz8Ww-0l1YoQZ2bOQ";

(async () => {
    console.log("Listing available models with key:", apiKey.substring(0, 10) + "...");
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log("SUCCESS! Available Models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.error("FAILURE! Status:", response.status);
            console.error(await response.text());
        }
    } catch (error) {
        console.error("EXCEPTION:", error);
    }
})();

testConnection();
