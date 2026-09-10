const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const cards = [
    { name: 'frankincense', title: '乳香' },
    { name: 'myrrh', title: '没药' },
    { name: 'na-swa', title: '纳斯瓦' },
    { name: 'sandalwood', title: '檀香木' },
    { name: 'nag-champa', title: '金香木' },
    { name: 'dorjee', title: '多吉' },
    { name: 'citronella', title: '香茅' },
    { name: 'austha-suganda', title: '奥斯塔' },
    { name: 'devdar', title: '神木' },
    { name: 'himalayan-cedar', title: '喜马拉雅雪松' },
  ];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const yOffset = i * 1640;

    await page.goto('http://localhost:8889/product-cards.html', { waitUntil: 'networkidle0' });
    await page.evaluate((y) => window.scrollTo(0, y), yOffset);
    await new Promise(r => setTimeout(r, 800));

    const element = await page.$('.card:nth-child(' + (i + 1) + ')');
    if (element) {
      await element.screenshot({
        path: '/root/.openclaw/workspace/inice-brand/products/' + String(i + 1).padStart(2, '0') + '-' + card.name + '.png',
        type: 'png'
      });
      console.log('Screenshot saved: ' + card.title);
    }
  }

  await browser.close();
  console.log('All screenshots done!');
})();
