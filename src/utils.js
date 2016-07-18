const alfy = require('alfy');

function getRtf(colorList, codeBlock, bg) {
  return `{\\rtf1\\ansi
{\\fonttbl\\f0\\fswiss\\fcharset0 Menlo;}
{\\colortbl;${colorList};}
\\f0\\fs24
${codeBlock}${bg}
}`;
}

module.exports = {
  theme: alfy.config.get('theme') || 'github',
  getRtf: getRtf,
};

