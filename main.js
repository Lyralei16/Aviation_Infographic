// When page is loaded
$(document).ready(async function () {
    InitData() // after data finished initializing
        .then(function () {

            insertNames(periodsByKey,"periodselect", "KW");
            insertNames(airportsByKey, "airportselect");
            insertNames(topicGroupsById, "topicselect");

        }).catch(function (error) {
            console.error(error)
        })
});