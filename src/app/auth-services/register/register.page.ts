import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = ''
  password: string = ''
  cpassword: string = ''
  message: string = ''

  clearEmail: string = ''
  clearPassword: string = ''
  clearCpassword: string = ''

  constructor(public afAuth: AngularFireAuth, private router: Router, public alert: AlertController) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  clearFields(){
    this.clearEmail = null
    this.clearPassword = null
    this.clearCpassword = null
  }

  async errorAlerts(err) {

    switch (err) {
      case "Password don't match!":
        this.message = "Password don't match!"
        break
      case "auth/email-already-in-use":
        this.message = "Email is already in use!";
        break
      case 'auth/invalid-email':
        this.message = "Invalid Email Address!"
        break;
    }

    const alert = await this.alert.create({
      cssClass: 'errorAlerts',
      message: this.message,
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]
    });
    await alert.present();
    return
  }

  async registered() {

    const alert = await this.alert.create({
      cssClass: 'registered',
      message: 'Account Succesfully Created!',
      buttons: [
        {
          text: 'GO BACK TO LOGIN',
          handler: () => {
            this.clearFields()
            this.router.navigate(['/login'])
          }
        },
        {
          text: 'CREATE ANOTHER ACCOUNT',
          handler: () => {
            this.clearFields()
          }
        }
      ]
    });

    await alert.present();
  }

  async register() {
    const { email, password, cpassword } = this
    if (password !== cpassword) {
      this.errorAlerts("Password don't match!")
      return
    } else {
      try {
        await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        this.registered()

      } catch (error) {
        this.errorAlerts(error.code)
      }
      return
    }
  }
}
