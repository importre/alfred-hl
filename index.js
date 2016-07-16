const fs = require('fs');
const alfy = require('alfy');
const utils = require('./utils');

const input = alfy.input.toLowerCase();
const languagesDir = './node_modules/highlight.js/lib/languages';

const output = fs
  .readdirSync(languagesDir)
  .filter(lang => lang.endsWith('.js') && lang.indexOf(input) >= 0)
  .sort()
  .map(lang => {
    lang = lang.replace('.js', '');
    return {
      title: lang,
      subtitle: 'theme: ' + utils.theme,
      arg: lang,
    };
  });

alfy.output(output);

