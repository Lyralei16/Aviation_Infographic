/* 
*/











































var getPeriodData; 
var getAirportData;
var AirportsInKeys = {}; // this object gives us the the keys of each airport 
var AirportsInNames = {}; // object with names of airports 
var PeriodsInYears = {}; // an object holding years 

$(document).ready (function () {
    
     
    InitData();
  

});


function InitData() {
    //accesing the data with of the names and keys of the airports 
    $.getJSON("https://opendata.cbs.nl/ODataApi/odata/37478eng/Airports").done(
        (data) => {
           // console.log(data.value); //logging the value of the data

           

            getAirportData = data.value; 

            // for each element in gdata, for example gdata[0] which is {}
            getAirportData.forEach(elem => {
               AirportsInKeys[elem.Key] = elem.Title;
               AirportsInNames[elem.Title] = elem.Key;
            });
            

           /*  console.log(AirportsInKeys); loggging and debugging
            console.log(AirportsInNames); */
            insertNames();
        }
    );
    //accessing data of the periods of the flighs
    $.getJSON("https://opendata.cbs.nl/ODataApi/odata/37478eng/Periods").done(
        (data) => {
            console.log(data.value); 

            getPeriodData = data.value;

            getPeriodData.forEach(elem =>{
                

            })

        }
    )
}

function insertNames() {
    var names = Object.keys(AirportsInNames);

    for (let i = 0; i < names.length; i++) {
        var nextOption = document.createElement("option");
        nextOption.innerHTML = names[i]

        var options = document.getElementById("airportselect");
        options.append(nextOption);

        //console.log(Object.keys(AirportsInNames)[i]);
    }
}