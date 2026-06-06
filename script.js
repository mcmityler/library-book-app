const allBooks = [];
const bookContainer = document.querySelector(".book-shelf");
const bookDialog = document.querySelector("#new-book-dialog");
const addBookButton = document.querySelector(".add-book-button");
const closeButton = document.querySelector(".close-dialog-button");
const submitButton = document.querySelector(".submit-book-button");
const form = document.querySelector('#new-book-form');

//Book constructor 
function Book(title, author, pages, cover, haveRead, rating) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover;
    this.haveRead = haveRead;
    this.rating = rating;
    this.bookId = crypto.randomUUID();
}

//Add a book to the library array 
function addBookToLibrary(title, author, pages, cover, haveRead, rating) {

  // take params, create a book then store it in the array
  let newBook = new Book(title, author, pages, cover, haveRead, rating);
  allBooks.push(newBook);

  //add div of latest added book
  AddNewBookDiv(allBooks[allBooks.length-1]);
}


function AddNewBookDiv(newBook){

  //Container for each book contents.
  const newBookDiv = document.createElement("div");
  newBookDiv.classList.add("book-div");
  //reference to book ID on div so you know which one to delete
  newBookDiv.dataset.bookId = `id_${newBook.bookId}`;


  const _bookTitle = document.createElement("p");
  _bookTitle.textContent = newBook.title;
  _bookTitle.classList.add("book-title", "span-entire");
  newBookDiv.appendChild(_bookTitle);

  const _bookCover = document.createElement("img");
  _bookCover.setAttribute('src', newBook.cover);
  _bookCover.classList.add("book-cover", "span-entire");
  //if a book cover src doesn't load go to default cover
  _bookCover.onerror = function(){ 
    _bookCover.src = './images/default-book-cover.jpg';
  };
  newBookDiv.appendChild(_bookCover);


  const _bookAuthor = document.createElement("p");
  _bookAuthor.textContent = `by: ${newBook.author}`;
  _bookAuthor.classList.add("book-author", "span-entire");
  newBookDiv.appendChild(_bookAuthor);

  const _bookPages = document.createElement("p");
  _bookPages.textContent = `Pages: ${newBook.pages}`;
  _bookPages.classList.add("book-pages", "span-entire");
  newBookDiv.appendChild(_bookPages);

  const _isRead = document.createElement("input");
  _isRead.type = 'checkbox';
  _isRead.id = `read-${newBook.title}`;
  _isRead.checked = newBook.haveRead === true ? true: false;
  _isRead.classList.add( (newBook.haveRead === true) ? "is-read": "not-read");
  _isRead.classList.add("isRead-checkbox");
  
  _isRead.addEventListener("change", updateIsRead); //to update table when you change reading status
  newBookDiv.appendChild(_isRead);

  const _isReadLabel = document.createElement("label");
  _isReadLabel.textContent = "Have Read";
  _isReadLabel.htmlFor = `read-${newBook.title}`
  _isReadLabel.classList.add("isRead-label");
  newBookDiv.appendChild(_isReadLabel);

  //Create Star Rating System
  const starRating = document.createElement("div");
  starRating.classList.add("rating", "span-entire");

  for (let i = 0; i < 5; i++) {
    
    const starInput = Object.assign(document.createElement("input"), {
      type: "radio",
      name: `rating-${newBook.bookId}`,
      id: `star-${i+1}-id-${newBook.bookId}`,
      value: (i+1)
    });
    starInput.checked = (+newBook.rating === i+1)? true : false;
    starInput.classList.add("rating-radio");
    starInput.addEventListener("change", updateRating)
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
  deleteButton.classList.add("delete-button", "span-entire");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (event) => {
    //target parent of current button being pressed to delete it. 
    if(event.currentTarget.parentElement.dataset.bookId === `id_${newBook.bookId}`)
    {
      deleteBookFromLibrary(event.currentTarget.parentElement.dataset.bookId);
      event.currentTarget.parentElement.remove();
    }
  })
  newBookDiv.appendChild(deleteButton);

  //add new book to the actual book container html 
  bookContainer.appendChild(newBookDiv);
}

//used to clean up the library when you delete a book from it
function deleteBookFromLibrary(_bookID){
  let index = -1;
  //find index of book you are trying to delete
  for(const _book of allBooks){
    if(_book.bookId === _bookID){
      index = allBooks.indexOf(_book);
      break;
    }
  }
  if (index > -1) { 
      allBooks.splice(index, 1); //remove
  }
  else{
    console.log(`Book id: ${_bookID} could not be found`);
  }
  console.table(allBooks);
}

//called when you submit new book form 
function submitNewBook(event){
  // 1. Prevent the default browser page reload
  event.preventDefault(); 
  
  // 2. Instantiate FormData by passing the form element
  const formData = new FormData(event.target); 
  
  //Not needed
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const bookTitle = formData.get('title-input');
  const bookCover = formData.get('cover-input');
  const bookAuthor = formData.get('author-input');
  const bookPages = +formData.get('pages-input'); //plus constructor to convert to a number
  
  let readData = formData.get('read-input');
  let haveRead = false;
  if(readData === "on"){
    haveRead = true;
  }

  let bookRating = +formData.get('rating');

  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookCover, haveRead, bookRating);
  console.table(allBooks);

  bookDialog.close();

  form.reset(); //clear form inputs
}
//to update allBook array when read status changes
function updateIsRead(event){
  
  let index = -1;
  //find index of book you are trying to delete
  for(const _book of allBooks){
    if(event.currentTarget.parentElement.dataset.bookId === `id_${_book.bookId}`){
      index = allBooks.indexOf(_book);
      break;
    }
  }
  if (index > -1) { 
      allBooks[index].haveRead = event.currentTarget.checked;
      if (event.currentTarget.checked){
        event.currentTarget.classList.add("is-read");
        event.currentTarget.classList.remove("not-read");

      }
      else{
        event.currentTarget.classList.add("not-read");
        event.currentTarget.classList.remove("is-read");
      }
  }
  else{
    console.log(`Book id: ${event.currentTarget.parentElement.dataset.bookId} could not be found`);
  }
  console.table(allBooks);

}

//to update allBook array when rating changes
function updateRating(event){
  let index = -1;
  //find index of book you are trying to delete
  for(const _book of allBooks){
    if(event.currentTarget.parentElement.parentElement.dataset.bookId === `id_${_book.bookId}`){
      index = allBooks.indexOf(_book);
      break;
    }
  }
  if (index > -1) { 
      allBooks[index].rating = +event.currentTarget.value;
  }
  else{
    console.log(`Book id: ${event.currentTarget.parentElement.parentElement.dataset.bookId} could not be found`);
  }
  console.table(allBooks);
}


addBookButton.addEventListener("click", () => {
  bookDialog.showModal();
});
closeButton.addEventListener("click", () => {
  bookDialog.close();
});

form.addEventListener("submit", submitNewBook);



//populate the library with some basic books
function addInitialBooks(){
  addBookToLibrary("Bone: The Great Cow Race", "Jeff Smith", 132, "./images/bone-cow-race.jpg", true, 5);
  addBookToLibrary("Lord of the Flies", "William Golding", 260, "./images/lord-of-the-flies-cover.jpg", true, 2);
  addBookToLibrary("1984", "George Orwell", 300, "./images/1984-cover.jpg", false, 4);
  addBookToLibrary("Romeo and Juliet", "William Shakespeare ", 125, "./images/romeo-juliet-cover.jpg", true, 3);
  addBookToLibrary("The Martian", "Andy Weir", 448, "./images/martian-cover.jpg", false, 5);
  console.table(allBooks);
}

addInitialBooks();