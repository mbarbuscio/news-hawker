// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDHfcxY2J5APAsU4ajr5i0Q-HlDBS-xEUU",
    authDomain: "newsfeed-db.firebaseapp.com",
    databaseURL: "https://newsfeed-db.firebaseio.com",
    projectId: "newsfeed-db",
    storageBucket: "newsfeed-db.appspot.com",
    messagingSenderId: "418826619729"
  },
  newsApi: {
    apiKey: "ae7efcbff7794e01847d3d0c9b4344de",
    baseUrl: "https://newsapi.org"
  },
  openWeather: {
    baseUrl: "https://api.openweathermap.org/data/2.5",
    apiKey: "f926f2fec4e9336f54060cec03938860"
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
