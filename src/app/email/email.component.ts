import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'hd-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  email: any;
  password: any;

  constructor(public af: AngularFireAuth,private router: Router) {
    this.af.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }


  onSubmit(formData) {
    if(formData.valid) {
      this.email = formData.value.email;
      this.password = formData.value.password;
      console.log(formData.value);
      this.af.auth.signInWithEmailAndPassword(this.email, this.password).then((success) => {
          this.router.navigate(['/members']);
        }).catch(
        (err) => {
          this.error = err;
        })
    }
  }

  ngOnInit() {
  }

}
