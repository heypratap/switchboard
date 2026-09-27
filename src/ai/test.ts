import { generateText } from "ai";
import { model } from "./model.js";

async function main() {
  const result = await generateText({
    model,
    prompt: "Explain what a JavaScript closure is in one sentence.",
  });

  console.log(result.text);
}

main();