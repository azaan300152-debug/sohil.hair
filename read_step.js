const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:/Users/DELL/.gemini/antigravity-ide/brain/2628c710-fa73-44df-94c2-43fec5f683b7/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('"step_index":101') || line.includes('"step_index":110')) {
      const obj = JSON.parse(line);
      console.log('=== STEP ' + obj.step_index + ' ===');
      console.log(obj.content);
    }
  }
}

processLineByLine();
