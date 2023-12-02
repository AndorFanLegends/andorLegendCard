const emojis = {
    "2P": require('./asserts/2P.png'),
    "3P": require('./asserts/3P.png'),
    "4P": require('./asserts/4P.png'),
    "D1": require('./asserts/D1.png'),
    "D2": require('./asserts/D2.png'),
    "D3": require('./asserts/D3.png'),
    "D4": require('./asserts/D4.png'),
    "D5": require('./asserts/D5.png'),
    "D6": require('./asserts/D6.png'),
    "DN6": require('./asserts/DN6.png'),
    "DN8": require('./asserts/DN8.png'),
    "DN10": require('./asserts/DN10.png'),
    "DN12": require('./asserts/DN12.png'),
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
  
    if (!options.emojis) {
      throw new Error('Must provide emojis to markedEmoji');
    }
  
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
            return `<img alt="${token.name}" src="${token.emoji}" class="marked-emoji-img ${token.name}">`;
          }
        }
      }]
    };
  }
  