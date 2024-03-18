const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];

    limpiarHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML();
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    title: curso.querySelector("h4").textContent,
    price: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

function carritoHTML() {
  // Limpiando HTML
  limpiarHTML();

  // Generar HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, title, price, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `  
    <td><img src="${imagen}"></td>
    <td> ${title}</td>
    <td> ${price}</td>
    <td>${cantidad}</td>
    <td> 
      <a href="#" class="borrar-curso" data-id="${id}"> x </a> 
    </td>
    `;

    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
