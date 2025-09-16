// variabili costanti
const form = document.getElementById("form-agenda");
const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("remove");
let arrayName = [];
let contatore = 0;

// funzioni

// generazione dell'alert
const generateAlert = function () {
  const alert = document.createElement("div");
  alert.className = "alert alert-warning";
  alert.role = "alert";
  alert.innerText = "Nessun nome in memoria, creane uno tu, grazie!";
  form.before(alert);
};

const removeAlert = function () {
  const alert = document.querySelector(".alert");
  if (alert) {
    alert.remove();
  }
};

// salvataggio in localestorage
const addToLocal = (array) => {
  localStorage.setItem("names-memory", JSON.stringify(array));
};

// mostrare il nome salvato
const showName = (value, index) => {
  const h2 = document.createElement("h2");
  h2.setAttribute("data-index", index);
  h2.innerText = value;
  form.before(h2);
};

// cancellare il nome
const deleteName = (index) => {
  const h2 = document.querySelector(`h2[data-index="${index}"]`);
  h2.remove();
};

// submit del form con acquisizione del nome
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const inputEl = document.getElementById("name");
  const input = inputEl.value.trim();
  if (!input) {
    inputEl.reportValidity();
    return;
  }
  arrayName.push(input);
  addToLocal(arrayName);
  if (arrayName.length > 0) {
    removeAlert();
  } else {
    generateAlert();
  }
  showName(input, arrayName.length - 1);
  form.reset();
});

// bottone per cancellare il nome
btnDelete.addEventListener("click", () => {
  deleteName(arrayName.length - 1);
  arrayName.pop();
  addToLocal(arrayName);
  if (arrayName.length === 0) {
    localStorage.removeItem("names-memory");
    generateAlert();
  }
});

// mostra contatore
const divRow = document.querySelector(".row");
const div = document.createElement("div");
const h4 = document.createElement("h4");
const showContatore = (count) => {
  div.classList.add("w-100", "bg-warning-subtle", "border", "rounded-5", "text-center", "my-5", "p-5");
  h4.classList.add("display-3");
  h4.innerText = count;
  div.appendChild(h4);
  divRow.after(div);
};

// set interval per il contatore
const timer = setInterval(() => {
  contatore++;
  sessionStorage.setItem("count", parseInt(contatore));
  showContatore(sessionStorage.getItem("count"));
}, 1000);

window.addEventListener("DOMContentLoaded", () => {
  const hasNames = localStorage.getItem("names-memory");
  if (hasNames) {
    const names = JSON.parse(hasNames);
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      showName(name, i);
    }
    arrayName = names;
  } else {
    generateAlert();
  }
  const hasCount = sessionStorage.getItem("count");
  if (hasCount > 0) {
    contatore = hasCount;
    showContatore(contatore);
  }
});
