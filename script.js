function devuelveTextoDeAlerta() {
  return "uooooo! Vaya alerta";
};

var gustan = true;
var nogustan = true;

function aparicionGustar(nombre) {

	const babsList = document.querySelectorAll(nombre);
	for (const i = 0; i < babsList.length; i++) {
		if (gustan) babsList[i].style.visibility='hidden'; gustan = false;
		else babsList[i].style.visibility='shown'; gustan = true;
	}

};
function aparicionNoGustar(nombre) {

	const babsList = document.querySelectorAll(nombre);
	for (const i = 0; i < babsList.length; i++) {
		if (nogustan) babsList[i].style.visibility='hidden'; nogustan = false;
		else babsList[i].style.visibility='shown'; nogustan = true;
	}
};


function elemento(n){
	return babosas[n];
};

window.onload = function() {

	const paragraph = document.getElementById("lista");

	const lista = document.createElement('ul');
	for (let i; i<babosas.length; i++){
		const lista = document.createElement('li');
		lista.innerHTML = babosas[i];
	}
	lista.innerHTML = 'Babosas';
	lista.setAttribute('type', 'button');

	document.body.appendChild(lista);
	
	const elementos = document.querySelectorAll("lista");
	for (const i = 0; i < elementos.length; i++) {
		buttons[i].style = "display: none"; // hide buttons
}
};