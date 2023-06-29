import { chromium } from "@playwright/test";
// playwrightを使う。
// ヘッドレスモードでブラウザを開く。
// htmlを取得する。返す。
export async function fetchHtmlWithBrowser(target_url: string) {
	const browser = await chromium.launch({
		// headless: false, // ヘッドレスモードをオフ
	});
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(target_url);
	const html = await page.content();

	await browser.close();
	console.log("__filename");
	return html;
}
