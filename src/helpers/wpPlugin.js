const core = require('@actions/core')
const fs = require('fs')

module.exports = {
	update: (filePath, version) => {
		// let filePath = path.resolve(process.cwd(), './dodo-chatbot.php')

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

				fs.writeFileSync(filePath, newContent)
			}
		} else {
			core.info(`File does not exist: ${filePath}`)
		}
	},
}