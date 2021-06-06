const { load } = require('cheerio')
const fetch = require('node-fetch')
const {writeFileSync} = require('fs')
const {generate} = require('shortid')
const DOMScrapper = require('./Composer')

const init = async () => {
    const url = 'https://www.infinitysymbol.net/'
    const htmlStr = await (await fetch(url)).text()
    const $ = load(htmlStr)
    const fileName = generate()+'-'+Date.now()
    writeFileSync('./htmls/'+fileName+'.html', $.html())
    console.log($('div').toArray().length)
    console.log($('#myTooltip').html())
    const composer =  new DOMScrapper($)
    const json = composer.domToJSON()
    writeFileSync('./jsons/'+fileName+'.json', JSON.stringify(json, null, 2))
}

init()