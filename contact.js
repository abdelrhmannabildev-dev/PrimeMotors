let name=document.getElementById("name");
let email=document.getElementById("email");
let inquiry=document.getElementById("inquiry");
let message=document.getElementById("message");
let submit=document.getElementById("submit");

if(name.value&&email.value&&inquiry.value&&message.value&&submit.value){
    submit.addEventListener("click",msg());
}
function msg(){
    alert("We eill contact you")
}