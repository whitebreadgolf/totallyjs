module.exports = function(grunt) {

grunt.initConfig({
    requirejs: {
        compile: {
            options: {
                baseUrl: "src",
                include: ["jjs"], 
                dir: "build",
                modules: [
                    { name: "jjs" }
                ]
            }
        }
    },
    shell: {
        makeDir: {
            command: 'node example/server.js'
            //./mongod --dbpath /Users/karlcd/Desktop/justjs/example/db
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('default', [ ]);
grunt.registerTask('build', ['requirejs']);
grunt.registerTask('serve', ['shell']);

};