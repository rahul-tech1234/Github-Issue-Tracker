document.getElementById("login-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const userName = document.getElementById("user-name");
    const userNameValue = userName.value;
    const userPassword = document.getElementById("password");
    const userPasswordValue = userPassword.value;
    if (userNameValue == "admin" && userPasswordValue == "admin123") {
        alert("Login Successsfull");
        window.location.assign("pages/issue.html");
    } else {
        alert("Please Enter Valid Password");
    }
});
