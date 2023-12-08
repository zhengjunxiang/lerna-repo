import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {getBabelOutputPlugin} from "@rollup/plugin-babel";
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

/**
 * 通过 process.env.BUILD_TYPE 区分构建属于 web 还是 mach-pro
 * mach-pro -> BUILD_TYPE: mach-pro
 * web -> BUILD_TYPE: web
 */
const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];
const external = ['axios'];
export default {
  treeshake: {
    moduleSideEffects: false,
  },
  input: './src/index.ts',
  output: [
    {
      dir: './lib/esm',
      format: 'esm',
    },
  ],
  external,
  plugins: [
    // 将我们编写的源码与依赖的第三方库进行合并输出
    nodeResolve({
      extensions,
      preferBuiltins: true,
      mainFields: ['browser']
    }),
    // 支持对于 CJS 模块的转译
    commonjs(),
    typescript({
      compilerOptions: {
        outDir: 'lib/esm',
        declarationDir: 'lib/esm/types',
        declaration: true,
        importHelpers: false,
        module: 'ES2015',
        target: 'es5',
      },
    }),
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, '../babel.config.js'),
    }),
    replace({
      values: {
        'process.env.BUILD_TYPE': JSON.stringify('web'),
      },
      preventAssignment: true,
    }),
    isProd && terser({ format: { comments: false } }),
  ],
  onwarn(warning, warn) {
    const skipWarningCode = ['THIS_IS_UNDEFINED'];
    const { code } = warning;
    if (skipWarningCode.includes(code)) return;
    warn(warning);
  },
};
