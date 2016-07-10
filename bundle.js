var SystemBuilder = require("systemjs-builder");
var argv = require("yargs").argv;
var builder = new SystemBuilder();

builder.loadConfig("./client/systemjs.config.js")
  .then(function(){
	  var outputFile = argv.prod ? "client/bundle.min.js" : "client/bundle.js";
	  return builder.buildStatic("client/app", outputFile, {
		  minify: argv.prod,
		  mangle: argv.prod,
		  rollup: argv.prod
	  });
  })
  .then(function(){
	  console.log("bundle built successfully!");
  });