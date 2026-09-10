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
    { id: 'logo-a-h',       name: 'a-01-horizontal',  title: '方案A-横版' },
    { id: 'logo-a-v',       name: 'a-02-vertical',    title: '方案A-竖版' },
    { id: 'logo-a-inv',     name: 'a-03-inverse',     title: '方案A-反白' },
    { id: 'logo-b-h',       name: 'b-01-horizontal',  title: '方案B-横版' },
    { id: 'logo-c-h',       name: 'c-01-horizontal',  title: '方案C-横版' },
    { id: 'logo-d-v',       name: 'd-01-vertical',    title: '方案D-竖排' },
    { id: 'logo-avatar',    name: 'e-01-avatar',      title: '头像' },
    { id: 'logo-watermark', name: 'e-02-watermark',   title: '水印' },
    { id: 'logo-seal',      name: 'e-03-seal',        title: '印章' },
  ];

  await page.goto('http://localhost:8889/logo-text.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  for (const logo of logos) {
    const element = await page.$('#' + logo.id);
    if (element) {
      await element.screenshot({
        path: '/root/.openclaw/workspace/inice-brand/logos-text/' + logo.name + '.png',
        type: 'png'
      });
      console.log('Saved: ' + logo.title);
    }
  }

  await browser.close();
  console.log('All text logos done!');
})();
