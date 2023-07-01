import {readdirSync} from "fs";
console.log("sss");
function getFileNameInDir(image_dir: string) {
	try {
		const fileNames = readdirSync(image_dir);
		const shortenedNames = fileNames.map((na) => na.substring(0, 12)); //先頭12文字にする。
		const uniqueShortenedNames = [...new Set(shortenedNames)]; //重複削除し、ユニークにする。
		return uniqueShortenedNames;
	} catch (err: any) {
		console.error(`Error: ${err.message}`);
	}
}