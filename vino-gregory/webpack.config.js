import TerserPlugin from 'terser-webpack-plugin'
import RemarkHtml from 'remark-html'


export default  {

  resolve: {
    extensions: ['.ts', '.js', 'wasm'],
  },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
              })
            ]
      },
      experiments: {
        outputModule: true
      },

      entry:{
        "index":"./src/index.js",
        "consent":"./src/consent.js",
        "debrief":"./src/debrief.js",
        "instructions":"./src/instructions.js",
        "exp2/index":"./src/exp2/index.js",
        "exp2/instructions":"./src/exp2/instructions.js",
        "exp2/consent":"./src/exp2/consent.js",
        "exp2/debrief":"./src/exp2/debrief.js"


      }
      ,
      output: {
        filename: "[name].js",
        path: "/Users/ed/metacognition/vino-gregory/dist/",
    library: {
      type: "module",
    },
        
      },
      module:{
        rules: [
            {
              test: /\.(png|jpe?g|gif|mov|mp3|webp)$/i,
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
            {
              test: /\.md$/,
              use: [
                {
                  loader: "html-loader",
                },
                {
                  loader: "remark-loader",
                  options: {
                    remarkOptions: {
                      plugins: [RemarkHtml],
                    },
                  },
                
                },
              ]
              }
          ],
      }
  };
  