module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ts: {
      build: {
        tsconfig: './tsconfig.json', // Use your tsconfig.json for configuration
        src: ["src/**/*.ts"],
        outDir: "dist/src", // Ensure output directory is 'dist/src'
        options: {
          fast: "never",
          rootDir: "src", // Preserves the folder structure
          sourceMap: true,
          resolveJsonModule: true,
          esModuleInterop: true,
          target: "es2020",
          module: "commonjs"
        }
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      all: {
        src: ["src/**/*.ts", "!node_modules/**/*.ts"]
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.ts", "config/**/*.json", "config/**/*.csv"],
        tasks: ["newer:tslint", "ts"],
        options: {
          spawn: false,
          atBegin: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'dist/src/server.js',
        options: {
          ignore: ['node_modules/**', 'Gruntfile.js', 'package.json', 'tsconfig.json', 'tslint.json'],
          env: {
            PORT: '9096'
          },
          ext: 'js,json',
          watch: ['dist/src/']
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  // Load the plugins.
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  // Register tasks.
  grunt.registerTask('clean-dist', function () {
    grunt.file.delete('dist');
  });
  grunt.registerTask('default', ['clean-dist', 'ts', 'tslint', 'concurrent:dev']);
  grunt.registerTask('build', ['clean-dist', 'ts', 'tslint']);
};
