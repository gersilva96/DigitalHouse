const deleteMovieForm = document.getElementById("delete-movie-form");
deleteMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
        title: '¿Estás seguro de querer eliminarla?',
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
                    '¡Borrada!',
                    'La película se borró correctamente',
                    'success'
                );
                deleteMovieForm.submit();
            }
        });
});