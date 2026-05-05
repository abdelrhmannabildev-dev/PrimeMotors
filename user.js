const login=document.querySelector(".login");
const user=document.querySelector(".user");
const loggedInUser=JSON.parse(localStorage.getItem("loggedInUser"));
const navbar=document.querySelector(".navbar");
const logoutButton=document.getElementById("logout");
if(loggedInUser){
    login.style.display="none";
    user.style.display="block";
    user.textContent="Welcome "+loggedInUser.name;

}
else{
    login.style.display="block";
    user.style.display="none";
    logoutButton.style.display="none";
}
function logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
    logout.style.display="none";
}