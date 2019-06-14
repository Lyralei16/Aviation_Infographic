//Interactions contains functions that convert dictionaries into displayed data elements and get properly placed in the document


// functions for chart manipulation and data interction here
/**
 * 
 * @function insertNames
 * 
 * 
 * 
 * @param {Object} dataHolder Object of keys : values that is 
 * @param {string} selectorId element in the HTML to which content is added
 */
function insertNames(dataHolder, selectorId, ignoreKeysContaining) { // creating the param that will take the data array to put the values into scroll display

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
 * The function sets up a table according to given dictionary, with a specified selector, with any HTML element available + ability to sort out in order to structure table better  
 * @param {Object} dataHolder takes a dictionary object 
 * @param {ElementContentEditable} selectorId selector in the document 
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

function generateTableByTopic(topicKey, insertId) {

    var insertAtElem = document.getElementById(insertId);

    if (insertAtElem == null) {
        insertAtElem = document.body;
    }

    var table = document.createElement("table");
    insertAtElem.append(table);

    var caption = document.createElement("caption");
    caption.innerHTML = topicsByKey[topicKey];
    table.append(caption);

    var titles = document.createElement("tr");
    table.append(titles);

    var rows = {};

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

function topicByAirport(topicKey, airportKey) {

    var content = {
        Category: "",
        Title: "",
        Lables: [],
        data: [],
    }

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