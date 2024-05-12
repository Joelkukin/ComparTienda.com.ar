export function procesarUrl(url) {
  // Verificar si la URL ya tiene "http://" o "https://"
  if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
  }

  // Buscar la primera doble barra
  var indice = url.indexOf('//');

  // Si se encontró una doble barra, reemplazarla por "http://"
  if (indice !== -1) {
      return 'http://' + url.substring(indice + 2);
  }

  // Si no se encontró una doble barra, agregar "http://"
  return 'http://' + url;
}

/* // Uso de la función
console.log(procesarUrl('www.youtube.com'));  // Devuelve "http://www.ejemplo.com"
console.log(procesarUrl('//www.youtube.com'));  // Devuelve "http://www.ejemplo.com"
console.log(procesarUrl('http://www.youtube.com'));  // Devuelve "http://www.ejemplo.com"
console.log(procesarUrl('https://www.youtube.com'));  // Devuelve "https://www.ejemplo.com"
 */

export function propiedadesIncluidas(objeto, incluidoEn) {
  for (var propiedad in objeto) {
      if (!incluidoEn.hasOwnProperty(propiedad)) {
          return false;
      }
  }
  return true;
}


/* // Uso de la función
var objeto1 = {alto: 100, ancho: 50};
var objeto2 = {ancho: 50};

console.log(propiedadesIncluidas(objeto1, objeto2));  // Devuelve true */

export default {propiedadesIncluidas}