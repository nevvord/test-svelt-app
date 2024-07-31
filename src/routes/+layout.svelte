<script>
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<header class="bg-blue-500 text-white py-2">
		<nav class="container mx-auto">
			<a href="/" class="font-bold">ShortCutUrl</a>
		</nav>
	</header>

	<main class="flex-1">
		<div class="container mx-auto">
			<slot />
		</div>
	</main>

	<footer class="bg-indigo-950 text-white py-4">
		<div class="container mx-auto">
			<div class="flex justify-between items-center">
				<div>Created by <span class="font-mono">Nevvord</span></div>
				<div>&copy; 2024</div>
			</div>
		</div>
	</footer>
</div>
