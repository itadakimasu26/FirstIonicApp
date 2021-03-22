// UTILS
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
// ROUTER
import { Router } from '@angular/router';
// FIREBASE
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string = ''
  clearEmail: string = ''

  constructor(public afAuth: AngularFireAuth, private router: Router, public alert: AlertController,
    public load: LoaderService) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async resetPassword() {
    await this.afAuth.auth.sendPasswordResetEmail(this.email)
    this.clearEmail = null
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
