var csv = require('fast-csv');
var fs = require('fs');

var stream = fs.createReadStream("kow.csv");

var newArmy;

csv
 .fromStream(stream, {headers: true})
 .on("data", function(data){
     if (data.army != newArmy) {
        newArmy = data.army;
        console.log(newArmy);
     }
 })
 .on("end", function(){
     console.log("done");
 });
