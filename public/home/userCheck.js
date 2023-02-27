console.log("test");
window.addEventListener("load",function(){
    if(sessionStorage.getItem('user')!=undefined){
        let div = document.getElementById('logout-div');
        let logout = document.createElement("button");
        logout.innerText = 'LOGOUT';
        let userName = document.createElement("p");
        userName.setAttribute('id',"user");
        logout.setAttribute('id',"logout-button");
        userName.innerText = sessionStorage.getItem("user");
        logout.addEventListener("click",logoutPress);
        div.insertAdjacentElement('afterbegin',userName)
        div.insertAdjacentElement('beforeend',logout)

        let pDiv = document.getElementsByClassName('body')[0];
        console.log(pDiv);
        pDiv.appendChild(div);
        console.log(div);
    }
})

function logoutPress(){
    let request = new XMLHttpRequest;
    request.open('GET','/logout');
    request.send();
    sessionStorage.removeItem('user');
    document.getElementById('user').remove();
    document.getElementById('logout-button').remove();
}