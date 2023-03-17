// Write code related to Home Page
document.querySelector("form").addEventListener("submit", sumbitFormFunction);

function sumbitFormFunction(e) {
    e.preventDefault();
    // console.log(" in the submitform function");
    let name = document.querySelector("#name").value;
    let phone = document.querySelector("#phone").value;
    let email = document.querySelector("#email").value;
    let category = document.querySelector("#category").value;
    let type = document.querySelector("#type").value;

    if (name && phone && email && category && type) {
        let helperObject = {
            name, phone, email, category, type
        }
        let data = JSON.parse(localStorage.getItem("Helpers"));
        if (data === null) {
            localStorage.setItem("Helpers", JSON.stringify([helperObject]));
        } else {
            let newData = [...data, helperObject];
            localStorage.setItem("Helpers", JSON.stringify(newData));
        }
        document.querySelector("#name").value = "";
        document.querySelector("#phone").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#category").value = "";
        document.querySelector("#type").value = "";
    } else {
        alert("please enter all the info...");
    }
}