const myLibrary = [];

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
}


addBookToLibrary("Bone: The Great Cow Race", "Jeff Smith", 132, true);
addBookToLibrary("Lord of the Flies", "William Golding", 260, true);
addBookToLibrary("1984", "George Orwell", 300, false);
addBookToLibrary("Romeo and Juliet", "William Shakespeare ", 125, true);
addBookToLibrary("The Martian", "Andy Weir", 448, false);
console.table(myLibrary);

const container = document.querySelector(".library-section");

myLibrary.forEach(book => {
   // 1. Create the new div element
  const newBookDiv = document.createElement("div");
  // 2. Add content, classes, or IDs
  newBookDiv.textContent = `${book.title}`;
  newBookDiv.classList.add("book-div");

  // 3. Append it to an existing container (like the body)
  container.appendChild(newBookDiv);
});