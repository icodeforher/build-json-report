var str = "\"01 Lima / / \"\r\n\"01 Lima / 50 Lima / \"\r\n\"01 Lima / 51 Barranca / \"\r\n\"01 Lima / 50 Lima / 202 La Molina\"\r\n\"01 Lima / 50 Lima / 203 San Isidro\"\r\n\"02 Arequipa / / \"\r\n\"02 Arequipa / 63 Arequipa / \"\r\n\"02 Arequipa / 64 Caylloma / \"\r\n\"02 Arequipa / 63 Arequipa / 267 Cercado\"";
var newString = new String();
var reporte = {};
var getLetters = /[a-zA-Z]+/g;
var getNumbers = /[0-9]/;
var mapping = {
  "0": "departamentos",
  "1": "provincias",
  "2": "distritos"
};

var regist = scapeSpecialCharacters(str);

function scapeSpecialCharacters(string) {
  // Using to scape \\
  for (var i = 0; i < str.length; i++) {
    var item = str.charAt(i)
    item.trim()

    if (item && item.length > 0) {
      item = item.replace('"', '');
      JSON.stringify(item).replace(/\\/g, '&#92;');
      newString = newString + item;
    }
  }
  //remove \n
  newString = newString.replace(/\n/g, ",");
  return newString
}


//separe string by ,
var registers = regist.split(",");

var report = buildReport(registers);

/* This function return the object with this structure:*/
function buildReport(array) {
  var report = {
    "departamentos": {},
    "provincias": {},
    "distritos": {}
  };
  
  for (var i = 0; i < array.length; i++) {
    var row = array[i].split("/");
    for(var j = 0; j < row.length; j++){
      var item = row[j];
      item = item.trim();
      if (item !== '') {
        
        var name = item.match(getLetters).toString();
        
        name = name.replace(",", " ");
        item = item.replace(name, "");
        
        var code = item.trim();
        var pointer = mapping[j.toString()];
      
        var parentName ="";
        var parentCode ="";

        if( j > 0){
          var oldItem = row[j-1];
          oldItem =  oldItem.trim();
          parentName = oldItem.match(getLetters).toString();
          parentName = parentName.replace(",","");

          oldItem = oldItem.replace(parentName, "");
          parentCode = oldItem.trim();
        }
        
        report[pointer][code] = {
          "name": name,
          "code": code,
          "parentName": parentName,
          "parentCode": parentCode

        };
       
      }
    }
  }
  return report;
}



//
console.log(JSON.stringify(report))