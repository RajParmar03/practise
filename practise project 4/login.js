async function login() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    let loginObj = {
        email, password
    }

    await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
    }).then((res) => {
        alert("successfully logged in...");
        window.location.href = "./admin.html";
    }).catch((err) => {
        console.log(err);
        alert("invalid credentials...");
    });

}