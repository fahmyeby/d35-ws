import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list',
  standalone: false,
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent implements OnInit {
  cities: string[] = [
    'Singapore',
    'Kuala Lumpur',
    'Tokyo',
    'Bangkok',
    'Hong Kong',
    'Beijing',
  ];
  cityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.cityForm = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    // Load cities from local storage
    this.loadCitiesFromLocalStorage();
  }

  addCity(): void {
    if (this.cityForm.valid) {
      const newCity = this.cityForm.get('cityName')?.value?.trim();

      // Check if the city is not already in the list (case-insensitive)
      if (
        newCity &&
        !this.cities.some(
          (city) => city.toLowerCase() === newCity.toLowerCase()
        )
      ) {
        this.cities.push(newCity);
        this.saveCitiesToLocalStorage();
        this.cityForm.reset();
      }
    }
  }

  viewCityWeather(city: string): void {
    this.router.navigate(['/weather', city]);
  }

  deleteCity(city: string, event: MouseEvent): void {
    event.stopPropagation();
    this.cities = this.cities.filter((c) => c !== city);
    this.saveCitiesToLocalStorage();
  }

  private saveCitiesToLocalStorage(): void {
    localStorage.setItem('weatherAppCities', JSON.stringify(this.cities));
  }

  private loadCitiesFromLocalStorage(): void {
    const savedCities = localStorage.getItem('weatherAppCities');
    if (savedCities) {
      try {
        this.cities = JSON.parse(savedCities);
      } catch (error) {
        console.error('Error parsing cities from local storage:', error);
      }
    }
  }
}
