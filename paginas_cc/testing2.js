import puppeteer from 'puppeteer';

const openWebPage = async () => {

  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10
  });
  
  // Default options for navigation
  const navigationOptions = {
    waitUntil: 'networkidle2',
    timeout: 999999
  };

  // Open a new blank page
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Navigate the page to a URL
  await page.goto('https://expresodesamparados.com/',navigationOptions);

  //Press a button #1
  const button1 = 'a[href="/directorio/"]';
  await page.waitForSelector(button1);
  await page.click(button1);
}

openWebPage()