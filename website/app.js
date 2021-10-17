/** Listen to get Weather Button */
   document.getElementById('getWeather-btn').addEventListener('click', handleData);

/******* **********************************************************************/
/** Functions */

function handleData(event) {
    zipCode = checkAndGetZipCode();
    if (zipCode){
        countryCode = document.getElementById('countryCode').value;
        retriveWeather(zipCode, countryCode ? countryCode : 'us');
    }
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

/** Retrive weather data from open weather map  */
const retriveWeather = async (zipCode, countryCode) => {
    apikey = '5cec774feeecae7ce6a902b66a72c634';
    await (fetch(`https:api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&&appid=${apikey}`))
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            if(data.cod != 200){
                alert(data.message)
            }
            return data;
        })
        .catch(function (error) {
            console.log(error)
        })
}
