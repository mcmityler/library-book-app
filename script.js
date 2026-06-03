const myLibrary = []

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

console.log(myLibrary[0]);
addBookToLibrary("Bone: The Great Cow Race", "Jeff Smith", 132, true)
console.log(myLibrary[0]);