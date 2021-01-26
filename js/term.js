const $_GET = location.search.substr(1).split("&").reduce((o,i)=>(u=decodeURIComponent,[k,v]=i.split("="),o[u(k)]=v&&u(v),o),{});
const term_ = $_GET.term
const term = term_.split("+").join(" ")
document.title = term + " - Digital nonsense";
const data = []


const termName = document.querySelector(".term")
const categories = document.querySelector(".categories")
const definition = document.querySelector(".definition")
const instance = document.querySelector(".instance")
const picture = document.querySelector(".picture")
const vid = document.querySelector(".vid")


async function getJSON(path) {
	/**
	 * Gets the contents of `path`, stores in a global variable `data`
	 * @param {string} path to the json file, respective to the html file
	 */
	const res = await fetch(path)
	const jason = await res.json()
	for (let i = 0; i < jason.length; ++i) {
		data.push(jason[i])
	}
}

function bisect(array, x) {
	/**
	 * Optimally finds the item `x` in the array `array`
	 * @param {array} array - the array to look for the item in
	 * @param {any} x - item to look for
	 */
	
	// the implimentation is almost fully copied
	// from the python bisect library
	// may have some problems

	let lo = 0, 
	    hi = array.length,
	    mid;
	
	while (lo < hi) {
		mid = Math.floor((lo + hi) / 2)
		if (array[mid].name < x)
			lo = mid + 1
		else
			hi = mid
	}
	return array[lo];
}

function addItem(obj) {
	/**
	 * Generates html to be pasted in the specific blocks on the page
	 * @param {object} obj - the object, parameters of which will be used in html generation
	 */
	
	// add term
	termName.innerHTML = obj.name;

	// add categories
	categories.innerHTML = ""
	for (let i = 0; i < obj.categories.length; ++i) {
		categories.innerHTML += `<span class="category">${obj.categories[i]}</span>`
	}
	
	// add definition
	const string = obj.definition.split("\n")
	definition.innerHTML = "<p>" + string.join("</p><p>") + "</p>"
	
	// add quote (if existent)
	if (obj.instance)
		instance.innerHTML = obj.instance
	else
		instance.style.display = "none"

	// add picture (if existent)
	if (obj.picture)
		picture.innerHTML = `<img src="/img/${term}.${obj.picture}">`
	else
		picture.style.display = "none"
	
	// add video (if existent)
	if (obj.vid)
		vid.innerHTML = `<iframe width="528" height="300" src="https://www.youtube.com/embed/${obj.vid}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
	else
		vid.style.display = "none"
}


getJSON("/js/terms.json").then(() => {
	termObject = bisect(data, term)
	addItem(termObject)
})
