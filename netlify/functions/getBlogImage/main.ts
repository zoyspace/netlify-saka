import { promises, writeFile, existsSync } from "fs";
import { fetchPage } from "./fetchPage";
import { fetchHtmlWithBrowser } from "./fetchHtmlWithBrowser";
import { parseHome } from "./parseHome";
import { imageDownConvert } from "./imageDownConvert";
import { exit } from "process";

// const target_url = "https://www.nogizaka46.com/s/n46/diary/MEMBER?ima=1031";
const target_url = "https://www.nogizaka46.com/s/n46/diary/MEMBER";
const out_image_file = "out_imageList.json";
const assets_dir = "src/assets/";
const image_dir = "public/images/";
export interface blog_element {
	date: string;
	name: string;
	title: string;
	url: string;
	imgUrls: string[];
}
// main();
const result: string[] = [];

export async function main() {
	const html = await fetchHtmlWithBrowser(target_url);
	writeFile(assets_dir + "out_content.html", html.toString(), (err) => {
		if (err) throw err;
		const re_message = "html正常に書き込みが完了しました";
		console.log(re_message);
		result.push(re_message);
	});

	const blogArray = parseHome(html);
	if (existsSync(assets_dir + out_image_file)) {
		const rawData = await promises.readFile(
			assets_dir + out_image_file,
			"utf8"
		);
		const pre_imageList = JSON.parse(rawData);
		let j = 0;
		blogArray.forEach((element, index) => {
			if (element.date == pre_imageList[j].date) {
				element.imgUrls = pre_imageList[j].imgUrls;
				j++;
			}
		});
		// console.log(j);
	}
	result.push("complete parseHome");
	// console.log(blogArray[0]);
	// console.log(blogArray[1]);
	// exit();
	// exit();
	// const out_json = JSON.stringify(blogArray, null, 2);
	// writeFile("outdated.json", out_json, (err) => {
	// 	if (err) throw err;
	// 	console.log("json正常に書き込みが完了しました");
	// });
	const blogArray2 = await fetchPage(blogArray);
	result.push("complete fetchPage");

	const out_json2 = JSON.stringify(blogArray2, null, 2);
	writeFile(assets_dir + out_image_file, out_json2, (err) => {
		if (err) throw err;
		console.log(out_image_file + " has been written successfully");
	});
	if (blogArray2)
		imageDownConvert(blogArray2, image_dir),
			result.push("complete imageDownConvert");
	return result;
}
