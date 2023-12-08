import { IInstance } from './interface';

function createInstance(): IInstance {
  let _LocalInfo = null;
  let _L10NInfo = null;

  return {
    init: (params, cb) => {
      cb && cb(params);
      // es 语法
      const arrowFunction = (name) => {
        console.log('Hello My name is:', name);
      };

      arrowFunction('Lem');

      // es 静态方法
      const arr = [1];

      const result = arr.includes(2);

      console.log(result, 'result');

      // es API
      Promise.resolve('resolve').then((val) => console.log('val', val));
    },

    exportLocalInfo: () => _LocalInfo,

    exportL10nInfo: () => _L10NInfo,
  };
}

const l10nClient = createInstance();

export { l10nClient, createInstance };
