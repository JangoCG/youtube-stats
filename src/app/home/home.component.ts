import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ElectronService} from "../core/services";
import {Subscription} from "rxjs";
import {DataService} from "../core/services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  channelInfo: any;
  channelSubscription: Subscription;

  constructor(private router: Router, private electron: ElectronService, private data: DataService) { }

  ngOnInit(): void {
    this.channel('UCVyRiMvfUNMA1UPlDPzG5Ow');
  }

  minimizeWindow() {
    this.electron.window.minimize();

  }

  closeWindow() {
    this.electron.window.close();
  }

  channel(name) {
    if(this.channelSubscription)
      this.channelSubscription.unsubscribe();

    this.channelSubscription = this.data.getStats(name).subscribe(res => {
      this.channelInfo = res;
      console.log(res);
    });
  }
}
