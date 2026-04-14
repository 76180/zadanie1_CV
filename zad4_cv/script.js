	const themeLink = document.getElementById("arkusz-stylow");

	function zmienStyl() {
		if (themeLink.getAttribute("href") === "red.css") {
			themeLink.setAttribute("href", "green.css");
		} else {
			themeLink.setAttribute("href", "red.css");
		}
	}
	
	/*function przelaczWyksztalcenie() {
	const sekcja = document.getElementById("wyksztalcenie");
	const przycisk = document.getElementById("pokazLubSchowaj");

	 if (sekcja.style.display === "none") {
		sekcja.style.display = "block";
		przycisk.textContent = "Ukryj wykształcenie";
	} else {
		sekcja.style.display = "none";
		przycisk.textContent = "Pokaż wykształcenie";
	}
} */
function przelaczSekcje() {
	const sekcje = document.querySelectorAll(".sekcja");
	const przycisk = document.getElementById("pokazLubSchowaj");

	sekcje.forEach(function (sekcja) {
		if (sekcja.style.display === "none") {
			sekcja.style.display = "block";
			przycisk.textContent = "Ukryj sekcje";
		} else {
			sekcja.style.display = "none";
			przycisk.textContent = "Pokaż sekcje";
		}
	});
}