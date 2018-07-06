export class Weather {
    constructor (
        public minTemp: number,
        public maxTemp: number,
        public currentTemp: number,
        public humidity: number,
        public pressure: number,
        public windSpeed: number,
        public windDirection: number,
        public type: string,
        public city: string,
        public countryCd: string
    ){}
}