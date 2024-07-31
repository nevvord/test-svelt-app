import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { variables } from '$lib';

export const load: PageServerLoad = async ({ params, platform, request }) => {
	const statistic = (await platform?.env.MIGHTY_KV.get(
		`${variables.statistics}:${params.url}`
	)) as string;

	if (!statistic) {
		redirect(302, '/');
	}

	return {
		statistic
	};
};
