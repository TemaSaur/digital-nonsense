const header = document.querySelector("header")

header.innerHTML = `<div class="container">
<div class="header-wrap">
	<a href="/" class="logo">
		<h1>digital nonsense</h1>
	</a>
	<nav class="flex-align-center flex-gap">
		<a href="/">
			List all
		</a>
		<a href="${islocal()? 'reduce.html': 'reduce'}">
			Reduced
		</a>
		<!-- <div class="search-box flex-align-center flex-gap">
			<input type="text">
			<a href="/">
				<i class="fas fa-search"></i>
			</a>
		</div> -->
	</nav>
</div>
</div>`