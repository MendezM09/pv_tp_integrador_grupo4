export function validarProducto({ title, price, description, image, products }) {
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
  return null;
}