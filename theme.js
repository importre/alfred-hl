const fs = require('fs');
const alfy = require('alfy');

const input = alfy.input.toLowerCase();
const themeDir = './node_modules/highlight.js/styles/';

function comp(a, b) {
  const i = a.toLowerCase().indexOf(input);
  const j = b.toLowerCase().indexOf(input);
  if (i >= 0 && j >= 0) {
    if (i - j === 0) return a.length - b.length;
    return i - j;
  }
  if (i >= 0) return -1;
  if (j >= 0) return 1;
  return a.localeCompare(b);
}

const output = fs
  .readdirSync(themeDir)
  .filter(theme => theme.endsWith('.css') && theme.includes(input))
  .sort(comp)
  .map(theme => {
    theme = theme.replace('.css', '');
    return {
      title: theme,
      arg: theme,
    };
  });

alfy.output(output);

