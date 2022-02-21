const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpack = require("webpack");

module.exports = {
	entry: {
		main: path.resolve(__dirname, 'src/pages/room-details/room-details.js')
	},
	output: {
		filename: '[name]-[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		alias: {
			'@ui-kit': path.resolve(__dirname, 'src/ui-kit'),
			'@assets': path.resolve(__dirname, 'src/assets')
		}
	},
	devServer: {
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/pages/room-details/room-details.pug'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jquery': 'jquery',
			'window.jQuery': 'jquery',
			'noUiSlider': 'nouislider'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' }),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/**/*.(png|jpg)"),
					to() {
						return path.resolve(__dirname, "dist/assets/[name][ext]");
					},
					noErrorOnMissing: true,
				},
			],
		})

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