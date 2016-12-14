var csv = require('fast-csv');
var fs = require('fs');

var stream = fs.createReadStream('kow.csv');

var newArmy, newUnit, newType;
var armyIndex = -1;
var unitIndex;
var kow = {armies: []};

csv.fromStream(stream, {headers : true, trim: true})
  .on('data', function(data){
    if (data.army != newArmy) {
      newArmy = data.army;
      kow.armies.push({army: newArmy, units: []});
      armyIndex++;
      unitIndex = -1;
    }
    if (unitIndex == -1 || (data.unit != newUnit && data.unit != '')) {
      newUnit = data.unit;
      kow.armies[armyIndex].units.push({unit: newUnit, variations: []});
      unitIndex++;
    }
    if (data.type != newType && data.type != '') {
      newType = data.type;
    }
    kow.armies[armyIndex].units[unitIndex].variations.push({type: newType, size: data['size'], speed: data['speed'], melee: data['melee'], range: data['range'], defense: data['defense'], attack: data['attack'], nerve: data['nerve'], rules: data['rules'], options: data['options'], points: data['points']});
  })
  .on('end', function(){
     fs.writeFileSync('kow.min.json', JSON.stringify(kow));
     fs.writeFileSync('kow.pretty.json', JSON.stringify(kow, null, 2));
     console.log('done');
  });
