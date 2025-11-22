import fetch from "node-fetch";

const API_KEY = process.env.API_KEY;

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  console.log("Available Models:\n");
  json.models.forEach(m => {
    console.log(`- ${m.name}`);
  });
}

main().catch(console.error);
