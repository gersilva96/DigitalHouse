window.addEventListener("load", () => {

    let btnAbracadabra = document.getElementById("abracadabra");
    btnAbracadabra.addEventListener("click", () => {
        let name = prompt("Ingresá tu nombre:");
        let titular = document.getElementById("titular");
        titular.firstElementChild.innerHTML = name;
    });

    let btnGetInTouch = document.getElementById("getInTouch");
    btnGetInTouch.addEventListener("dblclick", () => {
        let parrafoColor = document.querySelector(".parrafo-color");
        parrafoColor.style.color = colorAlAzar();
    });

    const colorAlAzar = () => {
        const colores = ["blue", "red", "yellow", "green", "brown"];
        const numeroAlAzar = Math.floor(Math.random() * 5);   //Número aleatorio entre 0 y 4
        return colores[numeroAlAzar];
    };

    const boxesWork = document.querySelectorAll("section.box.style1");
    boxesWork.forEach(box => {
        box.addEventListener("click", () => {
            let boxTitle = box.querySelector("h3").innerHTML;
            alert(`Clickeaste sobre ${boxTitle}`);
        });
    });

    const btnRecentWork = document.getElementById("recentWork");
    const recentWorkParagraph = document.getElementById("recentWorkParagraph");
    btnRecentWork.addEventListener("mouseover", () => {
        recentWorkParagraph.style.color = colorAlAzar();
    });
    btnRecentWork.addEventListener("mouseout", () => {
        recentWorkParagraph.style.color = "#888";
    });

    const imgLechuza = document.getElementById("lechuza");
    imgLechuza.addEventListener("click", () => {
        alert("Preparate para el futuro...");
        setTimeout(() => {
            alert("Y el futuro ya llegó!");
        }, 5000);
    });

    const emailInput = document.getElementById("email");
    emailInput.addEventListener("keypress", (eKeypress) => {
        if (eKeypress.key == " ") {
            alert("Ey, tocaste el la barra!");
            eKeypress.preventDefault();
        }
    });

    let estadoSecreto = 0;
    window.addEventListener("keypress", (e) => {

        //Con switch
        /*switch(true) {
            case (e.key == "s"): estadoSecreto = 1; break;
            case (e.key == "e" && estadoSecreto == 1): estadoSecreto = 2; break;
            case (e.key == "c" && estadoSecreto == 2): estadoSecreto = 3; break;
            case (e.key == "r" && estadoSecreto == 3): estadoSecreto = 4; break;
            case (e.key == "e" && estadoSecreto == 4): estadoSecreto = 5; break;
            case (e.key == "t" && estadoSecreto == 5): estadoSecreto = 6; break;
            case (e.key == "o" && estadoSecreto == 6): alert("SECRETO MAGICO"); estadoSecreto = 0; break;
            default: estadoSecreto = 0;
        }*/

        //Con if
        if (e.key == "s") {
            estadoSecreto = 1;
        } else if (e.key == "e" && estadoSecreto == 1) {
            estadoSecreto = 2;
        } else if (e.key == "c" && estadoSecreto == 2) {
            estadoSecreto = 3;
        } else if (e.key == "r" && estadoSecreto == 3) {
            estadoSecreto = 4;
        } else if (e.key == "e" && estadoSecreto == 4) {
            estadoSecreto = 5;
        } else if (e.key == "t" && estadoSecreto == 5) {
            estadoSecreto = 6;
        } else if (e.key == "o" && estadoSecreto == 6) {
            estadoSecreto = 0;
            alert("SECRETO MAGICO");
        } else {
            estadoSecreto = 0;
        }
    });

    let numeroAleatorio = () => Math.floor(Math.random() * (6 - 0));
    let ganadora = document.querySelectorAll("article.box")[numeroAleatorio()];
    ganadora.addEventListener("click", () => {
        alert("GANASTE!!!");
    });

})