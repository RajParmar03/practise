// const url = "http://localhost:3000";
const url = "https://json-server-rp6r.onrender.com";

window.addEventListener("load", getData().then((res) => displayBooks(res)));

async function getData() {
    return await fetch(`${url}/books`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

function displayBooks(data) {
    console.log(data);
    let mainContainer = document.querySelector(".mainContainer");
    mainContainer.innerHTML = "";
    data.map((elem) => {
        let newCard = document.createElement("div");
        let imageBox = document.createElement("div");
        let bookimg = document.createElement("img");
        bookimg.src = elem.image_url;
        imageBox.append(bookimg);
        let details = document.createElement("div");
        let name = document.createElement("p");
        name.innerText = elem.book_name;
        let author = document.createElement("p");
        author.innerText = `Author : ${elem.author}`;
        let genre = document.createElement("p");
        genre.innerText = `Genre : ${elem.genre}`;
        let edition = document.createElement("p");
        edition.innerText = `Edition : ${elem.edition}`;
        let publisher = document.createElement("p");
        publisher.innerText = `Publisher : ${elem.publisher}`;
        let cost = document.createElement("p");
        cost.innerText = `Cost : ${elem.cost}`;
        let borrowButton = document.createElement("button");
        borrowButton.innerText = "Borrow";
        borrowButton.addEventListener("click", function () {
            openModal(elem);
        });
        details.append(name, author, genre, edition, publisher, cost, borrowButton);
        newCard.append(imageBox, details);
        mainContainer.append(newCard);
    });
}

async function borrowFunction(elem) {
    // console.log(elem);
    await fetch(`${url}/books/${elem.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ borrowed: true }),
    }).then((res) => {
        alert("successfully borrowed the file...");
        window.location.href = "./borrow.html";
    }).catch((err) => {
        console.log(err);
        alert("failed to borrow the file...");
    });
}

function openModal(elem) {
    let modal = document.querySelector(".modal");
    modal.classList.add("activeModal");
    document.querySelector(".transparent").classList.add("activeTransparent");
    document.querySelector(".modal").innerHTML = "";
    let imageBox = document.createElement("div");
    let bookimg = document.createElement("img");
    bookimg.src = elem.image_url;
    imageBox.append(bookimg);
    let details = document.createElement("div");
    let name = document.createElement("p");
    name.innerText = elem.book_name;
    let author = document.createElement("p");
    author.innerText = elem.author;
    let edition = document.createElement("p");
    edition.innerText = `${elem.edition} Edition`;
    let date = document.createElement("p");
    date.innerText = `Date of Borrow : ${"03/10/1997"}`;
    let cost = document.createElement("p");
    cost.innerText = `Total Cost : ${elem.cost}`;
    let closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", function () {
        closeModal();
    });
    let confirmButton = document.createElement("button");
    confirmButton.innerText = "Confirm";
    confirmButton.addEventListener("click", function () {
        borrowFunction(elem);
    });
    details.append(name, author, edition, date, cost, closeButton, confirmButton);
    modal.append(imageBox, details);
}

document.querySelector(".transparent").addEventListener("click", closeModal);

function closeModal() {
    document.querySelector(".modal").classList.remove("activeModal");
    document.querySelector(".transparent").classList.remove("activeTransparent");
}

function filterFunction(value) {
    // console.log(value);

    if (value === "") {
        getData().then((res) => {
            displayBooks(res);
        }).catch((err) => {
            console.log(err);
            alert("failed to get data...");
        });
    } else {
        getData().then((res) => {
            let newData = res.filter((elem) => {
                return elem.genre === value;
            });
            displayBooks(newData);
        }).catch((err) => {
            console.log(err);
            alert("failed to get data...");
        });
    }
}

function sortFunction(value) {
    // console.log(value);
    // let data = getData();
    // console.log(data);
    if (value === "LTH") {
        getData().then((res) => {
            let newRes = res.sort((a, b) => a.cost - b.cost);
            displayBooks(newRes);
        }).catch((err) => {
            console.log(err);
            alert("failed to get data...");
        });
    } else if (value === "HTL") {
        getData().then((res) => {
            let newRes = res.sort((a, b) => b.cost - a.cost);
            displayBooks(newRes);
        }).catch((err) => {
            console.log(err);
            alert("failed to get data...");
        });
    } else {
        getData().then((res) => {
            displayBooks(res);
        }).catch((err) => {
            console.log(err);
            alert("failed to get data...");
        });
    }
}