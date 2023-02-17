
# <p align="center">My Journey to Becoming a Web Developer Project 10 -Real-time-Weather-app</p>


https://drive.google.com/file/d/1DVJIMtw2aINYUBr25t4ZuiAWvmDoS8FP/view?usp=sharing
        
  
this is a web application that provides information about weather forecasts for a specific geographic location. This application relies on a source of weather data from OpenWeatherMap and uses a combination of web technologies (HTML, TAILWIND CSS, JavaScript) to display weather forecast information to the user in an interactive way.

The HTML is structured into various elements such as video, div, and form. The web app has a predefined style defined in a separate CSS file.

In particular, the web app consists of a presentation screen that displays a background video with a semi-transparent black overlay effect. In the center of the screen there is a box surrounded by a shadow with a blur, inside of which it is possible to search for a city through the appropriate form.

The form consists of an input field and a search button. In the input field it is possible to enter the name of a city, while the search button has the magnifying glass icon.

After entering the city name and clicking the search button, weather forecast information for the entered city is displayed. The information includes the current temperature, weather icon, humidity, atmospheric pressure, visibility, and wind speed. In addition, it is possible to view the weather forecast for the next 24 hours in graphical format.

**this web app is not responsive, which means that it does not adapt to different screen sizes and may not work properly on mobile devices.**

About the JS, At the time the page is loaded, the code sets the searchDone variable to false, which is then modified when the search button is clicked. There are also some defined constants that refer to the elements of the DOM (the structured document of the web page).

Additionally, the code allows the user to horizontally scroll through some elements using the mouse wheel, such as the weather forecast block and the temperature for the next few hours. To do this, there are two event listeners that listen for the mouse wheel event. These events prevent the default scrolling behavior of the browser and move the element horizontally based on the deltaY event.

To get the weather forecast, the user enters the city name in the search input and clicks the search button. An event listener function is then called for the button, which calls an asynchronous function called getData(). This function makes an API request to the OpenWeatherMap endpoint, passing the city name as a parameter. A JSON object is then returned that contains information about the city, including the latitude and longitude coordinates.

A second API request is then made to the OpenWeatherMap endpoint to get the weather forecast for the specified city. This JSON object contains information such as the current temperature, humidity, pressure, visibility, and wind, as well as the forecasts for the next few hours and days.

The temperatures are in Kelvin, so they are converted to Celsius and Fahrenheit and displayed in the user interface. The weather forecast icons are retrieved from the OpenWeatherMap server and displayed along with the temperatures.

The weather forecasts for the next few hours and days are displayed in separate blocks within the user interface. The temperatures for the next few hours can be converted to Celsius or Fahrenheit by clicking on the respective buttons at the top of the page.
    
