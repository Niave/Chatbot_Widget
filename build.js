const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./chatbot-widget.js'], // Relative path to your JS file
  bundle: true,                  // Bundle everything together
  minify: true,                  // Minify the output for production
  outfile: './dist/chatbot.bundle.js', // Relative path to the output directory
}).catch(() => process.exit(1)); // Exit on error
