import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default ({ side, mode, buildAll }) => ({
  mode: mode,
  entry: `./src/${side}/src/index.ts`,
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /build/, /static/],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, buildAll ? `build/${side}` : 'build'),
    filename: 'index.bundle.js',
  },
});
