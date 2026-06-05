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

//Add a book to the library array 
function addBookToLibrary(title, author, pages, haveRead) {
  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  //add div of latest added book
  AddNewBookDiv(myLibrary[myLibrary.length-1]);
}

//populate the library with some basic books
function addInitialBooks(){
  addBookToLibrary("Bone: The Great Cow Race", "Jeff Smith", 132, true);
  addBookToLibrary("Lord of the Flies", "William Golding", 260, true);
  addBookToLibrary("1984", "George Orwell", 300, false);
  addBookToLibrary("Romeo and Juliet", "William Shakespeare ", 125, true);
  addBookToLibrary("The Martian", "Andy Weir", 448, false);
  console.table(myLibrary);
}


function AddNewBookDiv(newBook){
  // 1. Create the new div element
  const newBookDiv = document.createElement("div");
  newBookDiv.classList.add("book-div");

  //reference to book ID on div so you know which one to delete
  newBookDiv.dataset.bookId = `${newBook.bookId}`;

  const _bookTitle = document.createElement("p");
  _bookTitle.textContent = `${newBook.title}`;
  _bookTitle.classList.add("book-title");
  newBookDiv.appendChild(_bookTitle);

  const _bookAuthor = document.createElement("p");
  _bookAuthor.textContent = `${newBook.author}`;
  _bookAuthor.classList.add("book-author");
  newBookDiv.appendChild(_bookAuthor);

  const _bookPages = document.createElement("p");
  _bookPages.textContent = `${newBook.pages}`;
  _bookPages.classList.add("book-pages");
  newBookDiv.appendChild(_bookPages);

  const _haveRead = document.createElement("input");
  _haveRead.type = 'checkbox';
  _haveRead.id = `read-${newBook.title}`;
  _haveRead.checked = newBook.haveRead === true ? true: false;
  newBookDiv.appendChild(_haveRead);

  const _haveReadLabel = document.createElement("label");
  _haveReadLabel.textContent = "Have Read";
  _haveReadLabel.htmlFor = `read-${newBook.title}`
  newBookDiv.appendChild(_haveReadLabel);

  
  //Create Star Rating System
  
  const starRating = document.createElement("div");
  starRating.classList.add("rating");

  for (let i = 0; i < 5; i++) {
    
    const starInput = Object.assign(document.createElement("input"), {
      type: "radio",
      name: `rating-${newBook.bookId}`,
      id: `star-${i+1}-id-${newBook.bookId}`,
      value: (i+1)
    });
    starInput.classList.add("rating-radio");
    starRating.appendChild(starInput);
    
    const starLabel = document.createElement("label");
    starLabel.htmlFor = `star-${i+1}-id-${newBook.bookId}` ;
    const starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid", "fa-star");
    
    starLabel.appendChild(starIcon);
    starRating.appendChild(starLabel);
    
    
  }
  newBookDiv.appendChild(starRating);
  


  //Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => {
    //target parent of current button being pressed to delete it. 
    e.currentTarget.parentElement.dataset.bookId
    if(e.currentTarget.parentElement.dataset.bookId === `${newBook.bookId}`)
    {
      deleteBookFromLibrary(e.currentTarget.parentElement.dataset.bookId);
      e.currentTarget.parentElement.remove();
    }
  })
  newBookDiv.appendChild(deleteButton);

  // 3. Append it to an existing container (like the body)
  container.appendChild(newBookDiv);
}

//used to clean up the library when you delete a book from it
function deleteBookFromLibrary(_bookID){
  let index = -1;
  //find index of book you are trying to delete
  for(const _book of myLibrary){
    if(_book.bookId === _bookID){
      index = myLibrary.indexOf(_book);
      break;
    }
  }
  if (index > -1) { 
      myLibrary.splice(index, 1); //remove
  }
  console.table(myLibrary);
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
  const bookPages = +formData.get('pages-input'); //plus constructor to convert to a number
  
  let readData = formData.get('read-input');
  let haveRead = false;
  if(readData === "on"){
    haveRead = true;
  }

  addBookToLibrary(bookTitle, bookAuthor, bookPages, haveRead);
  console.table(myLibrary);

  bookDialog.close();
});


addInitialBooks();