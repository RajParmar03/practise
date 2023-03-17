// const url = "http://localhost:3000";
const url = "https://json-server-rp6r.onrender.com";

window.addEventListener("load" , getData().then((res) => displayBooks(res)));

async function getData(){
      return await fetch(`${url}/books`)
                        .then((res) => res.json())
                              .catch((err) => console.log(err));
}


function displayBooks(data){
    let newData = data.filter((elem) => {
        return elem.borrowed;
    });
    let mainTable = document.querySelector(".bookTable");
    mainTable.innerHTML = "<tr><th>Book Cover Image</th><th>Name of the book</th><th>Author of the book</th><th>Genre</th><th>Edition </th><th>Publisher</th><th>Cost</th></tr>";
    newData.map((elem) => {
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
          newRow.append(bookimage , name , author , genre ,edition, publisher , cost);
          mainTable.append(newRow);
    });
}