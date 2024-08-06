document.addEventListener("DOMContentLoaded", function() {
    const formularioLogin = document.getElementById("login-form");
    const estadoLogin = document.getElementById("login-status");
    const entradaUsuario = document.getElementById("username");
    const entradaContraseña = document.getElementById("password");




    alert("En usuario escribir 'usuario1' y en contraseña 'contraseña1' para probar el logueo. Si no se escribe correctamente, no se podrá logearse.");



    async function validarUsuario(usuario, contraseña) {
        try {
            const respuesta = await fetch('./json/usuarios.json'); 
            const datos = await respuesta.text(); 
            const usuarios = JSON.parse(datos); 

            return usuarios.some(usuarioDatos => usuarioDatos.username === usuario && usuarioDatos.password === contraseña);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return false;
        }
    }


    document.getElementById("login").addEventListener("submit", async function(evento) {
        evento.preventDefault();
        
        const usuario = entradaUsuario.value;
        const contraseña = entradaContraseña.value;


        if (usuario && contraseña) {

            const usuarioValido = await validarUsuario(usuario, contraseña);

            if (usuarioValido) {
                
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("username", usuario); 

               
                alert("Inicio exitoso");
                window.location.href = "./pages/logueado.html";
            } else {
                estadoLogin.textContent = "Nombre de usuario o contraseña incorrectos.";
            }
        } else {
            estadoLogin.textContent = "Por favor, complete todos los campos.";
        }
    });
});
