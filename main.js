//main js that is responsible for controlling all the processes that run on the webpage 

// When page is loaded
$(document).ready(async function () {
    InitData() // after data finished initializing
        .then(function () {

            //Uploading all the years(periods), airports and topics
            insertNames(periodsByKey, "periodselect", "KW");
            insertNames(airportsByKey, "airportselect");
            insertNames(topicsByKey, "topicselect");


            // setupTables(airportsByKey, "location", "td");
            // setupTables(periodsByKey, "year", "tr", "JJ");

            //generating the dable that displays the main data 
            generateTableByTopic(Object.keys(topicsByKey)[5]);
            // console.log(topicsByKey);
            // console.log(Object.keys(topicsByKey)[5]);


            //testing data layout
            var newdata = topicByAirport(Object.keys(topicsByKey)[5], Object.keys(airportsByKey)[2]);

            refresh(newdata);

            //error handler 
        }).catch(function (error) {
            console.error(error);
        })


});


function refresh (data) {
    // Creating various graphs 
    drawLineChart(data, "line", "canvas1");
    drawLineChart(data, "bar", "canvas2");
    drawLineChart(data, "doughnut", "canvas3");
}