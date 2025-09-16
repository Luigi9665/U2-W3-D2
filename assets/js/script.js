// VARIABILI COSTANTI

const form = document.getElementById("form-agenda");
const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("remove");
const btnAll = document.getElementById("removeAll");
const divH2 = document.getElementById("containerH2");
let arrayName = [];
let contatore = 0;
// variabili per la creazione del contatore
const divRow = document.querySelector(".row");
const div = document.createElement("div");
div.classList.add("col-12", "col-md-7");
const h4 = document.createElement("h4");

// ----------------------------------------------------------------------------

// FUNZIONI

// generazione dell'alert
const generateAlert = function () {
  const alert = document.createElement("div");
  alert.className = "alert alert-danger";
  alert.role = "alert";
  alert.innerText = "Nessun nome in memoria, creane uno tu, grazie!";
  divH2.appendChild(alert);
};

// rimuovere l'alert
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

// mostrare il nome salvato creando gli h2
const showName = (value, index) => {
  const h2 = document.createElement("h2");
  h2.classList.add("text-capitalize", "user-select-none");
  h2.style.cursor = "pointer";
  h2.setAttribute("data-index", index);
  h2.innerText = value;
  divH2.appendChild(h2);
};

// cancellare il nome
const deleteName = (index) => {
  const h2 = document.querySelector(`h2[data-index="${index}"]`);
  if (h2) {
    h2.remove();
  } else {
    return;
  }
};

// submit del form con acquisizione del nome
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const inputName = document.getElementById("name");
  const input = inputName.value.trim();
  if (!input) {
    inputName.reportValidity();
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
    const alert = document.querySelector(".alert");
    if (alert) {
      return;
    } else {
      generateAlert();
    }
  }
});
// bottone per cancellare il tutto
// btnAll.addEventListener("click", () => {
//   for (let i = 0; i < arrayName.length; i++) {
//     arrayName.splice(0, 1);
//   }
//   arrayName.splice(0, 1);

//   console.log(arrayName);
//   addToLocal(arrayName);
//   if (arrayName.length === 0) {
//     localStorage.removeItem("names-memory");
//     const alert = document.querySelector(".alert");
//     if (alert) {
//       return;
//     } else {
//       generateAlert();
//     }
//   }
// });

// mostra contatore
const showContatore = (count) => {
  div.classList.add("bg-dark-subtle", "border", "rounded-5", "text-center", "my-5", "mx-auto", "p-5");
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

// al caricamento della pagina portare il valore dell'array simile al localestorage e il counter simile al sessiostorage
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

// funzione che prepara le icone dentro l'h2
const insertIcon = (container) => {};

// evento sul container
divH2.addEventListener("click", (e) => {
  const target = e.target;
  const index = target.dataset.index;
  console.log(index);
  target.remove();
  arrayName.splice(index, 1);
  addToLocal(arrayName);
  if (arrayName.length === 0) {
    localStorage.removeItem("names-memory");
    generateAlert();
  }
});
