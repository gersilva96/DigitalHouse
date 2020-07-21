window.addEventListener("load", () => {
    let form = document.querySelector(".contact-form");
    let groups = document.querySelectorAll(".form-group");

    let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let phoneRegex = new RegExp(/^[0-9]+$/);

    let fields = [];
    groups.forEach(group => {
        fields.push({
            input: group.querySelector(".form-control"),
            invalidFeedback: group.querySelector(".invalid-feedback")
        });
    });

    const check = (field) => {
        let errors = [];
        let password = fields[3].input.value;
        field.input.classList.remove("is-invalid");
        if (field.input.id == "email" && !emailRegex.test(field.input.value)) {
            errors.push({
                id: field.input.id,
                msg: "Ingresaste un email inválido"
            });
        }
        if (field.input.id == "phone" && !phoneRegex.test(field.input.value)) {
            errors.push({
                id: field.input.id,
                msg: "Ingresaste un teléfono inválido"
            });
        }
        if (field.input.id == "password" && field.input.value.length < 4) {
            errors.push({
                id: field.input.id,
                msg: "La contraseña no puede tener menos de 4 caracteres"
            });
        }
        if (field.input.id == "rePassword" && field.input.value != password) {
            errors.push({
                id: field.input.id,
                msg: "Las contraseñas no coinciden"
            });
        }
        if (field.input.value.length == 0) {
            errors.push({
                id: field.input.id,
                msg: "El campo no puede estar vacío"
            });
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                fields.forEach(field => {
                    if (error["id"] == field.input.id) {
                        field.input.classList.add("is-invalid");
                        field.invalidFeedback.innerHTML = error.msg;
                    }
                })
            });
            return false;
        } else {
            return true;
        }
    };

    fields.forEach(field => {
        field.input.addEventListener("focusout", () => {
            check(field);
        });
    });

    form.addEventListener("submit", e => {
        let errors = 0;
        fields.forEach(field => {
            if (!check(field)) {
                errors++;
            }
        });
        if (errors > 0) {
            e.preventDefault();
        } else {
            document.querySelector("h2").innerHTML = "Datos ingresados";
            form.style.display = "none";
            let ul = document.createElement("ul");
            fields.forEach(field => {
                if (field.input.id != "password" && field.input.id != "rePassword") {
                    ul.innerHTML += `<li>${field.input.id}: ${field.input.value}</li>`;
                }
            });
            document.querySelector(".col-md-8").appendChild(ul);
            let a = document.createElement("a");
            a.href = "/03-ValidacionesDeFormularios/formulario.html";
            let btn = document.createElement("button");
            btn.innerHTML = '<i class="fas fa-chevron-left"></i> Volver';
            btn.classList.add("btn");
            btn.classList.add("btn-primary");
            a.appendChild(btn);
            document.querySelector(".col-md-8").appendChild(a);
            e.preventDefault();
        }
    });
});