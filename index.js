const fs = require('fs');
const alfy = require('alfy');
const utils = require('./utils');

const input = alfy.input.toLowerCase();
const languagesDir = './node_modules/highlight.js/lib/languages';

function comp(a, b) {
  const i = a.indexOf(input);
  const j = b.indexOf(input);
  if (i >= 0 && j >= 0) {
    if (i - j === 0) {
      if (a.length === b.length) return a.localeCompare(b);
      return a.length - b.length;
    }
    return i - j;
  }
  if (i >= 0) return -1;
  if (j >= 0) return 1;
  return a.localeCompare(b);
}

const output = fs
  .readdirSync(languagesDir)
  .filter(lang => lang.endsWith('.js') && lang.indexOf(input) >= 0)
  .sort(comp)
  .map(lang => {
    lang = lang.replace('.js', '');
    return {
      title: lang,
      subtitle: 'theme: ' + utils.theme,
      arg: lang,
    };
  });

alfy.output(output);

