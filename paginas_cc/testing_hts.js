import puppeteer from 'puppeteer'; 
import fs from 'fs'; 

// Return the current date in a specific format
const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${year}${month}${day}`;
}

// Do all
const openWebPage = async (ccLink) => {

  // Launch the browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    defaultViewport: null, // Set viewport to maximum dimensions 
    args:[
      '--start-maximized' // You can also use '--start-fullscreen'
    ]
  });

  // Default options for navigation
  const navigationOptions = {
    waitUntil: 'networkidle2',
    timeout: 999999
  };

  // Open a new blank page
  const pageTest = await browser.newPage();
    
  // Set Default Timeout on all the script actions
  pageTest.setDefaultTimeout(100000);

  // Set screen size
  /*
  await pageTest.setViewport({
    width: 1600, 
    height: 900,
    deviceScaleFactor: 1,
  });
  */

  // Go to link
  await pageTest.goto(ccLink, navigationOptions);

  // Set screen zoom
  //await pageTest.evaluate(() => {
  //  document.body.style.zoom = 0.8
  //});

  // Set actual date
  const date = getCurrentDate();
  
  // Extract page url
  const currentUrl = pageTest.url();
  
  // Extract page name
  let pageName = currentUrl;
  pageName = pageName.replace('https://','');
  pageName = pageName.replace('.com/','');
  pageName = pageName.replace('www.','');
  pageName = pageName.replace('/','_');

  // Create a new folder
  const folderName = date;
  const folderPath =  `./captures/${pageName}/${folderName}`;
  if (!fs.existsSync(folderPath)) {
    try {
      fs.mkdirSync(folderPath);
      console.log(`Created folder: ${folderPath}`);
    } catch (err) {
      console.error(`Error creating folder: ${err.message}`);
    }
  }
  else{
    console.log(`Folder already exists: ${folderPath}`);
  }

  // Total time for site
  let totalTime = 0;
  
  // Navigate to Home

  // Starting load time
  let startTime = Date.now();

  // Take a screenshot
  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    await pageTest.screenshot({
      path: `./captures/${pageName}/${folderName}/log1_inicio_${pageName}_${date}.png`
    });

    // Ending load time
    let endTime = Date.now(); 
    let loadTime = endTime - startTime;
    totalTime += loadTime;
  });

  // Navigate to Tú Hospedate
  let button = 'a[href="https://www.hoteltrinitarias.com/tu-hospedaje/"]';
  await pageTest.waitForSelector(button);
  await pageTest.click(button);

  // Starting load time
  startTime = Date.now();

  // Take a screenshot
  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    await pageTest.screenshot({
      path: `./captures/${pageName}/${folderName}/log2_tuhospedaje_${pageName}_${date}.png`
    });

    // Ending load time
    let endTime = Date.now(); 
    let loadTime = endTime - startTime;
    totalTime += loadTime;
  });

  // Navigate to Promociones
  button = 'a[href="https://www.hoteltrinitarias.com/nuestras-promociones/"]';
  await pageTest.waitForSelector(button);
  await pageTest.click(button);

  // Starting load time
  startTime = Date.now();

  // Take a screenshot
  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    await pageTest.screenshot({
      path: `./captures/${pageName}/${folderName}/log3_promociones_${pageName}_${date}.png`
    });

    // Ending load time
    let endTime = Date.now(); 
    let loadTime = endTime - startTime;
    totalTime += loadTime;
  });


  // Navigate to Tu Evento
  button = 'a[href="https://www.hoteltrinitarias.com/tu-evento/"]';
  await pageTest.waitForSelector(button);
  await pageTest.click(button);
  
  // Starting load time
  startTime = Date.now();

  // Take a screenshot
  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    
    await pageTest.screenshot({
      path: `./captures/${pageName}/${folderName}/log4_tuevento_${pageName}_${date}.png`
    });

    // Ending load time
    let endTime = Date.now(); 
    let loadTime = endTime - startTime;
    totalTime += loadTime;
  });
  

  // Navigate to Servicios
  button = 'a[href="https://www.hoteltrinitarias.com/nuestros-servicios/"]';
  await pageTest.waitForSelector(button);
  await pageTest.click(button);

  // Starting load time
  startTime = Date.now();  

  // Take a screenshot
  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    await pageTest.screenshot({
      path: `./captures/${pageName}/${folderName}/log5_servicios_${pageName}_${date}.png`
    });

    // Ending load time
    let endTime = Date.now(); 
    let loadTime = endTime - startTime;
    totalTime += loadTime;
  });


  // Navigate to Contáctanos
  button = 'a[href="https://www.hoteltrinitarias.com/contactanos/"]';
  await pageTest.waitForSelector(button);
  await pageTest.click(button);

  // Starting load time
  startTime = Date.now();

  // Take a screenshot
  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    await pageTest.screenshot({
      path: `./captures/${pageName}/${folderName}/log6_contactanos_${pageName}_${date}.png`
    });  

    // Ending load time
    let endTime = Date.now(); 
    let loadTime = endTime - startTime;
    totalTime += loadTime;
  });  

  await pageTest.waitForNetworkIdle({ idleTime: 2000 }).then(async () => {
    // Close the page
    await pageTest.close();
    // Close the browser
    await browser.close();
  });

  // Just a message
  return console.log(`Website "${pageName}" loaded in ${totalTime}ms, with an average per page of ${totalTime/5}ms`);
}

//Constants CC Links, be careful with the structure
const ccLinks = {
  HotelTrinitarias : 'https://hoteltrinitarias.com/',
}

// Main function
const run = async () => {
  try {
    // Open each link sequentially
    for (const ccLink of Object.values(ccLinks)) {
      await openWebPage(ccLink);
    }
  } catch (error){
    console.error(`Error en la ejecución: ${error}`);
  }
}

// Run the main function
run();
