
import { callGemini } from './src/utils/gemini.js';

async function testGen() {
    console.log("Testing generation with callGemini...");
    try {
        const result = await callGemini("This is a test prompt. Reply with 'OK'.");
        console.log("Result:", result);
    } catch (e) {
        console.error("Test failed:", e);
    }
}

testGen();
