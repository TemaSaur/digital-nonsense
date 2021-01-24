const parent = document.querySelector(".term-cards")

function addItem(obj) {
	let html = `<div class="term-card"><a href="term.html?term=${obj.name}"><h3>${obj.name}</h3></a><div class="categories flex-align-center flex-gap">`
	for (let i = 0; i < obj.categories.length; ++i)
		html += `<span class="category">${obj.categories[i]}</span>`;
	html += "</div></div>"
	parent.innerHTML += html;
}

async function getJSON(path) {
	const res = await fetch(path)
	const jason = await res.json()
	for (let i = 0; i < jason.length; ++i) {
		addItem(jason[i])
	}
}

getJSON("/js/terms.json")