import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { WeatherData } from '../model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly API_KEY = 'ae4319e617c58f199446922cb5fb74af';
  private readonly API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  constructor(private httpClient: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.API_URL}?q=${city}&appid=${this.API_KEY}&units=metric`;
    return this.httpClient.get<WeatherData>(url);
  }
}
