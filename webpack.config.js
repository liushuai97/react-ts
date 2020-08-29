const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = {
  // 入口 单页应用
  // entry: './src/index.tsx',
  // 入口 多页应用
  entry: {
    'server': ['./src/server/index.tsx'], // 服务端页面
    'web': ['./src/web/index.tsx'], // 用户端页面
  },
  // 服务
  devServer:{
		contentBase:'./dist',
		//host:'localhost',
		//hot: true,
		open: true,
		inline: true,
		progress: true,//显示打包速度
		port: 8080,
		proxy:{//代理
			'api' :{
        //请求api下的接口都会被代理到 target： http://api.xxx.com 中
				target:'https://api.xxx.com',
				changeOrigin: true,
				secure: false,// 接受 运行在 https 上的服务
				pathRewrite:{'^/api':''}
			}
		}
	},
  // 出口
  output: {
    // 打包的文件放到 dist
    path: path.resolve(__dirname, 'dist'),
    // [chunkhash] 改变内容的时候，hash值就会改变，到时候会强制浏览器获取新的文件
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      '@': path.resolve('src/web'),
    },
  },
  // loader
  module: {
    rules: [
      // html 文件的处理
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      // react js tx 文件的处理
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // 样式文件的处理
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      },
      // 图片处理
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            },
          },
        ],
      },
      // 文件的处理
      {
        test:/\.(eot|woff|woff2|ttf|svg|otf)$/,
        use:[
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]',
            },
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  // 插件
  plugins:[
     // 每次构建前清空dist文件夹
     new CleanWebpackPlugin(),
     // 生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
    //  new HtmlWebpackPlugin({
    //    minify: {
    //      filename:'index.html',
    //      titile:'index',
    //      template:'./public/index.html',
    //      chunks:['index'], // html需要引入的js
    //      cache:true, //只有在内容变化时才会生成新的html
    //      removeComments:true, //是否压缩时 去除注释
    //      collapseWhitespace: true,//删除空格、换行
    //    }
    //  }),
    // 每次构建前清空dist文件夹
    new CleanWebpackPlugin(),
    // 生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
    new HtmlWebpackPlugin({
      minify: {
        filename:'web.html',
        titile:'web',
        template:'./public/web.html',
        chunks:['web'], // html需要引入的js
        cache:true, //只有在内容变化时才会生成新的html
        removeComments:true, //是否压缩时 去除注释
        collapseWhitespace: true,//删除空格、换行
      }
    }),
     // 生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
     new HtmlWebpackPlugin({
      minify: {
        filename:'server.html',
        titile:'server',
        template:'./public/server.html',
        chunks:['server'], // html需要引入的js
        cache:true, //只有在内容变化时才会生成新的html
        removeComments:true, //是否压缩时 去除注释
        collapseWhitespace: true,//删除空格、换行
      }
    }),
    // 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    // 用于优化或者压缩CSS资源
    new OptimizeCSSAssetsPlugin({}),
    // 自动打开浏览器
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};

module.exports = config;