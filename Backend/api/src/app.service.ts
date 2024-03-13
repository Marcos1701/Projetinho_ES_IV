import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface ForecastApi {
  date: string;
  weekday: string;
  max: number;
  min: number;
  cloudiness: number;
  rain: number;
  rain_probability: number;
  wind_speedy: string;
  description: string;
  condition: string;
}

export interface ResultsApi {
  temp: number;
  date: string;
  time: string;
  condition_code: string;
  description: string;
  currently: string;
  cid: string;
  city: string;
  img_id: string;
  humidity: number;
  cloudiness: number;
  rain: number;
  wind_speedy: string;
  wind_direction: number;
  wind_cardinal: string;
  sunrise: string;
  sunset: string;
  moon_phase: string;
  condition_slug: string;
  city_name: string;
  timezone: string;
  forecast: ForecastApi[];
  cref: string;
};



export interface ResponseApi{
  by: string;
  valid_key: boolean;
  results: ResultsApi;
  execution_time: number;
  from_cache: boolean;
}

// api => https://api.hgbrasil.com/weather?lat=-23.682&lon=-46.875&key=45e3765d
// api key => 45e3765d


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getForecast(
    latitude: number,
    longitude: number
  ): Promise<ForecastApi[]> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results.forecast){
      return response.results.forecast;
    }
    return [];
  }

  async getCurrentWeather(
    latitude: number,
    longitude: number
  ): Promise<ResultsApi> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results;
    }
    return {} as ResultsApi;
  }

  async getSunriseSunset(
    latitude: number,
    longitude: number
  ): Promise<{ sunrise: string; sunset: string }> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return {
        sunrise: response.results.sunrise,
        sunset: response.results.sunset,
      };
    }
    return { sunrise: "", sunset: "" };
  }

  async getMoonPhase(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.moon_phase;
    }
    return "";
  }

  async getCityName(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.city_name;
    }
    return "";
  }

  async getCityTimezone(
    latitude: number,
    longitude: number
  ): Promise<{
    city_name: string;
    timezone: string;
  }> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return {
        city_name: response.results.city_name,
        timezone: response.results.timezone,
      }
    }
    return { city_name: "", timezone: "" };
  }

  async getWeatherIcon(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.img_id;
    }
    return "";
  }

  async getWeatherCondition(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.condition_slug;
    }
    return "";
  }

  async getWeatherDescription(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.description;
    }
    return "";
  }

  async getTemperature(
    latitude: number,
    longitude: number
  ): Promise<number> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.temp;
    }
    return 0;
  }

  async getHumidity(
    latitude: number,
    longitude: number
  ): Promise<number> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.humidity;
    }
    return 0;
  }

  async getWindSpeed(
    latitude: number,
    longitude: number
  ): Promise<string> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.wind_speedy;
    }
    return "";
  }

  async getRain(
    latitude: number,
    longitude: number
  ): Promise<number> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.rain;
    }
    return 0;
  }

  async getCloudiness(
    latitude: number,
    longitude: number
  ): Promise<number> {
    const response: ResponseApi = (await axios.get<ResponseApi>(`https://api.hgbrasil.com/weather?lat=${latitude}&lon=${longitude}&key=45e3765d`)).data;

    if(response.results){
      return response.results.cloudiness;
    }
    return 0;
  }
}