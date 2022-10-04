'use strict';

var linkifyjs = require('linkifyjs');

var MentionToken = linkifyjs.createTokenClass('mention', {
  isLink: true,
  toHref: function toHref() {
    return '/' + this.toString().slice(1);
  }
});
/**
 * Mention parser plugin for linkify
 * @type {import('linkifyjs').Plugin}
 */

function mention(_ref) {
  var scanner = _ref.scanner,
      parser = _ref.parser;
  var _scanner$tokens = scanner.tokens,
      HYPHEN = _scanner$tokens.HYPHEN,
      SLASH = _scanner$tokens.SLASH,
      UNDERSCORE = _scanner$tokens.UNDERSCORE,
      AT = _scanner$tokens.AT;
  var domain = scanner.tokens.groups.domain; // @

  var At = parser.start.tt(AT); // @
  // Begin with hyphen (not mention unless contains other characters)

  var AtHyphen = At.tt(HYPHEN);
  AtHyphen.tt(HYPHEN, AtHyphen); // Valid mention (not made up entirely of symbols)

  var Mention = At.tt(UNDERSCORE, MentionToken);
  At.ta(domain, Mention);
  AtHyphen.tt(UNDERSCORE, Mention);
  AtHyphen.ta(domain, Mention); // More valid mentions

  Mention.ta(domain, Mention);
  Mention.tt(HYPHEN, Mention);
  Mention.tt(UNDERSCORE, Mention); // Mention with a divider

  var MentionDivider = Mention.tt(SLASH); // Once we get a word token, mentions can start up again

  MentionDivider.ta(domain, Mention);
  MentionDivider.tt(UNDERSCORE, Mention);
  MentionDivider.tt(HYPHEN, Mention);
}

linkifyjs.registerPlugin('mention', mention);
