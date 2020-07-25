function toggleSection(id) {
	let state =  document.getElementById(`section${id}`).style.display;
	if (state == "block") {
		document.getElementById(`section${id}`).style.display = "none";
	} else if (state == "none") {
		document.getElementById(`section${id}`).style.display = "block";
	}
}