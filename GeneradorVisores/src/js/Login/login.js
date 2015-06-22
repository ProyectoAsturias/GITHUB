$(document).ready(function(){
    loginEventHandler();
});

function loginEventHandler(){
    $(".btnLogin").click(function(){
        if (validateLogin()){
            login($("#loginForm input[name='username']").val(), $("#loginForm input[name='password']").val());
        }
    });

    $(".btnLogout").click(function(){
       logout();
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
    $("#loginAlert p").html(errorMessage);
    $("#loginAlert").slideDown(500);
    setTimeout(function(){
        $("#loginAlert").slideUp(500);
    }, 3000);
}

function login(username, password){
    $.ajax({
        type: "POST",
        url: "sessionController.php",
        data: {method: "login", username: username, password: password}
    })
        .done(function(response){

        })
        .fail(function(response){
            showErrorMessage(response.responseText);
        });
}

function logout(){
    $.ajax({
       type: "POST",
        url: "sessionController.php",
        data: {method: "logout"}
    })
        .done(function(response){
            console.log(response);
        });
}
