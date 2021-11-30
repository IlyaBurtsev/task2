const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

module.exports = {
	entry:{
		main: '@ui-kit/form-elements/form-elements.js'
	},
	output: {
		filename: '[name]-[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@ui-kit': path.resolve(__dirname, 'src/ui-kit'),
			'@bemto': path.resolve(__dirname, 'scr/utils/bemto'),
		}
	},
	devServer: {
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/ui-kit/form-elements/form-elements.pug'
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
				//type: 'asset/resource'
				use:'file-loader'
			}
		]
	}
}