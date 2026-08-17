const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = [
  ...walk('app'),
  ...walk('components'),
  ...walk('lib')
];

let replacedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace specific blue color hex and common classes
  content = content.replace(/\[#2563EB\]/g, '[var(--foreground)]');
  content = content.replace(/\[#1d4ed8\]/g, '[var(--text-secondary)]'); // hover state of the blue button
  content = content.replace(/prose-blue/g, 'prose-neutral');
  content = content.replace(/to-purple-500/g, 'to-[var(--text-secondary)]');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    replacedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Replaced in ${replacedCount} files.`);
