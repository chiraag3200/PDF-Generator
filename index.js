const puppeteer = require('puppeteer')
const fs = require('fs-extra');

(async function() {
	try{
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		await page.setContent('<h1>Hello</h1>')
		await page.emulateMediaType('screen')
		await page.pdf({
			path: 'mypdf.pdf',
			format: 'A4',
			printBackground: true
		})

		console.log('done')
		await browser.close()
		process.exit()
	}
	catch(e){
		console.log(e);
	}
})()