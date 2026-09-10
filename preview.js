const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page.goto('http://localhost:8889/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 3000));

  // Screenshot hero section
  const hero = await page.$('.hero');
  if (hero) {
    await hero.screenshot({
      path: '/root/.openclaw/workspace/inice-brand/preview-hero.png',
      type: 'png'
    });
  }

  // Screenshot nav
  const nav = await page.$('nav');
  if (nav) {
    await nav.screenshot({
      path: '/root/.openclaw/workspace/inice-brand/preview-nav.png',
      type: 'png'
    });
  }

  await browser.close();
  console.log('Preview done');
})();
