
var precordenadas = window.document.getElementById("divid").textContent;
console.log(precordenadas);
var coordenadas = "-75.5818215638562,6.2546332796983,1469.73824340592 -75.58019187932042,6.255216571392928,1467.491674119944 -75.57913675731793,6.257133965708469,1467.901228795282 -75.58142585655681,6.259271289750605,1472.18999057099 -75.58320147976215,6.259423208609043,1478.97297139878 -75.58494640752762,6.257841026024418,1475.539930645817 -75.58570696674084,6.256442889654269,1475.635587959579 -75.58492330396524,6.255269769087055,1473.943021215422 -75.58347121609894,6.254403133836933,1469.740058320595 -75.5818215638562,6.2546332796983,1469.73824340592";
var arreglo = coordenadas.split(",");
arreglo = arreglo.toString().split(" ");

var eraseAltirud = false;
var i = 0;
var j = 0;
var elementArr = "";
var newElement = "";
var newArr = [];
var arreglo2 = arreglo;
var i = 0;
var element1 = "";
var element2 = "";
var element3 = "";
while(i < arreglo2.length){
  [element1,element2,element3] = arreglo2[i].split(",");
  arreglo2[i] = ["["+element1+","+element2+"]"]
  i += 1;
}
