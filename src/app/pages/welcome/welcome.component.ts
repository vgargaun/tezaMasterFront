import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from "../../models/client";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  arr = [1, 2, 3,4, 5, 5]

  listOfData: Client[] = [
    {
        id : "1",
        firstName : "veceslav",
        lastName : "gargaun",
        cheatId : "sdfsdfsd",
        userName: "bomba"
    },
    {
      id : "2",
      firstName : "veceslav",
      lastName : "gargaun",
      cheatId : "sdfsdfsd",
      userName: "bomba"
  }
]

  ngOnInit() {
    this.http.get("http//127.0.0.1:8080/getClientList")
    .subscribe(respons=>{
      console.log(respons)
    })
  }

}
