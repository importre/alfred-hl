# <div align="center"><img src="./icon.png" width=256><br>alfred-hl</div>

[![dependencies Status](https://david-dm.org/importre/alfred-hl/status.svg)](https://david-dm.org/importre/alfred-hl)

> [Alfred 3](https://www.alfredapp.com) workflow to syntax highlight code in the clipboard using [highlight.js](https://highlightjs.org/)

| plain text | colorized text |
|:----------:|:--------------:|
| ![][plain] | ![][colorized] |

> unicode support :tada:


## Prerequisites

You need [Node.js 4+](https://nodejs.org) and [Alfred 3](https://www.alfredapp.com) with the paid [Powerpack](https://www.alfredapp.com/powerpack/) upgrade.


## Usage

### Copy code snippet to clipboard

- <kbd>cmd</kbd> + <kbd>C</kbd>


### Set Theme (Optional)

> Default theme: `github`

- Type `hl-theme`, <kbd>Space</kbd>, find the theme you want
- Set the theme as default by pressing <kbd>Enter</kbd>

<img width="600" src="https://cloud.githubusercontent.com/assets/1744446/16896907/ca069908-4bdc-11e6-9331-ef5a5e182344.png">


### Highlight code

- Type `hl`, <kbd>Space</kbd>, find the language you want
- <kbd>Enter</kbd>
    - <kbd>Enter</kbd> + <kbd>Cmd</kbd> if you want to prevent indentation
- <kbd>Cmd</kbd> + <kbd>V</kbd> to the rich text editor like [Pages](http://www.apple.com/mac/pages/), [Keynote](http://www.apple.com/kr/mac/keynote/)

<img width="600" src="https://cloud.githubusercontent.com/assets/1744446/16896906/ca05f44e-4bdc-11e6-86a5-830ada1ba4e2.png">


## Install

```
$ npm i -g alfred-hl
```


## Reference

- [importre/alfred-workflows: 🔧my alfred workflows](https://goo.gl/GOFxDC)


## License

MIT © Jaewe Heo

[colorized]: https://cloud.githubusercontent.com/assets/1744446/16908802/3da56100-4d09-11e6-9a4a-ef73a06014bf.png
[plain]: https://cloud.githubusercontent.com/assets/1744446/16908803/3dae39e2-4d09-11e6-8d7e-f7cc25119fa7.png

