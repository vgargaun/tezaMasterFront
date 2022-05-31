import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Client } from "../../models/client";
import { Test } from "../../models/test";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  message?: string
  editCache: { [key: string]: { edit: boolean; data: Client } } = {};

  listOfData: Client[] = []
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
      }
    )
  }

  ngOnInit() {
    this.http.get<Client[]>("/api/getClientList")
    .subscribe(respons=>{
      this.listOfData = respons
     this.updateEditCache();
      console.log(respons)
    })

  }

}
