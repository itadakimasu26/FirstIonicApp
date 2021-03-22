// UTILS
import { error, stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
// ROUTER
import { Router } from '@angular/router';
// FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ''
  password: string = ''
  message: string = ''

  clearEmail: string = ''
  clearPassword: string = ''

  constructor(public afAuth: AngularFireAuth, private router: Router, public alert: AlertController, 
    public load:LoaderService) { }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  goToPasswordReset(){
    this.router.navigate(['/forgot-password']);
  }

  clearFields(){
    this.clearEmail = null
    this.clearPassword = null
  }

  async errorAlerts(err) {
    console.log(err)
    switch (err) {
      case 'auth/user-not-found':
        this.message = "User Not Found!"
        break;
      case 'auth/wrong-password':
        this.message = "Wrong Password!"
        break;
      case 'auth/invalid-email':
        this.message = "Invalid Email Address!"
        break;
      default:
        this.message = "Disabled Account!"
        break;
    }

    const alert = await this.alert.create({
      cssClass: 'errorAlerts',
      message: this.message,
      buttons:[
        {
          text: 'CLOSE',
          handler: () => {
            console.log('');
          }
        },
        {
          text: 'RESET PASSWORD',
          handler: () => {
            this.goToPasswordReset()
          }
        }
      ],
    });

    await alert.present();
    
  }

  async login() {
    const { email, password } = this
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      this.clearFields()
      this.router.navigate(['/dashboard'])
    } catch (error) {
      this.errorAlerts(error.code)
    }

    return;
  }

  async  loginWithGoogle(){
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
