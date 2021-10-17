  /** Listen to get Weather Button */
   document.getElementById('getWeather-btn').addEventListener('click', handleData);

/******* **********************************************************************/
/** Functions */

function handleData(event) {
    zipCode = checkAndGetZipCode();
}

/** Check existance of zip code */
function checkAndGetZipCode()
{
    zipCode = document.getElementById('zipCode').value;
    zipCodeTextError = document.getElementById('zipCodeError');
    zipCodeTextError.textContent = !zipCode ?
     'Please Enter Zip Code .': '';
    return zipCode;
}