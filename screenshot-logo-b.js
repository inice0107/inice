const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const logos = [
    { id: 'logo-b-h',         name: '01-horizontal',  title: '横版' },
    { id: 'logo-b-v',         name: '02-vertical',    title: '竖版' },
    { id: 'logo-b-inv',       name: '03-inverse',     title: '反白版' },
    { id: 'logo-b-line',      name: '04-line',        title: '线条版' },
    { id: 'logo-b-avatar',    name: '05-avatar',      title: '头像' },
    { id: 'logo-b-watermark', name: '06-watermark',   title: '水印' },
    { id: 'logo-b-seal',      name: '07-seal',        title: '印章' },
  ];

  await page.goto('http://localhost:8889/logo-b-final.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  for (const logo of logos) {
    const element = await page.$('#' + logo.id);
    if (element) {
      await element.screenshot({
        path: '/root/.openclaw/workspace/inice-brand/logos-b/' + logo.name + '.png',
        type: 'png'
      });
      console.log('Saved: ' + logo.title);
    }
  }

  await browser.close();
  console.log('All B logos done!');
})();
