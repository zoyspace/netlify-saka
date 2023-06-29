import { promises, existsSync } from "fs";

export async function readFile(out_image_file: string) {
	if (existsSync(out_image_file)) {
		const rawData = await promises.readFile(out_image_file, "utf8");
		const listed = JSON.parse(rawData);
		// console.log(listed);
		return listed;
	}
	console.log("end");
}
// readFile("out_imageList.json");
