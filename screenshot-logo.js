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
    { id: 'logo-h',     name: '01-horizontal',   title: '主LOGO横版' },
    { id: 'logo-icon',  name: '02-icon',         title: '图标版' },
    { id: 'logo-v',     name: '03-vertical',     title: '竖版' },
    { id: 'logo-inv',   name: '04-inverse',      title: '反白版' },
    { id: 'logo-line',  name: '05-line',         title: '线条版' },
    { id: 'logo-avatar',name: '06-avatar',       title: '小红点头像' },
    { id: 'logo-wm',    name: '07-watermark',    title: '卡片水印' },
  ];

  await page.goto('http://localhost:8889/logo-all.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  for (const logo of logos) {
    const element = await page.$('#' + logo.id);
    if (element) {
      await element.screenshot({
        path: '/root/.openclaw/workspace/inice-brand/logos/' + logo.name + '.png',
        type: 'png'
      });
      console.log('Saved: ' + logo.title);
    }
  }

  await browser.close();
  console.log('All logos exported!');
})();
