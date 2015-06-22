$(document).ready(function(){
    loginEventHandler();
});

function loginEventHandler(){
    $(".btnLogin").click(function(){
        if (validateLogin()){
            login();
        }
    });
}

function validateLogin(){
    if (validateUsername() && validatePassword()) return true;
    return false;
}

function validateUsername(){
    if(!$("#loginForm input[name='username']").val()){
        showErrorMessage("Debe introducir un nombre de usuario.");
        return false;
    }
    return true;
}

function validatePassword(){
    if(!$("#loginForm input[name='password']").val()){
        showErrorMessage("Debe introducir una contraseña.");
        return false;
    }
    return true;
}

function showErrorMessage(errorMessage){
    console.log(errorMessage);
}

function login(username, password){

}
