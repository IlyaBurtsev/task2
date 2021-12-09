const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

module.exports = {
	entry:{
		main: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		filename: '[name]-[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@ui-kit': path.resolve(__dirname, 'src/ui-kit'),
		}
	},
	devServer: {
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' })
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
				
			},
			{
				test: /\.(png|jpg|svg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/i,
				type: 'asset/resource'
			}
		]
	}
}