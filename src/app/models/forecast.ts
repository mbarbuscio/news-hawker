import { Weather } from "./weather";

export class Forecast {
    Year: number;
    Month: number;
    Day: number;
    WeatherList: Array<Weather>;

    constructor() {
        this.WeatherList = new Array<Weather>();
    }

}