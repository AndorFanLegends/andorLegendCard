const emojis = {
    "2P": require('./assets/2P.png'),
    "3P": require('./assets/3P.png'),
    "4P": require('./assets/4P.png'),
    "D1": require('./assets/D1.png'),
    "D2": require('./assets/D2.png'),
    "D3": require('./assets/D3.png'),
    "D4": require('./assets/D4.png'),
    "D5": require('./assets/D5.png'),
    "D6": require('./assets/D6.png'),
    "DN6": require('./assets/DN6.png'),
    "DN8": require('./assets/DN8.png'),
    "DN10": require('./assets/DN10.png'),
    "DN12": require('./assets/DN12.png'),
  };
  
  const options = {
      emojis,
      unicode: false,
  };

const defaultOptions = {
    // emojis: {}, required
    unicode: false
  };
  
  export function markedAndor(options) {
    options = {
      ...defaultOptions,
      ...options
    };
  
    /*if (!options.emojis) {
      throw new Error('Must provide emojis to markedEmoji');
    }*/
  
    const emojiNames = Object.keys(options.emojis).map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const emojiRegex = new RegExp(`:(${emojiNames}):`);
    const tokenizerRule = new RegExp(`^${emojiRegex.source}`);
  
    return {
      extensions: [{
        name: 'emoji',
        level: 'inline',
        start(src) { return src.match(emojiRegex)?.index; },
        tokenizer(src, tokens) {
          const match = tokenizerRule.exec(src);
          if (!match) {
            return;
          }
  
          const name = match[1];
          let emoji = options.emojis[name];
          let unicode = options.unicode;
  
          if (typeof emoji !== 'string') {
            if (typeof emoji.char === 'string') {
              emoji = emoji.char;
              unicode = true;
            } else if (typeof emoji.url === 'string') {
              emoji = emoji.url;
              unicode = false;
            } else {
              // invalid emoji
              return;
            }
          }
  
          return {
            type: 'emoji',
            raw: match[0],
            name,
            emoji,
            unicode
          };
        },
        renderer(token) {
          if (token.unicode) {
            return token.emoji;
          } else {
            return `<img alt="${token.name}" src="${token.emoji}" class="marked-andor-img ${token.name}">`;
          }
        }
      }]
    };
  }
  