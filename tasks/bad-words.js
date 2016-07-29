'use strict';

var allLanguages = [
  'cs','da','de','en','eo','es','fa','fi','fr','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','tr','zh'
];

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bad_words', 'List of Dirty, Naughty, Obscene, and Otherwise Bad Words', function() {

    var options = this.options();
    var compiledLists = compileWordList(options.languages);

    console.log(this.files);
    this.files.forEach(function (target) {
      var profaneOutput = '';
      var whiteOutput = '';
      console.log(target);
      if (options.namespace) {
        profaneOutput = options.namespace + '.badwords=';
        whiteOutput = options.namespace + '.goodwords=';
      }
      else {
        profaneOutput = 'var badwords=';
        whiteOutput = 'var goodwords=';
      }
      profaneOutput += JSON.stringify(compiledLists.profanelist);
      whiteOutput += JSON.stringify(compiledLists.whitelist);
      console.log(profaneOutput);
      console.log(whiteOutput);

      if (options.namespace) {     
        grunt.file.write(target.dest,
                         profaneOutput + ";\n"
                         + options.namespace
                         + ".profanityRegex = new RegExp(("
                         + options.namespace
                         + ".badwords || []).join('|'), 'im');\n"
                         + whiteOutput + ";\n");
      } else {
        grunt.file.write(target.dest,
                         profaneOutput + ";\n"
                         + "var profanityRegex = new RegExp((badwords || []).join('|'), 'im');\n"
                         + whiteOutput + ";\n");
      }
    });
  });

  var compileWordList = function (languages) {
    languages = languages || allLanguages;
    grunt.log.writeln('Compiling for: %s', languages);

    var allProfanelist = [];
    var allWhitelist = [];
    var dirPrefix = '';
    var relativeDir = './node_modules/grunt-naughty-words/';
    if (grunt.file.isDir(relativeDir)) {
      dirPrefix = relativeDir;
    }
    languages.forEach(function (language) {
      //allWords = allWords.concat(grunt.file.read(dirPrefix + language).split('\n'));
      console.log('Adding %s', language);
      var profaneWords = grunt.file.read(dirPrefix + language).split('\n');

      // remove blank words
      var index = profaneWords.indexOf("");
      while (index !== -1) {
        profaneWords.splice(index, 1);
        index = profaneWords.indexOf("");
      }

      var whitelist = [];

      // If the ...
      if (grunt.file.exists(dirPrefix + 'dicts/' + language)) {
        var dictWords = grunt.file.read(dirPrefix + 'dicts/' + language).split('\n');

        for (var i = 0; i < profaneWords.length; i++) {
          var profaneWord = profaneWords[i];
          if (!profaneWord.length) continue;

          for (var j = 0; j < dictWords.length; j++) {
            var dictWord = dictWords[j];

            if (!dictWord.length) continue;
            if (dictWord.substring(0, 1) === '#') continue;

            // If the word matches exactly or doesn't match at all
            // we don't want to whitelist it
            if (dictWord.indexOf(profaneWord) === -1) continue;
            if (dictWord === profaneWord) continue;
            // If the word is already in the whitelist we don't care
            if (whitelist.indexOf(profaneWord) !== -1) continue;

            whitelist.push(dictWord);
          }
        }
      }

      allProfanelist = allProfanelist.concat(profaneWords);
      allWhitelist = allWhitelist.concat(whitelist);
    });

    return {profanelist: allProfanelist, whitelist: allWhitelist};
  }

};
