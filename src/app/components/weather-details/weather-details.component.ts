import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-details',
  standalone: false,
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent implements OnInit {
  city: string = '';
  weatherData: WeatherData | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    // Get city name from route parameter
    this.city = this.route.snapshot.paramMap.get('city') || '';
    
    if (this.city) {
      this.fetchWeatherData();
    } else {
      this.router.navigate(['']);
    }
  }

  /**
   * Fetches weather data for the current city
   */
  fetchWeatherData(): void {
    this.loading = true;
    this.error = null;
    
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  /**
   * Navigates back to the city list
   */
  goBack(): void {
    this.router.navigate(['']);
  }
  
  /**
   * Formats a Unix timestamp to a readable time string
   * @param timestamp Unix timestamp (seconds)
   * @returns Formatted time string
   */
  formatTime(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString();
  }
}
