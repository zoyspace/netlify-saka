import axios from "axios";
import { parse } from "node-html-parser";
import type { blog_element } from "./main";
// ・入力からブログページを読み込む。
// ・画像urlを取得する
// ・リスト出力する。

export async function fetchPage(blogArray: blog_element[]) {
	try {
		// const rawData = await fs.readFile("outdated.json", "utf8");
		// const blogElemnts = JSON.parse(rawData);

		const blogElemnts = blogArray;
		let numPage = 0;
		for (let [index, blogElemnt] of blogElemnts.entries()) {
			if (blogElemnt.imgUrls.length > 0) continue;
			const { data } = await axios.get(blogElemnt.url);
			blogElemnt.imgUrls = [];
			numPage++;

			// await fs.writeFile("out_detail.html", data.toString());
			// console.log("Html has been written successfully");

			const parsedData = parse(data);
			const imageElements = parsedData.querySelectorAll("div.bd--edit img");
			for (let imageElement of imageElements) {
				const ele = imageElement.getAttribute("src");
				if (ele) blogElemnt.imgUrls.push(ele);
			}
		}
		console.log("取得したページ数: " + numPage.toString());
		console.log(__filename);
		return blogElemnts;
	} catch (err: any) {
		console.error(`Error: ${err.message}`);
	}
}
// fetchAndParseHtml();
