Adapted from Shutterstocks list of Dirty, Naughty, Obscene, and Otherwise Bad Words.

This library provides a grunt task for creating an array of profane words, and a regex to test against, as well as the capability to compile your own obscene word list.

## Installation

    npm install grunt-naughty-words ---save-dev 

    grunt.loadNpmTasks('grunt-naughty-words');
    
## Usage
    
    // creating a list using grunt
    bad_words: {
      options: {
        languages: ['en', 'it', 'de'], // english, italian and german        
        varName: 'profanity'
      },
      all: {
        dest: '<%= srcDir %>/javascript/profanity.js'
      }
    }

    // in your app
    profanityRegex.test(potentiallyProfaneWord);

## Standalone compilation

You may also build a single one-off file, or one with all languages is provided in the `dist` directory.
    
    # compile naughty words for English, Italian and German
    grunt bad_words:all

Output is found in `dist/badwords.js`.

## Languages

| Name             | Code |
| ---------------- | ---- |
| [Chinese](zh)    | zh   |
| [Czech](cs)      | cs   |
| [Danish](da)     | da   |
| [Dutch](nl)      | nl   |
| [English](en)    | en   |
| [Esperanto](eo)  | eo   |
| [Finnish](fi)    | fi   |
| [French](fr)     | fr   |
| [German](de)     | de   |
| [Hungarian](hu)  | hu   |
| [Italian](it)    | it   |
| [Japanese](ja)   | ja   |
| [Klingon](tlh)   | tlh  |
| [Korean](ko)     | ko   |
| [Norwegian](no)  | no   |
| [Persian](fa)    | fa   |
| [Polish](pl)     | pl   |
| [Portuguese](pt) | pt   |
| [Russian](ru)    | ru   |
| [Spanish](es)    | es   |
| [Swedish](sv)    | sv   |
| [Thai](th)       | th   |
| [Turkish](tr)    | tr   |


## References

Wordlist: © 2012–2015 Shutterstock, Inc.

[![Creative Commons License](http://i.creativecommons.org/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/)

This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
