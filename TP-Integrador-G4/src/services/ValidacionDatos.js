export function validarProducto({ title, price, description, image, products, rate, count }) {
  if (!title || !title.trim()) {
    return "El título es obligatorio.";
  }
  if (!price || isNaN(price)) {
    return "El precio debe ser un número válido.";
  }
  if (Number(price) <= 0) {
    return "El precio debe ser mayor a 0.";
  }
  if (!description || !description.trim()) {
    return "La descripción es obligatoria.";
  }
  if (!image || !image.trim()) {
    return "La imagen es obligatoria.";
  }
  if (Number(rate) <= 0) {
    return "La valoracion debe ser mayor a 0.";
  }
  if (Number(rate) <= 0 || Number(rate) > 5) {
    return "La valoración debe ser mayor a 0 y menor o igual a 5.";
  }

  if (Number(count) <= 0) {
    return "La cantidad de opiniones debe ser mayor a 0.";
  }
return null;
}