document.querySelector("form").addEventListener("submit", addBookFunction);


async function addBookFunction(event) {
    event.preventDefault();
    // console.log("button clicked");
    let image_url = document.querySelector(".bookImage").value;
    let book_name = document.querySelector(".bookName").value;
    let author = document.querySelector(".bookAuther").value;
    let genre = document.querySelector(".bookGenre").value;
    let edition = document.querySelector(".bookEdition").value;
    let publisher = document.querySelector(".bookPublisher").value;
    let cost = document.querySelector(".bookCost").value;
    let borrowed = false;

    let bookObject = {
        image_url, book_name, author, genre, edition, publisher, cost, borrowed
    }
    console.log(bookObject);
    if (image_url && book_name && author && genre && edition && publisher && cost) {

        await fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(bookObject)
        }).then((res) => {
            alert("successfully added the book in the server...");
        }).catch((err) => {
            console.log(err);
            alert("failed in uploading the book details...");
        });
    } else {
        alert("please enter all the fields...")
    }
}

window.addEventListener("load", getData().then((res) => appendData(res)));

async function getData() {
    return await fetch("http://localhost:3000/books").then((res) => res.json());
}

function appendData(data) {
    console.log(data);
    let mainContainer = document.querySelector(".bookList");
    let mainTable = document.querySelector(".bookTable");
    mainTable.innerHTML = "";
    mainTable.innerHTML = "<tr><th>Book Cover Image</th><th>Name of the book</th><th>Author of the book</th><th>Genre</th><th>Edition</th><th>Publisher</th><th>Cost</th><th>Edit</th><th>Delete</th></tr>";
    data.map((elem) => {
        let newRow = document.createElement("tr");
        let image = document.createElement("td");
        let image_url = document.createElement("img");
        image_url.src = elem.image_url;
        image.append(image_url);
        let name = document.createElement("td");
        name.innerText = elem.book_name;
        let author = document.createElement("td");
        author.innerText = elem.author;
        let genre = document.createElement("td");
        genre.innerText = elem.genre;
        let edition = document.createElement("td");
        edition.innerText = elem.edition;
        let publisher = document.createElement("td");
        publisher.innerText = elem.publisher;
        let cost = document.createElement("td");
        cost.innerText = elem.cost;
        let edit = document.createElement("td");
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit"
        editBtn.addEventListener("click", function () {
            openModal(elem);
        });
        edit.append(editBtn);
        let delet = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", function () {
            deleteFunction(elem);
        });
        delet.append(deleteBtn);
        newRow.append(image, name, author, genre, edition, publisher, cost, edit, delet);
        mainTable.append(newRow);
    });
}


async function deleteFunction(elem) {
    await fetch(`http://localhost:3000/books/${elem.id}`, { method: "DELETE" }).then((res) => {
        alert("successfully deleted");
        getData().then((res) => appendData(res));
    }).catch((err) => {
        console.log(err);
    });
}

function openModal(elem) {
    let modal = document.querySelector(".modal");
    modal.classList.add("activeModal");
    document.querySelector(".transparent").classList.add(".activeTransparent");
    let idBox = document.querySelector(".idBox");
    let id = document.createElement("p");
    id.setAttribute("class", "id");
    id.innerText = elem.id;
    idBox.append(id);
    document.querySelector(".bookImageModal").value = elem.image_url;
    document.querySelector(".bookNameModal").value = elem.book_name;
    document.querySelector(".bookAutherModal").value = elem.author;
    document.querySelector(".bookGenreModal").value = elem.genre;
    document.querySelector(".bookEditionModal").value = elem.edition;
    document.querySelector(".bookPublisherModal").value = elem.publisher;
    document.querySelector(".bookCostModal").value = elem.cost;
}

document.querySelector(".submitBtn").addEventListener("click", editFunction);

async function editFunction() {
    let id = document.querySelector(".id").innerText;
    let image_url = document.querySelector(".bookImage").value;
    let book_name = document.querySelector(".bookName").value;
    let author = document.querySelector(".bookAuther").value;
    let genre = document.querySelector(".bookGenre").value;
    let edition = document.querySelector(".bookEdition").value;
    let publisher = document.querySelector(".bookPublisher").value;
    let cost = document.querySelector(".bookCost").value;

    let bookObject = {
        id , image_url, book_name, author, genre, edition, publisher, cost
    }
    console.log(bookObject);

    // await fetch(`http://localhost:3000/books/${id}` , {
    //     method: "PATCH",
    //     headers : {
    //         "content-type" : "application/json",
    //     },
    //     body : JSON.stringify(bookObject)
    // }).then((res) => {
    //     alert("successfully update the book data...");
    //     getData().then((res) => appendData(res));
    // }).catch((err) => {
    //     console.log(err);
    // })

}


// [
//     {
//       "image_url": "https://m.media-amazon.com/images/I/5165He67NEL.jpg",
//       "book_name": "Harry Potter and the Philosopher's Stone",
//       "author": "J. K. Rowling",
//           "genre": "fiction",
//           "edition": "2021",
//           "publisher": "Bloomsbury",
//           "cost": 1299,
//           "borrowed": false,
//     }
//   ]