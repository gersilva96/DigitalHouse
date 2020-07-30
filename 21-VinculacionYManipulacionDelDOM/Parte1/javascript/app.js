//Punto 1
/*alert("Bienvenidos a mi sitio");

//Punto 2
let mensaje = "¿Estás seguro que querés avanzar?";
let confirma = confirm(mensaje);

if (confirma) {
    document.querySelector("h2").innerHTML = "Qué alegría que quieras con tu visita por este maravilloso sitio.";
} else {
    document.querySelector("h2").innerHTML = "Lamentamos que no quieras continuar tu visita por este maravilloso sitio";
    window.location = "https://google.com";
}

//Punto 3
let nombre = prompt("Por favor ingrese su nombre:");

//Punto 4
if (nombre != undefined) {
    document.querySelector("h1").innerHTML = `Bienvenido ${nombre}`;
}

//Punto 5
let edad = prompt("Ingresá tu edad");
let edadParsed = parseInt(edad);
if (edadParsed < 18) {
    document.querySelector(".container-general").style.display = "none";
    document.getElementById("accesoDenegado").style.display = "block";
}

//Punto 6
let hobbiesPrompt = prompt("Ingresá tus hobbies separados por una coma (,)");

//Punto 7
let hobbies = hobbiesPrompt.split([","]);

//Punto 8 y 10
let programming = false;

for (hobbie of hobbies) {
    if (hobbie == "Programación" || hobbie == "Programacion" || hobbie == "Programar" || hobbie == "programación" || hobbie == "programacion" || hobbie == "programar") {
        programming = true;
        break;
    }
}
if (programming) {
    alert("Qué bueno que te guste la programación");
    document.getElementsByClassName("background-img")[0].style.backgroundImage = "url(../img/programmer.jpeg)";
} else {
    alert("Qué lástima que no te guste la programación");
    document.getElementsByClassName("background-img")[0].style.backgroundImage = "url(../img/gatito.jpeg)";
}

//Punto 9
document.querySelector(".hobbies").innerHTML = "<ol></ol>";
for (let i = 0; i < hobbies.length && i < 3; i++){
    document.querySelector(".hobbies ol").innerHTML += `<li>${hobbies[i]}</li>`;
}

//Punto 11
let colorPreferido = prompt("Ingresá tu color favorito:");
console.log(colorPreferido);

let nombre = prompt("Ingresá tu nombre:");
document.querySelector("h1").innerHTML = `Bienvenido <span>${nombre}</span>`;

document.querySelector("h1 span").classList.add("color-preferido");

document.querySelector(".color-preferido").style.color = colorPreferido;

//Punto 12
let hobbiesPrompt = prompt("Ingresá tus hobbies separados por una coma (,)");
let hobbies = hobbiesPrompt.split([","]);
document.querySelector(".hobbies").innerHTML = "<ul></ul>";
hobbies.forEach(hobbie => {
    if (hobbie.length > 5 && hobbie.length < 10) {
        document.querySelector(".hobbies ul").innerHTML += `<li><a href="${prompt(`URL de ${hobbie}`)}">${hobbie}</li>`;
    }
});

document.querySelectorAll(".hobbies ul li").forEach(elem => elem.classList.add("center"));

document.querySelectorAll(".center").forEach(elem => {
    elem.style.textAlign = "center";
    elem.style.listStyle = "none"
    elem.lastChild.style.textDecoration = "none";
    elem.lastChild.style.color = colorPreferido;
});

//Punto 13
document.querySelector(".avatar").src = prompt("Ingresá el link de tu imagen:");
*/

let pelicula = {
    nombre: prompt("Ingresá el nombre de tu película favorita:"),
    director: prompt("Ingresá el director de tu película favorita:"),
    duracion: prompt("Ingresá la duración de tu película favorita (en minutos):"),
    actor: prompt("Ingresá el actor de tu película favorita:")
};

let ul = document.querySelector("#pelicula ul");
let ol = document.createElement("ol");

ol.innerHTML = ul.innerHTML;

ul.parentNode.replaceChild(ol, ul);

for (propiedad in pelicula) {
    if (propiedad == "nombre") {
        document.querySelector(`#pelicula ol #${propiedad}`).innerHTML = `${propiedad}: <a href="${prompt("Ingresá el link de IMDB de la película")}" target="_blank">${pelicula[propiedad]}</a>`;
    } else if (propiedad == "duracion") {
        document.querySelector(`#pelicula ol #${propiedad}`).innerHTML = `${propiedad}: ${pelicula[propiedad]} min`;
    } else {
        document.querySelector(`#pelicula ol #${propiedad}`).innerHTML = `${propiedad}: ${pelicula[propiedad]}`;
    }
}

document.getElementById("pelicula").classList.remove("contenido-bloqueado");

document.querySelectorAll("#pelicula ol li").forEach(elem => elem.classList.add("center"));

document.querySelectorAll(".center").forEach(elem => {
    elem.style.textAlign = "center";
    elem.style.listStyle = "none"
    if(elem.children.length != 0) {
        elem.lastChild.style.textDecoration = "none";
    }
});