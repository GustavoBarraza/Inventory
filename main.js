let productos = [];
let contadorId = 1;

// Validación en inputs
export function soloLetras(input) {
  input.value = input.value
    .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    .replace(/^\s+/g, '')
    .toLowerCase();
}

export function soloNumeros(input) {
  input.value = input.value
    .replace(/[^0-9.]/g, '')
    .replace(/^\.*/g, '')
    .replace(/(\..*)\./g, '$1');
}

// Agregar producto
function agregarProducto() {
  const nombre = document.getElementById("nombre").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value.trim();

  if (!nombre || isNaN(precio) || !categoria) {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacíos o inválidos',
      text: 'Por favor completa todos los campos correctamente.',
    });
    return;
  }

  const existe = productos.some(p =>
    p.nombre.toLowerCase() === nombre.toLowerCase() &&
    p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  if (existe) {
    Swal.fire({
      icon: 'warning',
      title: 'Producto repetido',
      text: 'Este producto ya está registrado en esa categoría.',
    });
    return;
  }

  const nuevoProducto = {
    id: contadorId++,
    nombre,
    categoria,
    precio
  };

  productos.push(nuevoProducto);
  mostrarProductos();

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").value = "";

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: 'El producto se agregó correctamente.',
  });
}

// Mostrar productos en tabla
function mostrarProductos() {
  const tabla = document.getElementById("tabla-productos");
  tabla.innerHTML = "";

  productos.forEach(p => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${p.id}</td>
      <td><input type="text" value="${p.nombre}" onchange="editarProducto(${p.id}, 'nombre', this.value)"></td>
      <td><input type="text" value="${p.categoria}" onchange="editarProducto(${p.id}, 'categoria', this.value)"></td>
      <td><input type="number" value="${p.precio}" onchange="editarProducto(${p.id}, 'precio', this.value)"></td>
      <td><button onclick="eliminarProducto(${p.id})">Eliminar</button></td>
    `;

    tabla.appendChild(fila);
  });
}

// Editar producto
window.editarProducto = function (id, campo, valor) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  if (campo === "precio") {
    valor = parseFloat(valor);
    if (isNaN(valor)) return;
  }
  producto[campo] = valor;
}

// Eliminar producto
window.eliminarProducto = function (id) {
  productos = productos.filter(p => p.id !== id);
  mostrarProductos();
}

// Conectar botón
const btn = document.getElementById("btn-add-product");
btn.addEventListener("click", agregarProducto);

// Exportar funciones para los inputs
window.soloLetras = soloLetras;
window.soloNumeros = soloNumeros;
