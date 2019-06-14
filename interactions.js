// functions for chart manipulation and data interction here
/**
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