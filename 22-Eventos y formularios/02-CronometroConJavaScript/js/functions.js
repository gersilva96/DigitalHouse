window.addEventListener("load", () => {
    let startBtn = document.querySelector(".start");
    let pauseBtn = document.querySelector(".pause");
    let resetBtn = document.querySelector(".reset");
    let minutes = document.querySelector(".reloj-parte.minutes");
    let seconds = document.querySelector(".reloj-parte.seconds");

    pauseBtn.setAttribute("disabled", "");
    resetBtn.setAttribute("disabled", "");

    let sec = 0;
    let min = 0;

    let crono;

    const escribir = (reset) => {
        let secAux, minAux;
        sec++;
        if (sec > 59) {
            min++;
            sec = 0;
        }
        if (reset != undefined) {
            sec = 0;
            min = 0;
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
        pauseBtn.addEventListener("click", pause);
        pauseBtn.removeAttribute("disabled");
        resetBtn.removeEventListener("click", reset);
        resetBtn.setAttribute("disabled", "");
    };

    const pause = () => {
        clearInterval(crono);
        startBtn.addEventListener("click", cronometrar);
        startBtn.removeAttribute("disabled");
        pauseBtn.removeEventListener("click", pause);
        pauseBtn.setAttribute("disabled", "");
        resetBtn.addEventListener("click", reset);
        resetBtn.removeAttribute("disabled");
    };

    const reset = () => {
        clearInterval(crono);
        escribir(1);
        startBtn.addEventListener("click", cronometrar);
        startBtn.removeAttribute("disabled");
        pauseBtn.removeEventListener("click", pause);
        pauseBtn.setAttribute("disabled", "");
        resetBtn.removeEventListener("click", reset);
        resetBtn.setAttribute("disabled", "");
    };

    startBtn.addEventListener("click", cronometrar);
});