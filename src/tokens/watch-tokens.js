import chokidar from 'chokidar';
import { exec } from 'child_process';
import { resolve } from 'path';

const tokensPath = resolve('src/tokens/figma-tokens.json');
const scriptPath = resolve('src/tokens/convert-tokens.js');

// Initialize the watcher
const watcher = chokidar.watch(tokensPath, {
  persistent: true,
  ignoreInitial: true, // Ignore changes that happened before the watcher was started
});

// Watch for changes in the JSON file
watcher.on('change', (path) => {
  console.log(`File ${path} has been updated. Running conversion...`);

  // Run the conversion script
  exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running conversion script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Conversion script stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
});

console.log(`Watching for changes in ${tokensPath}`);
