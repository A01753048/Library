console.log('Happy developing ✨')
console.log("Thanks!!!1")

let dialogElement = document.getElementById("dialog");

let cardsContainer = document.getElementById("cards-container");
let addBookBtn = document.getElementById("add-book-btn");

let modalForm = document.getElementById("modal-form");
let formTitle = document.getElementById("title");
let formAuthor = document.getElementById("author");
let formPages = document.getElementById("pages");
let formRead = document.getElementById("read");

let modalCancel = document.getElementById("modal-cancel");
let submitButton = document.getElementById("submit-btn");

const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Flopping constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "Already Read" : "Not Read Yet"}`;
}

function addBookToLibrary(title, author, pages, read)  {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    cardsContainer.innerHTML = "";
    for (let book of myLibrary) {
        cardsContainer.insertAdjacentHTML("beforeend", `
        <div class="card">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">by ${book.author}</p>
                    <div class="card-space"></div>
                    <p class="book-pages">${book.pages} ${(book.pages === "1") ? "page" : "pages"}</p>
                    <p class="read-book">${(book.read) ? "Read" : "Not yet Read"}</p>
                </div>
        `);
    }
}

function addBook() {

}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "Aldous Huxley", 360, false);
displayBooks();

addBookBtn.addEventListener("click", () => {
    dialogElement.showModal();
});

modalCancel.addEventListener("click", () => {
    dialogElement.close();
    modalForm.reset();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (modalForm.checkValidity()) {
        dialogElement.close([formTitle.value, formAuthor.value, formPages.value, formRead.checked]);
    }
});

dialogElement.addEventListener("close", () => {
    if (dialogElement.returnValue !== "") {
        console.log(dialogElement.returnValue);
        let bookData = dialogElement.returnValue.split(",");
        let bookTitle = bookData[0];
        let bookAuthor = bookData[1];
        let bookPages = bookData[2];
        let bookRead = bookData[3] === "true";
        addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
        displayBooks();
        modalForm.reset();
    }
});