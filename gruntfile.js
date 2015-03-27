module.exports = function(grunt) {

  grunt.initConfig({
    namespace: 'BadWords',
    distDir: 'dist',
    timestamp: grunt.template.today('yyyymmddHHMM'),
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: [ '<%= distDir %>' ]
    },

    uglify: {
      all: {
        options: {
          sourceMap: false,
          banner: [
            '/*',
            ' * List of Bad Words from Shutterstock',
            ' * v<%= pkg.version %>',
            ' * <%= grunt.template.today("dd-mm-yyyy") %>',
            ' */\n'
          ].join('\n')
        },
        files: {
          '<%= distDir %>/public/javascript/<%= pkg.name %>.min.js': [
            '<%= src/badwords.js %>'
            // '<%= scripts.dev %>',
            // '<%= scripts.all %>'
          ]
        }
      }
    },
  });


  grunt.registerTask('compile', function () {
    var languages = grunt.option('languages');
    if (languages) {
      console.log('Compiling for: %s', languages);
      var allWords = [];
      languages.split(',').forEach(function (language) {
        console.log('Adding %s', language);
        allWords = allWords.concat(grunt.file.read('./' + language).split('\n'));

      });
      var str = 'var badwords = ' + JSON.stringify(allWords);

      grunt.file.write('dist/badwords.js', str);

    }
  });

};