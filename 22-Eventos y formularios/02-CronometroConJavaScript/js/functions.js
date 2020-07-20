window.addEventListener("load", () => {
    let startBtn = document.querySelector(".start");
    let pauseBtn = document.querySelector(".pause");
    let resetBtn = document.querySelector(".reset");
    let minutes = document.querySelector(".reloj-parte.minutes");
    let seconds = document.querySelector(".reloj-parte.seconds");
    let sec = 0;
    let min = 0;

    pauseBtn.setAttribute("disabled", "");

    let crono;

    const escribir = () => {
        let secAux, minAux;
        sec++;
        if (sec > 59) {
            min++;
            sec = 0;
        }
        (sec < 10) ? secAux = `0${sec}` : secAux = `${sec}`;
        (min < 10) ? minAux = `0${min}` : minAux = `${min}`;
        seconds.innerHTML = secAux;
        minutes.innerHTML = minAux;
    };

    const cronometrar = () => {
        escribir;
        crono = setInterval(escribir, 1000);
        startBtn.removeEventListener("click", cronometrar);
        startBtn.setAttribute("disabled", "");
    };

    const pause = () => {
        clearInterval(crono);
        pauseBtn.removeAttribute("disabled");
        startBtn.addEventListener("click", cronometrar);
    };

    /*const restart = () => {
        clearInterval(crono);
        alert("Restart");
    };*/

    startBtn.addEventListener("click", cronometrar);
    pauseBtn.addEventListener("click", pause);
    //restartBtn.addEventListener("click", restart);
});