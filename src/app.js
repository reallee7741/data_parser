const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto('https://www.wildberries.ru/', {waitUntil: "networkidle0", timeout: 0,});
	const parsedData = await page.evaluate(() => {
		const products = document.querySelectorAll(".product-card__wrapper");

		return Array.from(products).map((product) => {
			const name = product.querySelector(".product-card__name").innerText;
			const price = product.querySelector(".price__lower-price").innerText;

			return {name, price};
		});

	});

	console.log(parsedData);

	await browser.close();
})();