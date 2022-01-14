const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require("webpack");

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/ui-kit/form-elements/form-elements.js')
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
			template: './src/ui-kit/form-elements/form-elements.pug'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jquery':'jquery',
<<<<<<< HEAD
			'window.jQuery':'jquery'
=======
			'window.jQuery':'jquery',
			'noUiSlider': 'nouislider'
>>>>>>> 87d2b36cf8e3dc53282d8740bd7e79e8e3297ace
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
				test: /\.(ttf|woff|woff2|eot|svg)$/i,
				type: 'asset/resource'
			}
		]
	}
}