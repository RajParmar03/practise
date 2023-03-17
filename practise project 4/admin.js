// const url = "http://localhost:3000";
const url = "https://json-server-rp6r.onrender.com";

document.querySelector(".createBookForm").addEventListener("submit",addBook);

async function addBook(e){
    e.preventDefault();
    // console.log("addbook is clicked");
    let bookObj = {
            image_url: document.querySelector(".bookImage").value,
            book_name: document.querySelector(".bookName").value,
            author: document.querySelector(".bookAuthor").value,
            genre: document.querySelector(".bookGenre").value,
            edition: document.querySelector(".bookEdition").value,
            publisher: document.querySelector(".bookPublisher").value,
            cost: document.querySelector(".bookCost").value,
            borrowed: false,
      }

      if(bookObj.image_url !== "" && bookObj.book_name !== "" && bookObj.author !== "" && bookObj.genre !== "" && bookObj.edition !== "" && bookObj.publisher !== "" && bookObj.cost !== ""){
            await fetch(`${url}/books` , {
                  method : "POST",
                  headers : {
                        "Content-Type" : "application/json",
                  },
                  body : JSON.stringify(bookObj)
            }).then((res) => {
                  alert("Successfully added the book...");
                  getData().then((res) => displayBooks(res))
            }).catch((err) => {
                  console.log(err);
                  alert("failed to add the book...");
            })
      }else{
            alert("please enter all the fields...");
      }
}

window.addEventListener("load" , getData().then((res) => displayBooks(res)));

async function getData(){
      return await fetch(`${url}/books`)
                        .then((res) => res.json())
                              .catch((err) => console.log(err));
} 

function displayBooks(data){
      // console.log(data);
      let mainTable = document.querySelector(".bookTable");
      mainTable.innerHTML = "<tr><th>Book Cover Image</th><th>Name of the book</th><th>Author of the book</th><th>Genre</th><th>Edition </th><th>Publisher</th><th>Cost</th><th>Edit</th><th>Delete</th></tr>";
      data.map((elem) => {
            let newRow = document.createElement("tr");
            let bookimage = document.createElement("td");
            let bookimg = document.createElement("img");
            bookimg.src = elem.image_url;
            bookimage.append(bookimg);
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
            let editButton = document.createElement("button");
            editButton.innerText = "EDIT";
            editButton.addEventListener("click" , function() { 
                  openModal(elem);
            });
            edit.append(editButton);
            let deleteTD = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "DELETE";
            deleteButton.addEventListener("click" , function() { 
                  deleteFunction(elem);
            });
            deleteTD.append(deleteButton);
            newRow.append(bookimage , name , author , genre ,edition, publisher , cost , edit , deleteTD);
            mainTable.append(newRow);
      });
}


function openModal(elem){
      let modal = document.querySelector(".modal");
      modal.classList.add("activeModal");
      document.querySelector(".transparent").classList.add("activeTransparent");
      let idBox = document.querySelector(".idBox");
      idBox.innerHTML = "";
      let id = document.createElement("p");
      id.setAttribute("class" , "id");
      id.innerText = elem.id;
      idBox.append(id);
}

document.querySelector(".transparent").addEventListener("click" , closeModal);




function closeModal(){
      let modal = document.querySelector(".modal");
      modal.classList.remove("activeModal");
      document.querySelector(".transparent").classList.remove("activeTransparent");
}

document.querySelector(".createBookFormModal").addEventListener("submit" , editFunction);

async function editFunction(e){
      e.preventDefault();
      let id = document.querySelector(".id").innerText;


      let bookObj = {
            image_url: document.querySelector(".bookImageModal").value,
            book_name: document.querySelector(".bookNameModal").value,
            author: document.querySelector(".bookAuthorModal").value,
            genre: document.querySelector(".bookGenreModal").value,
            edition: document.querySelector(".bookEditionModal").value,
            publisher: document.querySelector(".bookPublisherModal").value,
            cost: document.querySelector(".bookCostModal").value,
      }

      let newObj = {};
      for(let i in bookObj){
            if(bookObj[i] !== ""){
                  newObj[i] = bookObj[i];
            }
      }
      // console.log(newObj);
      await fetch(`${url}/books/${id}` , {
            method : "PATCH",
            headers : {
                  "Content-Type" : "application/json",
            },
            body : JSON.stringify(newObj)
      }).then((res) => {
            alert("successfully updated the file...");
            closeModal();
            getData().then((res) => displayBooks(res))
      }).catch((err) => {
            console.log(err);
            alert("failed to update the file...");
      });


}



async function deleteFunction(elem){
      // console.log("delete function is called" , elem);
      await fetch(`${url}/books/${elem.id}`,{
            method : "DELETE",
      }).then((res) => {
            alert("successfully deleted the file...");
            getData().then((res) => displayBooks(res))
      }).catch((err) => {
            console.log(err);
            alert("failed to delete the file...");
      });
}