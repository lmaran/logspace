/* global process */
/* aside notes:
    - "livereload" works in conjunction with a node.js middleware (connect-nodemon). Alternatively, you can use a browser plugin
    - in Chrome, changes in "less" files are visible only after you move the mouse over the browser. Works fine in IE and FF.
        * seems to be a browser problem: https://github.com/livereload/livereload-extensions/issues/26#issuecomment-96439256
        * keeping Elements tab in Developer Tools opened seems to be a workaround: https://github.com/livereload/livereload-extensions/issues/26#issuecomment-104997269
    - an error occurs when you delete a folder under watched (a gulp restart is require) - https://github.com/gulpjs/gulp/issues/945
    - sometimes, renaming a file requires a full page reload. That is because renaming a file invokes two events: "deleted" and "renamed" - https://github.com/gulpjs/gulp/issues/917
*/
var gulp = require("gulp"), // task runner
    //bowerFiles = require("main-bower-files"), // get all bower files (js and css) based on bower.json
    inject = require("gulp-inject"), // inject a string into placeholders in html files
    livereload = require("gulp-livereload"), // automatically refresh the browser; requires a browser plugin OR a node.js middleware
    nodemon = require("gulp-nodemon"), // monitor for changes in node.js files and restart your app
    //less = require("gulp-less"), // compile less to css
    //jshint = require("gulp-jshint"), // a js code quality tool
    //stylish = require("jshint-stylish"), // another reporter for jshint
    runSequence = require("run-sequence"), // a cool way of choosing what must run sequentially, and what in parallel
    //del = require("del"), // delete files/folders
    concat = require("gulp-concat"), // concatenate files

    uglify = require("gulp-uglify"), // js minification
    //minifyCSS = require("gulp-minify-css"), // css minification
    //rev = require("gulp-rev"), // add a unique id at the end of app.js (ex: app-f4446a9c.js) to prevent browser caching
    //filter = require("gulp-filter"), // filter files in a stream

    gutil = require("gulp-util"), // colorful logs and ather stuff
    path = require("path"); // handling file path

    //var mocha = require("gulp-mocha");
    var through = require("through2");
    //var ghPages = require("gulp-gh-pages");
    //var gnf = require("gulp-npm-files"); // copy only node_modules used in production (not "dev_dependencies")
    //var file = require("gulp-file"); // create a file from string
    var ts = require("gulp-typescript");
    var tslint = require("gulp-tslint");

    var Builder = require("systemjs-builder");
    var sourcemaps = require("gulp-sourcemaps");

    var mocha = require("gulp-mocha");
    var istanbul = require("gulp-istanbul");
    var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

/*  usage:

    "gulp" - an alias for "gulp dev:watch"
    "gulp dev:watch" - build and livereload for dev
    "gulp dev" - build for dev
    "gulp prod" - build for prod
*/

gulp.task("default",["dev:watch"]);

gulp.task("dev:watch", function(cb) {
    runSequence(
        "dev",
        //"watch-server",
        ["watch:client", "watch:server"],
    cb);
});

gulp.task("dev", function(cb) {
    runSequence(
        // "clean-css",
        // ["less", "less-srv"],

        ["tslint:client", "tslint:server"],
        ["tsc:client", "tsc:server"],
        // "jshint",
        // "build-dev-html",
    cb);
});

gulp.task("watch:server", function() {
    livereload.listen({port:35729}); // listen for changes

    gulp.watch("server/**/*.ts").on("change", function(file) { // no "./" in front of glob
        var fileName = path.basename(file.path); // ex: test.css

        gutil.log(gutil.colors.cyan("watch:all"), "saw",  gutil.colors.magenta(fileName), "was " + file.type);

        if(file.type === "changed"){
            doTslint(file.path, "server");
            doTsc([file.path, "typings/**/**.d.ts", "custom_typings/**/**.d.ts"], path.parse(file.path).dir, "server");
        };
    });

	nodemon({ // nodemon config - http://jpsierens.com/tutorial-livereload-nodemon-gulp/
    		script: "./server/app.js", // the script to run the app
            //verbose: true,
            //tasks: ["backendSrc", "serverAssets"], // run this tasks prior to restarting the application
    		ext: "js hbs html",
            ignore: ["node_modules/", "client", "gulpfile.js"]
        })
	   .on("restart", function(){
            gulp.src("./server/app.js", {read:false})
                .pipe(livereload({port:35729}));
        });
});

gulp.task("watch:client", function() { // using the native "gulp.watch" plugin

    gulp.watch("client/app/**/*.ts").on("change", function(file) { // no "./" in front of glob
        var fileName = path.basename(file.path); // ex: test.css

        gutil.log(gutil.colors.cyan("watch:all"), "saw",  gutil.colors.magenta(fileName), "was " + file.type);

        if(file.type === "changed"){
            doTslint(file.path, "client");
            doTsc([file.path, "typings/**/**.d.ts", "custom_typings/**/**.d.ts"], path.parse(file.path).dir, "client");
        };
    });

});




// 1. development task definitions ============================================================

gulp.task("tslint:client", function() {
    return doTslint("client/app/**/*.ts", "client");
});

gulp.task("tslint:server", function() {
    return doTslint("server/**/*.ts", "server");
});

gulp.task("tsc:client", function () {
    return doTsc(["client/app**/*.ts", "typings/**/**.d.ts", "custom_typings/**/**.d.ts"], "client", "client");
});

gulp.task("tsc:server", function () {
    return doTsc(["server/**/*.ts", "typings/**/**.d.ts", "custom_typings/**/**.d.ts"], "server", "server");
});

// gulp.task("tsc-server-test", function () {
//     return doTsc(["server/**/*.test.ts", "typings/**/**.d.ts", "custom_typings/**/**.d.ts"], "server", "server");
// });


// http://stackoverflow.com/questions/38339067/typescript-code-coverage-with-mocha
gulp.task("pre:test", ["tsc:server"], function() {
    // return gulp.src(["server/**/*.js", "!server/**/*.test.js", "!server/**/app.js", "!server/**/server.js", "!server/**/routes.js"])
    return gulp.src(["server/**/*.js", "!server/**/*.test.js"])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});



gulp.task("test:server:js", ["pre:test"], function() {
    return gulp.src('server/**/*.test.js')
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports(
            {
                dir: './coverage/js',
                // don't need all kind o reports: [ 'lcov', 'json', 'text', 'text-summary' ],
                reporters: ["json"] // it produce 'coverage-final.json'
            }
        ))
        .once('error', () => {
            process.exit(1);
        })
        .once('exit', () => {
            process.exit();
        })
        .on('error', gutil.log)
        ;
});

gulp.task('test:server', ["test:server:js"], function () {
    // 'remap-istanbul' use the output from 'istanbul' to create a ts-related code coverage
    return gulp.src('coverage/js/coverage-final.json')
        .pipe(remapIstanbul(
            {
                basePath: './server',
                reports: {
                    'html': 'coverage/ts/html', // html version of code coverage
                    'json': 'coverage/ts/coverage.json', // not so usefull for now
                    'text': null, // console version (with details / file)
                    'text-summary': null // console version (final summary)
                }
            }
        ));
});


// Copy dependencies
// https://github.com/smmorneau/tour-of-heroes/blob/master/gulpfile.js
gulp.task("copy:libs", function() {
  gulp.src(["node_modules/rxjs/**/*"])
    .pipe(gulp.dest("client/assets/vendor/rxjs"));

  gulp.src(["node_modules/angular2-in-memory-web-api/**/*"])
    .pipe(gulp.dest("client/assets/vendor/angular2-in-memory-web-api"));

  // concatenate non-angular2 libs, shims & systemjs-config
  gulp.src([
    "node_modules/core-js/client/shim.min.js",
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    "node_modules/systemjs/dist/system.src.js"
    //"system.config.js",
  ])
    .pipe(concat("vendors.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("client/assets/vendor"));

  // copy source maps
//   gulp.src([
//     "node_modules/es6-shim/es6-shim.map",
//     "node_modules/reflect-metadata/Reflect.js.map",
//     "node_modules/systemjs/dist/system-polyfills.js.map"
//   ]).pipe(gulp.dest("public/lib/js"));

//   gulp.src([
//     "node_modules/bootstrap/dist/css/bootstrap.*"
//   ]).pipe(gulp.dest("public/lib/css"));

  return gulp.src(["node_modules/@angular/**/*"])
    .pipe(gulp.dest("client/assets/vendor/@angular"));
});

gulp.task("bundle", function() {
    // optional constructor options
    // sets the baseURL and loads the configuration file
    var builder = new Builder("", "client/systemjs.config.js");

    /*
       the parameters of the below buildStatic() method are:
           - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case "dist/app/boot.js"
           - the output (file into which it would output the bundled code)
           - options {}
    */
    return builder
        .buildStatic("client/app/main.js", "client/app/bundle.js", { minify: true, sourceMaps: true})
        .then(function() {
            console.log("Build complete");
        })
        .catch(function(err) {
            console.log("Build error");
            console.log(err);
        });
});

function doTslint(src, clientOrServer){
    var err = false;
    return gulp.src([src])
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report())
        .on("error", function(error){
            err = true;
            gutil.log(gutil.colors.red("TSLINT-" + clientOrServer + " failed!"));
            this.emit("end"); // end the current task
        })
        .on("end", function(){
            if(!err)
                gutil.log(gutil.colors.green("TSLINT-" + clientOrServer + " passed!"));
        });
}

function doTsc(src, dest, clientOrServer){
    var err = false;
    // tsProject should be here because a project cannot be used in 2 compilations at the same time
    // https://github.com/ivogabe/gulp-typescript/issues/322
    var tsProject = ts.createProject("tsconfig.json");
    return gulp.src(src)
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts(tsProject))
        .js
        .pipe(sourcemaps.write(".", {includeContent: false})) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(dest))
        .on("error", function(error){
            err = true;
            gutil.log(gutil.colors.red("TSC:" + clientOrServer + " failed!"));
            this.emit("end"); // end the current task
        })
        .on("end", function(){
            if(!err)
                gutil.log(gutil.colors.green("TSC:" + clientOrServer + " passed!"));
        });
}