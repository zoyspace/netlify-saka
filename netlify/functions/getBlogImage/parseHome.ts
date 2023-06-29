import { parse } from "node-html-parser";
import type { blog_element } from "./main";

export function parseHome(html: string) {
	const blogArray: blog_element[] = [];
	const root = parse(html);
	// console.log(root?.querySelector("title")?.text);
	const elArray = root.querySelectorAll("div.m--postone__in");
	elArray.forEach((element) => {
		const href = element.querySelector(".m--postone__a")?.getAttribute("href");
		const tmp_name = element.querySelector("p.m--postone__name")?.text;
		const name = tmp_name?.replace(/\s+/g, ""); //replace:名前から空白を削除
		const title = element.querySelector("p.m--postone__ttl")?.text;
		const date = element.querySelector("p.m--postone__time")?.text;
		if (name && title && date && href)
			blogArray.push({
				name: name,
				title: title,
				date: date,
				url: href,
				imgUrls: [],
			});
	});
	console.log(__filename);
	return blogArray;
}
