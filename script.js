const myLibrary = [];
const container = document.querySelector(".library-section");


function Book(title, author, pages, haveRead) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.bookId = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, haveRead) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  //add div of latest added book
  AddNewBookDiv(myLibrary[myLibrary.length-1]);
}


addBookToLibrary("Bone: The Great Cow Race", "Jeff Smith", 132, true);
addBookToLibrary("Lord of the Flies", "William Golding", 260, true);
addBookToLibrary("1984", "George Orwell", 300, false);
addBookToLibrary("Romeo and Juliet", "William Shakespeare ", 125, true);
addBookToLibrary("The Martian", "Andy Weir", 448, false);
console.table(myLibrary);


// myLibrary.forEach(book => {
//   AddNewBookDiv(book);
// });

function AddNewBookDiv(newBook){
  // 1. Create the new div element
  const newBookDiv = document.createElement("div");
  // 2. Add content, classes, or IDs
  newBookDiv.textContent = `${newBook.title}`;
  newBookDiv.classList.add("book-div");

  // 3. Append it to an existing container (like the body)
  container.appendChild(newBookDiv);
}


const bookDialog = document.querySelector("#book-dialog");
const openButton = document.querySelector(".open-dialog-button");
const closeButton = document.querySelector(".close-dialog-button");
const submitButton = document.querySelector(".submit-book-button");

openButton.addEventListener("click", () => {
  bookDialog.showModal();
});
closeButton.addEventListener("click", () => {
  bookDialog.close();
});
// submitButton.addEventListener("click", (event) => {
//    event.preventDefault(); // We don't want to submit this fake form
//    bookDialog.close();
// });

// JavaScript Implementation
const form = document.querySelector('#book-form');

form.addEventListener("submit", (event) => {
  // 1. Prevent the default browser page reload
  event.preventDefault(); 
  
  // 2. Instantiate FormData by passing the form element
  const formData = new FormData(event.target); 
  
  // 4. Transform all inputs instantly into a clean JavaScript Object
  const allData = Object.fromEntries(formData); 
  console.log(allData); // { username: "...", email: "..." }

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const bookTitle = formData.get('title-input');
  const bookAuthor = formData.get('author-input');
  const bookPages = formData.get('pages-input');
  const haveRead = formData.get('read-input');

  addBookToLibrary(bookTitle, bookAuthor, bookPages, haveRead);
  console.table(myLibrary);

  bookDialog.close();
});

// const showButton = document.getElementById("showDialog");
// const favDialog = document.getElementById("favDialog");
// const outputBox = document.querySelector("output");
// const selectEl = favDialog.querySelector("select");
// const confirmBtn = favDialog.querySelector("#confirmBtn");

// // "Show the dialog" button opens the <dialog> modally
// showButton.addEventListener("click", () => {
//   favDialog.showModal();
// });

// // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
// favDialog.addEventListener("close", (e) => {
//   outputBox.value =
//     favDialog.returnValue === "default"
//       ? "No return value."
//       : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
// });

// // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
// confirmBtn.addEventListener("click", (event) => {
//   event.preventDefault(); // We don't want to submit this fake form
//   favDialog.close(selectEl.value); // Have to send the select box value here.
// });