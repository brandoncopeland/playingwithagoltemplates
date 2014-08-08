module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    now: new Date(),
    user: process.env.USER || process.env.USERNAME,
    dir: process.cwd(),
    clean: {
      build: {
        src: ['dist/']
      }
    },
    copy: {
      statics: {
        files: [{
          src: ['index.html', 'js/*', 'img/*'],
          dest: 'dist/'
        }]
      }
    },
    sass: {
      prod: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/style.css': 'scss/style.scss'
        }
      },
      dev: {
        options: {
          sourcemap: true
        },
        files: {
          'dist/css/style.css': 'dist/scss/style.scss'
        }
      }
    },
    writefile: {
      build: {
        dest: 'dist/build.txt',
        content: '<%= user %>\n<%= now %>\n<%= pkg.name %> (<%= pkg.repository.url %>) - <%= gitinfo.local.branch.current.shortSHA %>\n<%= dir %>'
      }
    },
    zip: {
      'dist/<%= pkg.name %>.zip': ['dist']
    }
  });

  grunt.registerMultiTask('writefile', 'Writes to a file', function () {
    grunt.file.write(this.data.dest, this.data.content);
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('dev', ['clean', 'copy:statics', 'sass:dev', 'gitinfo', 'writefile:build']); // Production build
  grunt.registerTask('prod', ['clean', 'copy:statics', 'sass:prod', 'gitinfo', 'writefile:build', 'zip']); // Production build

  grunt.registerTask('default', ['prod']);
};