import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
// import { schedule } from "@netlify/functions";

import { main } from "./main";

// async function handler(event: HandlerEvent, context: HandlerContext) {
export const handler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
) => {
	return {
		statusCode: 200,
		body: JSON.stringify(main()),
		// body: JSON.stringify({ message: "Hello this is netlify functions" }),
	};
};

// export { handler };
