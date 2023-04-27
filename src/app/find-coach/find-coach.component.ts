import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-find-coach',
  templateUrl: './find-coach.component.html',
  styleUrls: ['./find-coach.component.css']
})
export class FindCoachComponent implements OnInit {
  CoachForm!: FormGroup;
  coaches: any[] = [];
  submitted = false;
  error = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.CoachForm = new FormGroup({
      location: new FormControl('', Validators.required),
      sport: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const location = encodeURIComponent(this.CoachForm.get('location')?.value);
    const sport = encodeURIComponent(this.CoachForm.get('sport')?.value);
    const url = `https://search-coach-default-rtdb.firebaseio.com/coaches.json?orderBy="location"&startAt="${location}_${sport}"&endAt="${location}_${sport}\uf8ff"`;

  
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.coaches = Object.values(data);
        this.submitted = true; // set submitted to true
      },
      error: (error: any) => {
        console.log(error);
        this.error = 'An error occurred while fetching coaches. Please try again later.';
      }
    });
  }
  
}
