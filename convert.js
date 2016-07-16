const alfy = require('alfy');
const fs = require('fs');
const cp = require('child_process');
const hljs = require('highlight.js');
const htmlparser = require("htmlparser");
const entities = require("entities");
const css = require('css');
const one = require('onecolor');
const theme = require('./utils').theme;

const input = alfy.input.toLowerCase();
const cssPath = 'node_modules/highlight.js/styles/' + theme + '.css';
const cssData = fs.readFileSync(cssPath, {
  encoding: 'utf8'
});

const cssMap = {};
const colorMap = {};
var colorIndex = 1;
var bgcolor = null;

css.parse(cssData).stylesheet.rules
  .filter(rule => rule.type === 'rule')
  .map(rule => ({
    selectors: rule.selectors,
    declarations: rule.declarations
      .filter(d => {
        const s = rule.selectors.join('');
        if (d.property === 'background' && s === '.hljs') {
          bgcolor = d.value;
        }
        return d.property === 'color';
      })
      .map(d => ({
        property: d.property,
        value: d.value
      }))
  }))
  .filter(rule => rule.declarations.length > 0)
  .forEach(rule => {
    rule.selectors.forEach(selector => {
      const fontColor = rule.declarations
        .map(d => {
          const v = one(d.value);
          return [
            '\\red', v.red() * 255,
            '\\green', v.green() * 255,
            '\\blue', v.blue() * 255,
          ].join('');
        })[0];

      cssMap[selector] = fontColor;
      colorMap[selector] = colorIndex++;
    })
  });

function getClass(n) {
  if (n.attribs && n.attribs['class']) {
    const c = n.attribs['class'].trim();
    return c;
  }
  return '';
}

function convert(elem) {
  const tokens = [];
  const parent = [];
  var n, i, p, c;
  var q = [elem];

  while (q.length > 0) {
    n = q.shift();

    if (n.children) {
      n.children.forEach(i => i.parent = n);
      q = n.children.concat(q);
      continue;
    }

    if (n.type === 'text') {
      var classes = [];
      p = n;
      while (p) {
        c = getClass(p);
        if (c !== '') classes.push(c);
        p = p.parent;
      }
      tokens.push([entities.decodeHTML(n.data), classes]);
    }
  }

  const result = tokens.map(token => {
    var color = token[1]
      .filter(c => colorMap['.' + c])
      .map(c => '\\cf' + colorMap['.' + c]);
    color = color.length === 0 ? '\\cf1' : color[0];
    const buff = [];
    for (var i = 0; i < token[0].length; i++) {
      buff.push('\\u' + token[0].charCodeAt(i));
    }
    // return color + ' ' + token[0];
    return color + ' ' + buff.join('');
  });

  return result.join('');
}

const rtfHeader = `{\\rtf1\\ansi
{\\fonttbl\\f0\\fmodern\\fcharset0 Courier;}
{\\colortbl;` + Object.keys(cssMap).map(i => cssMap[i]).join(';') + ';' + `}
\\f0\\fs24
`;

function convertToRtf(lang) {
  const code = cp.spawnSync('pbpaste', {
    encoding: 'utf8'
  }).stdout;

  const rawHtml = hljs.highlight(lang, code).value;
  const handler = new htmlparser.DefaultHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rawHtml);

  const bg = bgcolor ? 'best bgcolor: ' + bgcolor + '\\line\\line\n' : '';
  const result = bg + handler.dom.map(elem => convert(elem)).join('\n');

  return rtfHeader + result + '}';
}

cp.spawnSync('pbcopy', {
  encoding: 'utf8',
  input: convertToRtf(input),
});

