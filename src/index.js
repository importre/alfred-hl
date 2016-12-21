const fs = require('fs');
const alfy = require('alfy');
const alfredNotifier = require('alfred-notifier');
const utils = require('./utils');

const input = alfy.input.toLowerCase();
const languagesDir = './node_modules/highlight.js/lib/languages';

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
  .readdirSync(languagesDir)
  .filter(lang => lang.endsWith('.js') && lang.includes(input))
  .sort(comp)
  .map(lang => {
    lang = lang.replace('.js', '');
    return {
      title: lang,
      subtitle: 'theme: ' + utils.theme,
      arg: lang,
    };
  })
  .sort();

alfredNotifier();
alfy.output(output);

