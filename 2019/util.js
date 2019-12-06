import { createReadStream, readFile } from 'fs';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import path from 'path';

// returns an array of strings read from a given file
export async function readFileLines(relFilePath) {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(__dirname, relFilePath);
    const readstream = createReadStream(filePath);

    const rl = createInterface({
      input: readstream,
      crlfDelay: Infinity
    });

    let lines = [];
    rl.on('line', input => {
      lines.push(input);
    });
    rl.on('close', () => resolve(lines));
  });
}

export async function readFileCSV(relFilePath) {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(__dirname, relFilePath);

    readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.split(','));
    });
  });
}
