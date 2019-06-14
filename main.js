//main js that is responsible for controlling all the processes that run on the webpage 

// When page is loaded
$(document).ready(async function () {
    InitData() // after data finished initializing
        .then(function () {

            insertNames(periodsByKey,"periodselect", "KW");
            insertNames(airportsByKey, "airportselect");
            insertNames(topicsByKey, "topicselect");
            
            
            // setupTables(airportsByKey, "location", "td");
            // setupTables(periodsByKey, "year", "tr", "JJ");
            
            generateTableByTopic(Object.keys(topicsByKey)[5]);
            console.log(topicsByKey);
            console.log(Object.keys(topicsByKey)[5]);

            var newdata = topicByAirport(Object.keys(topicsByKey)[5], Object.keys(airportsByKey)[2]);
            drawLineChart(newdata,"line", "canvas1"); 
            drawLineChart(newdata,"bar", "canvas2"); 
            drawLineChart(newdata,"doughnut", "canvas3"); 

        }).catch(function (error) {
            console.error(error);
        })

    
});