import { formDataValidator } from '$lib';

interface IPostRequestBody {
	url: string;
	shortUrl: string;
}

export async function POST({ platform, request }) {
	const body: IPostRequestBody = await request.json();

	formDataValidator.safeParseAsync(body);

	const exist = await platform?.env.MIGHTY_KV.get(body.shortUrl);

	if (exist) {
		return new Response(
			JSON.stringify({
				message: 'Short link already exists'
			}),
			{
				status: 400
			}
		);
	}

	await platform?.env.MIGHTY_KV.put(body.shortUrl, body.url);

	return new Response(
		JSON.stringify({
			message: 'Short link created'
		}),
		{
			status: 200
		}
	);
}
