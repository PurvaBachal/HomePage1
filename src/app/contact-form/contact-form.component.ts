import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit{
  signupForm! : FormGroup;
  formSubmitted = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(){
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      subject: ['',[Validators.required]],
      message: ['', Validators.required]
    });
  }
  

  onSubmit() {
    console.log("Form submitted!");
    console.log('Submitting form...');
    if (this.signupForm.invalid) {
      return;
    }

    console.log('Form submitted successfully');

    // Create an object with the form data
    const formData = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      subject: this.signupForm.get('subject')?.value,
      message: this.signupForm.get('message')?.value
    };

    // Send a POST request to Firebase Realtime Database
    this.http.post('https://contact-forms-6520a-default-rtdb.firebaseio.com/contacts-us.json', formData)
      .subscribe({
        next: response => {
          console.log('Data stored in Firebase Realtime Database');
          if (!this.formSubmitted) {
            this.formSubmitted = true;
            this.signupForm.reset();
            this.router.navigate(['/thankyou']);
          }
        },
        error: error => {
          console.error('Error storing data in Firebase Realtime Database');
          console.error(error);
        }
      });
  }

  }



