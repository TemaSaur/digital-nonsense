const $_GET = location.search.substr(1).split("&").reduce((o,i)=>(u=decodeURIComponent,[k,v]=i.split("="),o[u(k)]=v&&u(v),o),{});
const term = $_GET.term
console.log(term)

const termName = document.querySelector(".term")
const categories = document.querySelector(".categories")
const definition = document.querySelector(".definition")
const instance = document.querySelector(".instance")

function addItem(obj) {
	termName.innerHTML = obj.name;
	categories.innerHTML = ""
	for (let i = 0; i < obj.categories.length; ++i) {
		categories.innerHTML += `<span class="category">${obj.categories[i]}</span>`
	}
	const string = obj.definition.split("\n")
	console.log(string)
	// definition.innerHTML = obj.definition
	// definition.innerHTML = ""
	// definition.innerHTML += string + "<br>"
	definition.innerHTML = string.join("</p><p class=\"definition\">")
	instance.innerHTML = obj.instance
}

async function getJSON(path) {
	const res = await fetch(path)
	const jason = await res.json()
	for (let i = 0; i < jason.length; ++i) {
		if (jason[i].name == term)
			addItem(jason[i])
	}
}

getJSON("/js/terms.json")