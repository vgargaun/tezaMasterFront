import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Client } from "../../models/client";
import { Test } from "../../models/test";

import { formatDistance } from 'date-fns';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  message?: string
  editCache: { [key: string]: { edit: boolean; data: Client } } = {};

  // listOfData: Client[] = []

  listOfData: Client[] = [
    {
      id : "1",
      firstName : "Veceslav",
      lastName : "Gargaun",
      cheatId : "123456",
      enable : true,
      userName : "user"
    },{
    id : "2",
    firstName : "Ion",
    lastName : "Constiu",
    cheatId : "12345456",
    enable : true,
    userName : "user2"
    }
  ]


  visible = false;
  tempClient ?: Client;

  open(index : string): void {
    console.log(index)
    this.tempClient = this.editCache[index].data
    console.log(this.tempClient)
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });

    console.log(this.editCache)
  }

  getData(i : string) {
    return this.editCache[i].data
  }


  Sned(){
    const test : Test ={
      message: this.message || 'test',
      cheatId : this.tempClient?.cheatId || ""
        }

    this.http.post('/api/sendMessage', test).subscribe(
      respons =>{
        console.log(respons)
        this.message = "";
      } 
    )
  }

  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }

  switchValue = false;


//modal
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  programare : string = "Programare la consultatie"
  ngOnInit() {
    // this.http.get<Client[]>("/api/getClientList")
    // .subscribe(respons=>{
    //   this.listOfData = respons
     this.updateEditCache();
    //   console.log(respons)
    // })

  }

}
