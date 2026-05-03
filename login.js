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





// const tabContainer = document.getElementById("tab-container");
// const loadTab = async () => {
//     const res = await fetch(
//         "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications",
//     );
//     const data = await res.json();
//     data.data.forEach(element => {
//         console.log(element.status);
//         const btn=document.createElement("button");
//         btn.className = "btn btn-xs px-6";
//         btn.innerHTML=element.status;
//         tabContainer.appendChild(btn);
//     });
// };
// loadTab();




   // if (tab == "all") {
    // } else if (tab == "open") {
    //     const openLoad = async () => {
    //         const tabName = document.getElementById("tab-" + tab);
    //         const res = await fetch(
    //             "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    //         );
    //         const data = await res.json();

    //         //console.log(data);
    //         displayOpen(data);
    //     };
    //     openLoad();
    // } else {
    //     const tabName = document.getElementById("tab-" + tab);
    //     console.log(tabName);
    // }