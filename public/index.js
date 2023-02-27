let submitButton = document.getElementById("submit-btn");

function userPage(){
    // window.location.href="/user";
    // requestServer("GET","/user");
    window.location.href= "/user";
}


function requestServer(method,url,callback,data){
    let request = new XMLHttpRequest;
    request.open(method,url);
    
    if(data != undefined){
        request.setRequestHeader("Content-Type","application/JSON");
        request.send(data);
    }else{
        request.send();
    }
}

submitButton.addEventListener("click",function(event){
    event.preventDefault();

    let userName = document.getElementById("userName").value.trim();
    let password = document.getElementById("pass").value.trim();
    
    if( userName == "" || password == "" ){
        alert("User or password is empty");
        return ;
    }

    // form.submit();
    let form = document.querySelector('form');
    let request = new XMLHttpRequest;
    let method = form.getAttribute("action");
    console.log(method);
    request.open("POST",method);
    let data = {"user":userName,"password":password};
    request.setRequestHeader("Content-Type","application/JSON");
    request.send(JSON.stringify(data));
    request.addEventListener("load",function(){
        console.log(request);
        if(request.status == 200){
            sessionStorage.setItem("user",request.responseText);
            window.location.href = '/user';
        }
        if(request.status == 302){
            window.location.href = '/user';
        }
    })
    
});

console.log("Hello");