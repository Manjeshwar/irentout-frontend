import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public url;
  public breadcrum;

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        this.url=event.url;
        this.breadcrum = this.url.match(/[^\/]+$/)[0];
      }
    });
  }

}
