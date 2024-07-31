import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { variables } from '$lib';

export const load: PageServerLoad = async ({ params, platform, request }) => {
	const url = await platform?.env.MIGHTY_KV.get(params.url);

	if (!url) {
		return;
	}

	const ip = request.headers.get('CF-Connecting-IP') || '';
	const userAgent = request.headers.get('user-agent') || '';
	const location = request.headers.get('CF-IPCountry') || '';

	const visitorInfo = { ip, userAgent, location, timestamp: new Date() };

	const statisticsJson = await platform?.env.MIGHTY_KV.get(`${variables.statistics}:${params.url}`);
	const statistics: IStatistics = statisticsJson
		? JSON.parse(statisticsJson)
		: { views: 0, lastViewed: new Date(), visitors: [] };

	statistics.visitors.push(visitorInfo);
	statistics.views++;
	statistics.lastViewed = new Date();

	await platform?.env.MIGHTY_KV.put(
		`${variables.statistics}:${params.url}`,
		JSON.stringify(statistics)
	);

	throw redirect(302, url);
};
