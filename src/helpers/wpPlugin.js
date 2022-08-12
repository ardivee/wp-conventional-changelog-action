const core = require('@actions/core')
const fs = require('fs')

module.exports = {
	update: (filePath, version) => {
		const multiLineCommentRegex = /\/([^\n]*$|(?!\\)\*[\s\S]*?\*(?!\\)\/)+/g
		const versionRegex = /Version: (?:(\d+)\.)?(?:(\d+)\.)?(?:(\d+)\.\d+)+/g

		if(fs.existsSync(filePath))
		{
			let content = fs.readFileSync(filePath, 'utf8')

			let matches = content.match(multiLineCommentRegex)

			if(matches.length > 0 )
			{
				let updatedVersion = matches[0].replace(versionRegex, `Version: ${version}`)


				let newContent = content.replace(matches[0], updatedVersion)

				core.info(`Updating plugin file: ${filePath}`)

				fs.writeFileSync(filePath, newContent)
			}
		} else {
			core.info(`Plugin file does not exist: ${filePath}`)
		}
	},
}