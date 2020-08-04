const deleteActorForm = document.getElementById("delete-actor-form");
deleteActorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
        title: '¿Estás seguro de querer eliminar este/a actor/actriz?',
        text: "¡No podrás deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, ¡borrar!',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-primary'
        }
    })
        .then(result => {
            if (result.value) {
                Swal.fire(
                    '¡Borrado/a!',
                    'El/la actor/actriz se borró correctamente',
                    'success'
                );
                deleteActorForm.submit();
            }
        });
});