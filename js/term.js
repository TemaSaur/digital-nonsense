const $_GET = location.search.substr(1).split("&").reduce((o,i)=>(u=decodeURIComponent,[k,v]=i.split("="),o[u(k)]=v&&u(v),o),{});
const term = $_GET.term
console.log(term)
const data = []

const termName = document.querySelector(".term")
const categories = document.querySelector(".categories")
const definition = document.querySelector(".definition")
const instance = document.querySelector(".instance")


async function getJSON(path) {
	const res = await fetch(path)
	const jason = await res.json()
	for (let i = 0; i < jason.length; ++i) {
		data.push(jason[i])
	}
}

function bisect(data, x) {
	let lo = 0, 
			hi = data.length,
			mid;
	console.log([lo, hi])
	while (lo < hi) {
		mid = Math.floor((lo + hi) / 2)
		if (data[mid].name < x)
			lo = mid + 1
		else
			hi = mid
	}
	return data[lo];
}

function addItem(obj) {
	termName.innerHTML = obj.name;
	categories.innerHTML = ""
	for (let i = 0; i < obj.categories.length; ++i) {
		categories.innerHTML += `<span class="category">${obj.categories[i]}</span>`
	}
	const string = obj.definition.split("\n")
	console.log(string)
	definition.innerHTML = string.join("</p><p class=\"definition\">")
	instance.innerHTML = obj.instance
}


getJSON("/js/terms.json").then(() => {
	termObject = bisect(data, term)
	addItem(termObject)
})
// console.log(data)
// const termObject = bisect(data, term)
// addItem(termObject)
