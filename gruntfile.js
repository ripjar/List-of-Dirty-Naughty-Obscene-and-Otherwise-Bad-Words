module.exports = function(grunt) {

  grunt.initConfig({
    namespace: 'BadWords',
    distDir: 'dist',
    timestamp: grunt.template.today('yyyymmddHHMM'),
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: [ '<%= distDir %>' ]
    },

    bad_words: {
      some: {
        options: {
          languages: ['en', 'it', 'de']
        },
        dest: '<%= distDir %>/badwords.js'
      },
      all: {
        dest: '<%= distDir %>/badwords.js'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('compile', function () {
    var userLanguages = grunt.option('languages')
    var languages;

    if (userLanguages) {
      languages = userLanguages.split(',')
    }
    else {
      languages = allLanguages;
    }
    console.log('Compiling for: %s', languages);
    var allWords = [];
    languages.forEach(function (language) {
      console.log('Adding %s', language);
      allWords = allWords.concat(grunt.file.read('./' + language).split('\n'));
    });
    var str = 'var badwords = ' + JSON.stringify(allWords);
    grunt.file.write('dist/badwords.js', str);
  });

};