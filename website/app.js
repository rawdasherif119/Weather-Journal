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
            if (data.cod != 200) {
                alert(data.message)
                return ;
            }
            addRetrivedWeather(data, zipCode);
        })
        .catch(function (error) {
            console.log(error)
        })
}

/** Add and retrived new data function */
const addRetrivedWeather = (data, zipCode) => {
    data = prepareNewData(data, zipCode);
    postMethod('/add',data).then(
         drawNewWeatherData()
    );
}

/** Prepare new data to add it to project data */
function prepareNewData(data, zipCode) {
    return {
        zipCode: zipCode,
        countryCode: data.sys.country,
        temp: Math.round(parseFloat(data.main.temp) - 273.15),
        date: new Date(),
        content: document.getElementById('feelings').value,
        description: data.weather[0].description,
        name: data.name
    };
}

/** Draw ui weather data */
const  drawNewWeatherData =async () =>{
    await fetch('/getData')
        .then(function (resp) {return resp.json()})
            .then(function (data) {
                 if (data.zipCode) {
                    drawDiv = document.getElementById('drawDiv');
                    drawDiv.innerHTML = '';
                    innerDiv = document.createElement('div');
                    innerDiv.className = "inner";                    
                    //Display Zip Code
                    zipElement = document.createElement('h4');
                    zipElement.textContent = 'Zip:  ' + data.zipCode;
                    innerDiv.appendChild(zipElement);
                    //Display Country code 
                    countryCodeElement = document.createElement('h4');
                    countryCodeElement.textContent = 'Country code: '+ data.countryCode;
                    innerDiv.appendChild(countryCodeElement);
                    //Display name
                    nameElement = document.createElement('h4');
                    nameElement.textContent = 'Name:  '+data.name;
                    innerDiv.appendChild(nameElement);
                    //Display temp
                    tempElement = document.createElement('h4');
                    tempElement.textContent = 'Temp:  ' +data.temp;
                    innerDiv.appendChild(tempElement);
                    //Diplay description
                    descriptionElement = document.createElement('h4');
                    descriptionElement.textContent = 'Description:  ' + data.description;
                    innerDiv.appendChild(descriptionElement);
                    // Display date
                    dateElement = document.createElement('h4');
                    dateElement.textContent = 'Date:  ' + data.date;
                    innerDiv.appendChild(dateElement);
                    //Display content
                    if(data.content){
                      contentElement = document.createElement('h4');
                      contentElement.textContent = 'Content:  ' + data.content;
                      innerDiv.appendChild(contentElement);
                    }
                    drawDiv.appendChild(innerDiv);
                 }
            })
            .catch(function (error) {
                console.log(error)
            })


}

/**General Post Method Data*/
const postMethod = async (url = '', data = '') => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        return await response.json();
    } catch (error) {
        alert('An error accour ,please try again .')
    }
}

