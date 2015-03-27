'use strict';

var allLanguages = [
  'cs','da','de','en','eo','es','fa','fi','fr','hu','it','ja','ko','nl','no','pl','pt','ru','sv','th','tlh','tr','zh'
];

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bad_words', 'List of Dirty, Naughty, Obscene, and Otherwise Bad Words', function() {

    var options = this.options();
    var wordList = compileWordList(options.languages);

    this.files.forEach(function (target) {
      var output = '';
      if (options.namespace) {
        output = options.namespace + '.badwords=';
      }
      else {
        output = 'var badwords=';
      }
      output += JSON.stringify(wordList);
      grunt.file.write(target.dest, output);
    })


  });

  var compileWordList = function (languages) {
    languages = languages || allLanguages;
    grunt.log.writeln('Compiling for: %s', languages);

    var allWords = [];

    languages.forEach(function (language) {
      allWords = allWords.concat(grunt.file.read('./' + language).split('\n'));
    });

    return allWords;
  }

};