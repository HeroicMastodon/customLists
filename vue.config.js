module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
				@import "/src/assets/scss/main.scss";
				`
			}
		}
	},
	devServer: {
		proxy: {
			'^/api': {
				target: 'http://localhost:5000/'
			}
		}
	}
}