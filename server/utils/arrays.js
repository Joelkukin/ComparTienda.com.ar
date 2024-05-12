export function arraysIguales(arr1, arr2) {
  if (!Array.isArray(arr1) || ! Array.isArray(arr2) || arr1.length !== arr2.length)
    return false;

  var arr1Ordenado = arr1.concat().sort();
  var arr2Ordenado = arr2.concat().sort();

  for (var i = 0; i < arr1Ordenado.length; i++) {
      if (arr1Ordenado[i] !== arr2Ordenado[i])
          return false;
  }
  return true;
}


export default {arraysIguales}