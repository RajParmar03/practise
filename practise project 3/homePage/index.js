document.querySelector("form").addEventListener("submit" , loginFunction);
async function loginFunction(event){
    event.preventDefault();
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    let loginObj = {
        email, password
    }
    console.log(JSON.stringify(loginObj));

    await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
    }).then((res) => {
        console.log("success");
        window.location.href = "../admin/admin.html";
    }).catch((err) => {
        console.log(err);
        alert("wrong credentials");
    });

}