const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Jest Image Snapshot Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Captura de pantalla completa de la página principal', async () => {
    await page.goto('http://www.example.com'); 
    await page.waitForSelector('h1');
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });

  test('Captura de pantalla de un elemento específico', async () => {
    await page.goto('http://www.example.com');
    const element = await page.waitForSelector('h1');
    const screenshot = await element.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});
