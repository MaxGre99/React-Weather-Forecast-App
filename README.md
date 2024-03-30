# Weather App on React

This app can show you weather in the chosen city.

## Available Scripts

In the project directory, you can run:

### `make install`

Intalls all required dependencies.

### `make start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `make build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Learn More

### Interface

To change a city, you need to click the 'Citites' button or the geotag in top-left corner. Then you have to type the city you want (there is autocomplete) and tap on the wanted city. If you won't tap on the suggested cities, nothing will happen (that's why there's no need in validation, I think)

### Start City

The start city is New York, all info is from there.

### Favourite citites

You can chose favourite cities by clicking on the bookmark near the city name. It will be added in the list above. To delete favourite city, do the same thing.

### Timer

Always show you your current time + GMT. Maybe I'll fix it later. (No, I tried, it didn't work (for now), cause there's no such info from API and I'm tired of calculationg date from the miliseconds after UTC)

### Slider 

Slider on the right shows you approximate weather for 5 next days. You can control the chosen day with arrows or swipe them.

### Activities 

Now it's just static pictures.

### 24-hour forecast

Couldn't find it in suggested API, so left a funny picture. For the same reason UV Index replaced with Air Pollution Index.

### Toast

If there will be an API error, a error toast will appear in the top right corner. You can also make a success toast if you need, code is in ToastError.jsx (and one line in App.jsx)

### Adaptive Design Troubles

I'm a newbie in adaptability, so it can be not so good as you wait. Originally made for 24'' 1080p monitor and shrinked down to 720p, but still...
