$(document).ready(function(){
    logoutEventHandler();
});

function logoutEventHandler(){
    $(".btnLogout").click(function(){
       logout();
    });
}

function logout(){
    $.ajax({
       type: "POST",
        url: "../../Login/php/sessionController.php",
        data: {method: "logout"}
    })
        .done(function(response){
            location.reload();
        });
}