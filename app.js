console.log("hello friend");

// seccion de inicio de sesion
const butIniciarSesion = document.getElementById("butIniciarSesion");

const emailInicioSesion = document.getElementById("emailInicioSesion");
const passwordInicioSesion = document.getElementById("passwordInicioSesion");

// seccion de registro de usuario
const butRegistrar = document.getElementById("butRegistrar");

const RegNombre = document.getElementById("RegNombre");
const RegEmail = document.getElementById("RegEmail");
const RegPassword1 = document.getElementById("RegPassword1");
const RegPassword2 = document.getElementById("RegPassword2");


//********************/

// funcion para validad que el email tenga un formato correcto

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }

    return (false)
}


function validarInicioSesion() {

    var correo = emailInicioSesion.value;
    var contrasena = passwordInicioSesion.value;
    $.ajax({
        //url: 'http://localhost:8080/api/user/' + correo + "/" + contrasena,
        url: 'http://129.151.118.163:8080/api/user/' + correo + "/" + contrasena,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.id == null) {
                alert("No existe usuario o contrasena es incorrecta")
                emailInicioSesion.value = "";
                passwordInicioSesion.value="";
            }
            else {
                alert("Bienvenido " + data.name);
                emailInicioSesion.value = "";
                passwordInicioSesion.value="";
            }

        },
        error: function () {
            console.log("no se pudo conectar");
            emailInicioSesion.value = "";
            passwordInicioSesion.value="";
        }
    })
}
//-----------------


function guardarNuevoUser(RegNombre, RegEmail, RegPassword1) {
    var data = {


        email: RegEmail,
        password: RegPassword1,
        name: RegNombre,
    };

    $.ajax({
        //url: 'http://localhost:8080/api/user/new',
        url: 'http://129.151.118.163:8080/api/user/new',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: {
            201: function (data) {
                alert("Cuenta creada de manera correcta")
               
                
            },
            415: function (data) {
                alert("No fue posible crear la cuenta");
            }
        }
    });


}



function validarButIniciarSesion() {



    if (emailInicioSesion.value == "" || passwordInicioSesion.value == "") {
        console.log("valores invalidos");
    }
    else if (ValidateEmail(emailInicioSesion.value) == false) {

        alert("Email es erroneo");
    }
    else {
        //ambos datos son correctos
        validarInicioSesion();
    }
}


//-----------

function validarButRegistrar() {
    console.log("test buton de registro ");


    if (RegNombre.value == "" || RegEmail.value == "" || RegPassword1.value == "" || RegPassword2.value == "") {
        console.log("Todos los valores son necesarios");
    }

    else if(RegNombre.value.length > 80){
        alert("Nombre no puede tener mas de 80 caracteres");
    }
    else if(RegEmail.value.length > 50){
        alert("E-mail no puede tener mas de 50 caracteres");
    }
    else if (RegPassword1.value != RegPassword2.value) {
        alert("Contraseñas deben coincidir");
    }
    else if(RegPassword1.value.length > 50){
        alert("Contaseña no puede tener mas de 50 caracteres");
    }
    else if (ValidateEmail(RegEmail.value) == false) {
        alert("Email es erroneo");
    }

    else {
        // todos los datos son correctos
        correo = RegEmail.value;
        $.ajax({
            //url: 'http://localhost:8080/api/user/' + correo,
            url: 'http://129.151.118.163:8080/api/user/' + correo,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data == true) {
                    // ya existe una cuenta con ese email
                    alert("No fue pssible crear la cuenta");
                }
                else {
                    // todo listo para guardar 
                     guardarNuevoUser(RegNombre.value, RegEmail.value, RegPassword1.value);
                     RegNombre.value = "";
                     RegEmail.value = "";
                     RegPassword1.value = "";
                     RegPassword2.value = "";
                }

            },
            error: function () {
                console.log("no se pudo conectar");
                RegNombre.value = "";
                RegEmail.value = "";
                RegPassword1.value = "";
                RegPassword2.value = "";
            }
        })
    }

}


//********************/

butIniciarSesion.addEventListener("click", () => validarButIniciarSesion());
butRegistrar.addEventListener("click", () => validarButRegistrar());
