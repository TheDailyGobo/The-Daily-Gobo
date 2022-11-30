(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'testsite'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'testsite'.");
    }
    root.testsite = factory(typeof testsite === 'undefined' ? {} : testsite, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  function main() {
    console.log(window.navigator.userAgent);
    var useragent = window.navigator.userAgent;
    var desktop = listOf(['Linux', 'Windows', 'macos']);
    var linux = 'Linux';
    if (contains(useragent, 'Android') || contains(useragent, 'Ios')) {
      window.location.replace('../html/main.html');
    } else {
      window.location.replace('../html/main.html');
    }
  }
  _.main = main;
  main();
  Kotlin.defineModule('testsite', _);
  return _;
}));

//# sourceMappingURL=testsite.js.map
