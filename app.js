// get items
const inputs = document.querySelectorAll("input");
const smbtBtn = document.querySelector(".btn-success");
const lstBooks = document.getElementById("books_list");

// data
const dateInpts = [];
const allBooks = [];

// class
class Book {
  constructor(title, authr, SN) {
    this.title = title;
    this.authr = authr;
    this.SN = SN;
  }
}

class UI {
  addBook() {
    allBooks.push(new Book(...dateInpts));
    console.log(allBooks);
  }
}
const ui = new UI();

// functions
function getDataInputs() {
  dateInpts.length = 0;

  inputs.forEach((input) => {
    dateInpts.push(input.value);
  });
}

// events
smbtBtn.addEventListener("click", getDataInputs);
