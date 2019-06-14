/**
 * Interactions contains functions that convert dictionaries into displayed data elements 
 * and get properly placed in the document
 */

/**
 * creating the param that will take 
 * the data array to put the values into scroll display
 * 
 * @param {Object} dataHolder Object of keys : values that is 
 * @param {string} selectorId element in the HTML to which content is added
 * @param {string} ignoreKeysContaining sorting option for inserting certain groups of values
 */
function insertNames(dataHolder, selectorId, ignoreKeysContaining) {

    var select = document.getElementById(selectorId); //puts data in a proper place in thee HTML 

    var keyCodes = Object.keys(dataHolder); // gets the keyCode list 
    var dataValue = Object.values(dataHolder); // gets the titles.values list

    for (let i = 0; i < dataValue.length; i++) {

        var nextOption = document.createElement("option");
        var labelKey = keyCodes[i];

        // Filter strings
        if (ignoreKeysContaining != undefined && labelKey.includes(ignoreKeysContaining)) {
            continue;
        }

        nextOption.innerHTML = dataValue[i];
        select.append(nextOption);
    }
}
/**
 * The function sets up a table according to given dictionary, 
 * with a specified selector, with any HTML element available
 * plus ability to sort out in order to structure table better  
 * 
 * @param {Object} dataHolder takes a dictionary object 
 * @param {String} selectorId selector in the document 
 * @param {Element} elemType type of HTML element that will be included
 * @param {string} onlyShow sorting string param 
 */
function setupTables(dataHolder, selectorId, elemType, onlyShow) {
    var select = document.getElementById(selectorId); //puts data in a proper place in thee HTML 

    var keyCodes = Object.keys(dataHolder); // gets the keyCode list 
    var dataValue = Object.values(dataHolder); // gets the titles.values list

    for (let i = 0; i < dataValue.length; i++) {

        var nextOption = document.createElement(elemType);
        var labelKey = keyCodes[i];

        // Filter strings
        if (onlyShow != undefined && !labelKey.includes(onlyShow)) {
            continue;
        }

        nextOption.innerHTML = dataValue[i];
        select.append(nextOption);
    }

}
/**
 * This function creates a table and fills it up with data 
 * 
 * @param {Object} topicKey is an object contaioning a needed value
 * @param {string} insertId is an ID selector in HTML
 */
function generateTableByTopic(topicKey, insertId) {

    var insertAtElem = document.getElementById(insertId);

    // in case param is empty (so no error appears)
    if (insertAtElem == null) {
        insertAtElem = document.body;
    }

    // create a table elem and insert it 
    var table = document.createElement("table");
    insertAtElem.append(table);

    // adding captions to the tables, getting topics(values) from TopicsByKeys object 
    var caption = document.createElement("caption");
    caption.innerHTML = topicsByKey[topicKey];
    table.append(caption);

    // creating new table rows for titles 
    var titles = document.createElement("tr");
    table.append(titles);

    var rows = {};

    //filling in the table 
    airportData.forEach(function (airport) {

        var title = document.createElement("th");
        title.innerHTML = airport.Title;
        titles.append(title);

        var airportKey = airport.Key;

        periodsData.forEach(function (period) {

            var key = period.Key;

            if (key.includes("JJ")) {

                if (rows[key] == undefined) {
                    rows[key] = document.createElement("tr");
                    table.append(rows[key]);

                    var title = document.createElement("th");
                    title.innerHTML = period.Title;
                    rows[key].append(title);
                }

                dataSet.forEach(function (entry) {


                    if (entry.Periods == key && entry.Airports == airportKey) {

                        var value = entry[topicKey];

                        var cell = document.createElement("td");
                        cell.innerText = value;

                        rows[key].append(cell);
                    }

                });
            }
        });
    });
}
/**
 * This function sorts and accesses data and returns a content 
 * @param {Object} topicKey is an object with keys to all sub-topic 
 * @param {Object} airportKey is an object with keys to airports 
 */
function topicByAirport(topicKey, airportKey) {

    // this is a template for all the needed values 
    var content = {
        Category: "",
        Title: "",
        Lables: [],
        data: [],
    }

    //here by taking values from the parameters we place it back into content 
    content.Category = topicsByKey[topicKey];

    content.Title = airportsByKey[airportKey];

    periodsData.forEach(function (period) {

        var key = period.Key;

        if (key.includes("JJ")) {

            if (!content.Lables.includes(period.Title)) {
                content.Lables.push(period.Title);
            }

            dataSet.forEach(function (entry) {

                if (entry.Periods == key && entry.Airports == airportKey) {

                    var value = entry[topicKey];

                    content.data.push(value);
                }

            });
        }
    });

    return content;
}