const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

describe('Percy Visual Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Captura de pantalla de la página ', async () => {
    await page.goto('http://www.example.com'); 
    await page.waitForSelector('h1');
    await percySnapshot(page, 'Ejemplo Snapshot');
  }, 60000);
});
