// get items
const inputs = document.querySelectorAll("input");
const smbtBtn = document.querySelector(".btn-success");

// events
smbtBtn.addEventListener("click", getDataInputs);

// - Book (Cоздание сущности Книги (Заголовок, Автор, Серийный номер))
class Book {
  constructor(title, authr, SN) {
    this.title = title;
    this.authr = authr;
    this.SN = SN;
  }
}

const harry = new Book();

// functions
function getDataInputs() {
  inputs.forEach((input) => {
    input.value;
  });
}
