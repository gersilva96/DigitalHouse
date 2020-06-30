window.onload = () => {
    let confirma = confirm("¿Querés iniciar el proceso?");
    if (confirma) {     //Si el usuario confirma se inicia el proceso
        //Inicio la cantidad de integrantes como indefinido
        let cantidadIntegrantes = undefined;

        do {    //Verifica que el campo no esté vacío, que sea un número y que sea mayor o igual a 3
            if (cantidadIntegrantes == undefined) {
                cantidadIntegrantes = prompt("Ingrese la cantidad de integrantes de la familia (mayor o igual a 3):");
            }
            if (cantidadIntegrantes.length == 0) {
                cantidadIntegrantes = prompt("El campo no puede estar vacío.\nIngrese la cantidad de integrantes de la familia (mayor o igual a 3):");
            }
            if (isNaN(cantidadIntegrantes)) {
                cantidadIntegrantes = prompt("El dato ingresado no es un número.\nIngrese la cantidad de integrantes de la familia (mayor o igual a 3):");
            }
            if (cantidadIntegrantes.length > 0 && cantidadIntegrantes < 3) {
                cantidadIntegrantes = prompt("Ingresó un número menor a 3.\nIngrese la cantidad de integrantes de la familia (mayor o igual a 3):");
            }
        } while (cantidadIntegrantes == undefined || cantidadIntegrantes.length == 0 || isNaN(cantidadIntegrantes) || cantidadIntegrantes < 3)

        //Una vez que valido la cantidad de integrantes, continúo
        let integrantes = [];
        let nombreTemp = undefined;
        let gastosTemp = undefined;

        for (let i = 1; i <= cantidadIntegrantes; i++) {       //Lleno el array con los datos de los integrantes de la familia

            do {    //Verifica que el campo nombre no esté vacío
                if (nombreTemp == undefined) {
                    nombreTemp = prompt(`Nombre del ${i}° integrante:`);
                }
                if (nombreTemp.length == 0) {
                    nombreTemp = prompt(`El nombre no puede estar vacío.\nNombre del ${i}° integrante:`);
                }
            } while (nombreTemp == undefined || nombreTemp.length == 0)

            do {    //Verifica que el campo gastos no esté vacío y sea un número
                if (gastosTemp == undefined) {
                    gastosTemp = prompt(`Gastos del día de ${nombreTemp}:`);
                }
                if (gastosTemp.length == 0) {
                    gastosTemp = prompt(`El gasto no puede estar vacío.\nGastos del día de ${nombreTemp}:`);
                }
                if (isNaN(gastosTemp)) {
                    gastosTemp = prompt(`El dato ingresado no es un número.\nGastos del día de ${nombreTemp}:`);
                }
            } while (gastosTemp == undefined || gastosTemp.length == 0 || isNaN(gastosTemp))

            //Si paso las validaciones de nombre y gastos, agrego el objeto al array
            integrantes.push({
                nombre: nombreTemp,
                gastos: parseFloat(gastosTemp)
            });

            //Reinicio los valores temporales para poder validar los siguientes
            nombreTemp = undefined;
            gastosTemp = undefined;
        }

        //Una vez llenado el array, sigo

        //Creo un nuevo elemento ul, le añado los datos de los gastos de los integrantes y lo añado al body
        let ul = document.createElement("ul");
        integrantes.forEach(integrante => {
            ul.innerHTML += `<li>Gastos de ${integrante.nombre}: $${integrante.gastos}</li>`;
        });
        document.body.appendChild(ul);

        //Creo un nuevo elemento p, le añado el total de los gastos de la familia y lo añado al body
        let total = document.createElement("p");
        let gastosArray = integrantes.map(elem => elem.gastos);
        let totalGastos = gastosArray.reduce((acum,act) => acum + act);
        total.innerHTML = `Total de gastos de la familia: $${totalGastos}`;
        document.body.appendChild(total);

        //Creo un nuevo elemento ul, le añado los datos del mímino gasto y máximo gasto y lo añado al body
        let integrantesOrdenado = integrantes.sort((a,b) => a.gastos - b.gastos);     //Devuelvo un array de los gastos ordenados de menor a mayor
        let ulMinMax = document.createElement("ul");
        ulMinMax.innerHTML += `<li>El menor gasto fue de $${integrantesOrdenado[0].gastos} y lo realizó ${integrantesOrdenado[0].nombre}</li>`;
        ulMinMax.innerHTML += `<li>El menor gasto fue de $${integrantesOrdenado[integrantesOrdenado.length-1].gastos} y lo realizó ${integrantesOrdenado[integrantesOrdenado.length-1].nombre}</li>`;
        document.body.appendChild(ulMinMax);

        //Muestro el array de integrantes por consola
        console.log(integrantes);

    } else {    //Si no confirma se agradece y se redirige a Netflix
        alert("Gracias por haber venido");
        window.location = "https://netflix.com";
    }
}