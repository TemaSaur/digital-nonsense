const parent = document.querySelector(".reduce-cards")

function addItem(obj) {
	parent.innerHTML += `
		<div class="reduce">
			<span class="small">${obj[0]}</span>
			<span class="big">${obj[1]}</span>
		</div>
	`
}

async function getJSON(path) {
	const res = await fetch(path)
	const jason = await res.json()
	for (let i = 0; i < jason.length; ++i) {
		addItem(jason[i])
	}
}

getJSON("/js/reduce.json")