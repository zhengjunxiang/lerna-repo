const yarnModule1 = require('@lem92/yarn-module1');

function yarnModule2() {
  console.log('yarn-module2');
  console.log('test001');
  console.log('test002');
  return 'yarn-module2'
}

yarnModule1();
yarnModule2();

module.exports = yarnModule2;
