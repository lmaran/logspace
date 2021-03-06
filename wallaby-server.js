// https://github.com/JuHwon/ironcrux
module.exports = function (w) {
  return {
    files: [
      'server/**/*.ts',
      '!server/**/*.test.ts'
      // '!server/app.ts',
      // '!server/server.ts',
      // '!server/routes.ts'

      // { pattern: 'server/app.ts', instrument: false, load: false, ignore: true }
    ],

    tests: [
      'server/**/*.test.ts'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node'
    }

    // // you may remove the setting if you have a tsconfig.json file where the same is set
    // compilers: {
    //   '**/*.ts': w.compilers.typeScript({module: 'commonjs'})
    // }

  };
};