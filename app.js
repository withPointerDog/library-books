// get items
const form = document.querySelector("#main > form");
const inputs = document.querySelectorAll("input");
const smbtBtn = document.querySelector(".btn-success");

const table = document.querySelector(".table");
const alertSucc = document.querySelector(".success");
const alertErr = document.querySelector(".danger");

// - Book (Cоздание сущности Книги (Заголовок, Автор, Серийный номер))
class Book {
  constructor(title, author, sn) {
    this.title = title;
    this.author = author;
    this.sn = sn;
  }
}

// - UI (Отображение всего списка книг, Добавление книги, Удаление книги, Показ информационного сообщения)
class UI {
  dsplCurrentList(list) {
    const crntTBody = document.querySelector(".books_list");

    if (crntTBody) {
      crntTBody.remove();
    }

    const tblBody = table.createTBody();
    tblBody.classList.add("books_list");

    list.forEach((book, ind) => {
      const newRow = tblBody.insertRow(0);
      newRow.innerHTML = `<th scope="col">${++ind}</th>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>
                              @${book.sn}
                              <button
                              type="button"
                              class="btn-close btn-outline-danger"
                              aria-label="Close"
                            ></button>
                          </td>`;
      const clsBtn = document.querySelector(".btn-close");

      this.addEventForClsBtn(clsBtn, ind, list);
    });
  }

  addEventForClsBtn(btn, id, books) {
    btn.addEventListener("click", () => {
      this.remBookFromList(books, --id);
      store.sendBookToLocal(books);
      this.dsplCurrentList(books);
    });
  }

  addBookInList(instanceBook, list) {
    list.push(instanceBook);
  }

  remBookFromList(list, id) {
    list.splice(id, 1);
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

  checkDataValid = () =>
    Array.from(inputs).every((input) => input.value !== "");
}
// - Store (Получить весь список книг из хранилища, Добавление/Удаление записи о книге из хранилища)
class Store extends UI {
  sendBookToLocal(list) {
    localStorage.setItem("books", JSON.stringify(list));
  }

  getBooksFromLocal() {
    const rslt = JSON.parse(localStorage.getItem("books"));

    if (rslt === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem("books"));
    }
  }
}

const ui = new UI();
const store = new Store();

//load page
const initBooksList = store.getBooksFromLocal();

if (initBooksList.length) {
  ui.dsplCurrentList(initBooksList);
}

// events
smbtBtn.addEventListener("click", () => {
  const status = ui.checkDataValid();

  if (status) {
    const book = new Book(inputs[0].value, inputs[1].value, inputs[2].value);
    form.reset();
    ui.dsplAlertMsg(status);
    ui.addBookInList(book, initBooksList);
    ui.dsplCurrentList(initBooksList);
    store.sendBookToLocal(initBooksList);
  } else {
    ui.dsplAlertMsg(status);
  }
});
