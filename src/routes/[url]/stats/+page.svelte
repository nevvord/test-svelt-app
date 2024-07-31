<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const statistic = JSON.parse(data.statistic) as IStatistics;

	const visitors = statistic.visitors;
</script>

<div>
	<div>
		<div>Total visitors: {statistic.views}</div>
		<div>Last visit: {statistic.lastViewed}</div>
	</div>
	<div class="mt-4">List of visitors:</div>
	<ul class="flex flex-col gap-2">
		{#each visitors as visitor}
			<li>
				<div class="border p-1 rounded">
					<div>{visitor.ip}</div>
					<div>{visitor.location}</div>
					<div>{visitor.userAgent}</div>
					<div>{visitor.timestamp}</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
