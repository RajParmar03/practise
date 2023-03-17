// Write code related to Donators Page
let data = JSON.parse(localStorage.getItem("Helpers"));
let newData = data.filter((smallData) => {
    return smallData.type === "Donator";
});
appendData(newData);

function appendData(data){
    // console.log(data);
    let newData = data.filter((smallData) => {
        return smallData.type === "Donator";
    });
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    newData.map((elem) => {
        let newRow = document.createElement("tr");
        let name = document.createElement("td");
        name.innerText = elem.name;
        let phone = document.createElement("td");
        phone.innerText = elem.phone;
        let email = document.createElement("td");
        email.innerText = elem.email;
        let category = document.createElement("td");
        category.innerText = elem.category;
        let deleteTd = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click" , function(){
            deletefunction(elem);
        });
        deleteTd.append(deleteButton);
        newRow.append(name,phone,email,category,deleteTd);
        tbody.append(newRow);
    });
}

function deletefunction(elem){
    let data = JSON.parse(localStorage.getItem("Helpers"));
    let newData = data.filter((smallData) => {
        return smallData.email !== elem.email;
    });
    localStorage.setItem("Helpers", JSON.stringify(newData));
    appendData(newData);
}

function filterFunction(value){
    // console.log(value);
    let data = JSON.parse(localStorage.getItem("Helpers"));
    if(value === ""){
        let newData = data.filter((smallData) => {
            return smallData.type === "Donator";
        });
        appendData(newData);
    }else{
        let newData = data.filter((smallData) => {
            return smallData.type === "Donator" && smallData.category === value;
        });
        appendData(newData);
    }
}