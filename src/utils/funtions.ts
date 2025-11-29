export function takeFirst<T>(array: T[], cantidad: number): T[] {
  if (!Array.isArray(array) || cantidad <= 0) return []
  return array.slice(0, cantidad)
}

// Ahora elimina los primeros "cantidad" elementos y conserva el resto
export function takeLast<T>(array: T[], cantidad: number): T[] {
  if (!Array.isArray(array) || cantidad <= 0) return array
  return array.slice(cantidad)
}



export function mergeAndEnumerate<T extends object>(...arrays: T[][]): (T & { index: number })[] {
  // Unir todos los arrays en orden
  const merged = arrays.flat();

  // Enumerar añadiendo "index"
  return merged.map((item, index) => ({
    ...item,
    index
  }));
}