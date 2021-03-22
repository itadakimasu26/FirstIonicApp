import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private menu:MenuController) { }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit() {
    try {
      
    } catch (error) {
      console.log(error)
  }
    }

}