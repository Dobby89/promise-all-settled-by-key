module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	output: {
		library: 'promiseAllSettledByKey',
		libraryTarget: 'umd'
	}
};