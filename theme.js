const fs = require('fs');
const alfy = require('alfy');

const input = alfy.input.toLowerCase();
const themeDir = './node_modules/highlight.js/styles/';

const output = fs
  .readdirSync(themeDir)
  .filter(theme => theme.endsWith('.css') && theme.indexOf(input) >= 0)
  .sort()
  .map(theme => {
    theme = theme.replace('.css', '');
    return {
      title: theme,
      arg: theme,
    };
  });

alfy.output(output);

