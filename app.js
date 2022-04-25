// get items
const inputs = document.querySelectorAll("input");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const sn = document.querySelector("#num");
const smbtBtn = document.querySelector(".btn-success");
const table = document.querySelector(".table");
const alertSucc = document.querySelector(".success");
const alertErr = document.querySelector(".danger");

// data
const books = [];

// class
// - Book (Cоздание сущности Книги (Заголовок, Автор, Серийный номер))
class Book {
  constructor() {
    this.title = title.value;
    this.author = author.value;
    this.sn = sn.value;
  }
}

// - UI (Отображение всего списка книг, Добавление книги, Удаление книги, Показ информационного сообщения)
class UI {
  // status;

  dsplCurrentList() {
    const crntTBody = document.querySelector(".books_list");

    if (crntTBody) {
      crntTBody.remove();
    }

    const tblBody = table.createTBody();
    tblBody.classList.add("books_list");

    books.forEach((book, ind) => {
      const num = ++ind;
      const newRow = tblBody.insertRow(0);
      newRow.innerHTML = `<th scope="row">${num}</th>
                            <td>${book[0]}</td>
                            <td>${book[1]}</td>
                            <td>
                              @${book[2]}
                              <button
                              type="button"
                              class="btn-close btn-outline-danger"
                              aria-label="Close"
                            ></button>
                          </td>`;
      const clsBtn = document.querySelector(".btn-close");

      this.addEventForClsBtn(clsBtn, ind);
    });
  }

  addEventForClsBtn(btn, id) {
    btn.addEventListener("click", () => {
      this.remBookFromArray(--id);
      store.sendToLocal();
      this.dsplCurrentList(true);
    });
  }

  addBookInArray(instance) {
    if (Array.isArray(instance)) {
      instance.forEach((book) => {
        books.push(book);
      });
    } else {
      books.push(Object.values(instance));
    }
  }

  remBookFromArray(id) {
    books.splice(id, 1);
  }

  dsplAlertMsg(status) {
    if (status) {
      alertErr.classList.add("hides");
      alertSucc.classList.remove("hides");
      setTimeout(() => alertSucc.classList.add("hides"), 3000);
    } else {
      alertSucc.classList.add("hides");
      alertErr.classList.remove("hides");
      setTimeout(() => alertErr.classList.add("hides"), 3000);
    }
  }

  checkDataValid() {
    const values = [];

    inputs.forEach((inp) => {
      values.push(inp.value);
    });

    const res = values.find((val) => val === "");

    if (res === "") {
      return false;
    } else {
      return true;
    }
  }
}
// - Store (Получить весь список книг из хранилища, Добавление/Удаление записи о книге из хранилища)
class Store {
  sendToLocal() {
    localStorage.setItem("book", JSON.stringify(books));
  }

  getFromLocal() {
    return JSON.parse(localStorage.getItem("book"));
  }
}

const ui = new UI();
const store = new Store();

// events
smbtBtn.addEventListener("click", () => {
  const status = ui.checkDataValid();

  if (status) {
    const book = new Book();
    ui.dsplAlertMsg(status);
    ui.addBookInArray(book);
    store.sendToLocal();
    ui.dsplCurrentList();
  } else {
    ui.dsplAlertMsg(status);
  }
});

//load page
const initialList = store.getFromLocal();

if (initialList.length) {
  ui.addBookInArray(initialList);
  ui.dsplCurrentList();
}
