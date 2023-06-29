import axios from "axios";
import { readdirSync, writeFileSync } from "fs";
import sharp from "sharp";
import type { blog_element } from "./main";

const mainUrl = "https://www.nogizaka46.com";
// 画像を取得する。
// webpに変換し、格納する。

// URLから画像をバイナリとしてダウンロードする
async function downloadImage(url: string) {
	const response = await axios.get(url, { responseType: "arraybuffer" });
	return Buffer.from(response.data, "binary");
}

// PNGをWebPに変換する
async function convertToWebP(buffer: Buffer) {
	return await sharp(buffer).webp().toBuffer();
}

function getUniqueShortenedNamesFileNames(image_dir: string) {
	try {
		const fileNames = readdirSync(image_dir);
		const shortenedNames = fileNames.map((na) => na.substring(0, 12)); //先頭12文字にする。
		const uniqueShortenedNames = [...new Set(shortenedNames)]; //重複削除し、ユニークにする。
		return uniqueShortenedNames;
	} catch (err: any) {
		console.error(`Error: ${err.message}`);
	}
}

// メインの関数
export async function imageDownConvert(
	imageElemnts: blog_element[],
	image_dir: string
) {
	try {
		let numDown = 0;
		const uniqueShortenedNames = getUniqueShortenedNamesFileNames(image_dir);
		for (const imageElemnt of imageElemnts) {
			const Mdate = imageElemnt.date.replace(/[:/ ]+/g, "");
			if (uniqueShortenedNames?.includes(Mdate)) continue;
			const outName1 = Mdate + "_" + imageElemnt.name;

			for (let [i, imgUrl] of imageElemnt.imgUrls.entries()) {
				const url = mainUrl + imgUrl; // 画像のURLをセット
				const buffer = await downloadImage(url);
				const webpBuffer = await convertToWebP(buffer);
				// 日付からスペース、スラッシュ、コロンを削除
				const outName2 = outName1 + "_" + i.toString().padStart(2, "0");

				writeFileSync(image_dir + outName2 + ".webp", webpBuffer); // output.webpという名前でファイルを保存
				numDown++;
			}
		}
		console.log("取得した画像数： " + numDown.toString());
		console.log(__filename);
	} catch (err: any) {
		console.error(`Error: ${err.message}`);
	}
}

// main().catch(console.error);
