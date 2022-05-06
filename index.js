const puppeteer = require('puppeteer')
const fs = require('fs-extra');
const data = require('./data.json')
const Handlebars = require('handlebars')
const path = require('path')
const moment = require('moment')

const compile = async function(templateName, data){
	const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
	const html = await fs.readFile(filepath, 'utf-8')
	return Handlebars.compile(html)(data)
}

var hbs = Handlebars.create({
  helpers: {
    dateFormat: function (value, format) { return moment(value).format(format) }  
  }
});


(async function() {
	try{
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		const content = await compile('generate_receipt_template', data)


		await page.setContent(content)
		await page.emulateMediaType('screen')
		await page.pdf({
			path: 'mypdf.pdf',
			format: 'A4',
			printBackground: true
		})

		await browser.close()
		process.exit()
	}
	catch(e){
		console.log(e);
	}
})()