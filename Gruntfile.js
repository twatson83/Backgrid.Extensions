module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            backgrid: {
                options: {
                    banner: '(function (factory) {\n ' +
                        '    "use strict";\n ' +
                        '    if (typeof define === "function" && define.amd) {\n ' +
                        '        define([\n ' +
                        '            "backgrid",\n ' +
                        '    ], factory);\n ' +
                        '   } else {\n ' +
                        '         factory(\n ' +        
                        '           window.Backgrid\n ' +
                        '         );\n ' +
                        '   }\n ' +
                        '}(function (Backgrid) { \n\n',
                    footer: '\n    return Backgrid;\n' +
                        '}));'
                },
                src: [
                    "src/Backgrid.Extensions.js"                   
                ],
                dest: "lib/Backgrid.Extensions.js"
            }
        },

        uglify: {
            my_target: {
                files: {
                    'lib/Backgrid.Extensions.min.js': ['lib/Backgrid.Extensions.js']
                }
            }
        },

        jsbeautifier: {
            files: ["src/**"],
            options: {}
        },

        watch: {
            files: ["src/**"],
            tasks: ['default']
        }
    });
   
    grunt.registerTask('default', ['jsbeautifier', "concat", "uglify"]);

};
