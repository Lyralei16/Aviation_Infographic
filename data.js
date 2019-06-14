/**
 * Here data is withdrawn and sorted
 * Dictionaries are created 
 * Convenient data arrays 
 */

// Data arrays
var periodsData = [];
var airportData = [];
var topicData = [];
var dataSet = [];

// Dictionaries
var airportsByKey = {}; // this object gives us the the keys of each airport 
var periodsByKey = {}; // an object holding years
var topicsByKey = {}; // Collection of all sub-topics by key
var topicGroupsById = {}; // Collection of all topic-groups by corrosponding id

/**
 * async function that waits untill all data arrays have loaded
 * and fills the corrosponding dictionaries 
 * @async
 */
async function InitData() {
    airportData = await getData("https://opendata.cbs.nl/ODataApi/odata/37478eng/Airports");
    airportsByKey = dictionaryFromArray(airportData);
    periodsData = await getData("https://opendata.cbs.nl/ODataApi/odata/37478eng/Periods");
    periodsByKey = dictionaryFromArray(periodsData);
    topicData = await getData("https://opendata.cbs.nl/ODataApi/odata/37478eng/DataProperties");
    topicsByKey = dictionaryFromArray(topicData, "Key", "Topic");
    topicGroupsById = dictionaryFromArray(topicData, "ID", "TopicGroup");
    dataSet = await getData("https://opendata.cbs.nl/ODataApi/odata/37478eng/TypedDataSet");
    
    console.log("Data successfully initialized!");
}

/**
 * Short version to call jquery.getJson() and return the content of "value"
 * from the returned json object
 * 
 * @param {string} url url to json file 
 * @async 
 */
async function getData(url) { // this function gets data from the link and returns (first promise) value (when value is there, promise finishes )
    var request = await $.getJSON(url); // pending request (stopping the function waiting for the answer of the Promise)
    const value = request.value; //  returning constant value  of the (completed)data

    return value;
}

/**
 * Creates a dictionary Object with Key : Title pairs to be used in
 * data stuff
 *   
 * @param {Array} dataArr Array of Objects with Key and title properties
 */
function dictionaryFromArray(dataArr, sortingKey = "Key", sortForTypeOf) {

    var newDictionary = {};

    for (let i = 0; i < dataArr.length; i++) {
        const element = dataArr[i];

        if (!(sortForTypeOf != undefined && element.Type != sortForTypeOf)) {
            newDictionary[element[sortingKey]] = element.Title;
        }

    }

    return newDictionary;
}

/**
 * Loops through topicData and returns an id if an object with matching property and value was found
 * @param {string} propertyName 
 * @param {*} ownPropertyValue 
 */
function getTopicId(propertyName, ownPropertyValue){
    topicData.forEach(elem, function () {
        if(elem[propertyName] == ownPropertyValue) {
            return elem.ID;
        }
    });
    return null;
}

/**
 * 
 * @param {int} topicGroupId 
 */
function getSubTopics(topicGroupId) {
    var subTopics;

    topicData.forEach(elem, function(){
        if(elem.ParentID == topicGroupId) subTopics[elem.ID] = elem.Title;
    });

    return subTopics;
}