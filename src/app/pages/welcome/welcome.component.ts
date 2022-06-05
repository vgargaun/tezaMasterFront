import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Client } from "../../models/client";
import { ClientMessageSender } from "../../models/clientMessageSender";
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { formatDistance } from 'date-fns';
import { ClientReminder } from 'src/app/models/clientReminder';
import { ClientFeedback } from 'src/app/models/clientFeedback';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  message?: string
  editCache: { [key: string]: { edit: boolean; data: Client } } = {};

  listClientFeeedback : ClientFeedback[] = []
  listOfData: Client[] = []
  listClientReminder: ClientReminder[] = [];

  // listOfData: Client[] = [
  //   {
  //     id: "1",
  //     firstName: "Veceslav",
  //     lastName: "Gargaun",
  //     cheatId: "123456",
  //     enable: false,
  //     userName: "veceslav.gargaun"
  //   }, {
  //     id: "2",
  //     firstName: "Ion",
  //     lastName: "Constiu",
  //     cheatId: "ion.costiuc",
  //     enable: true,
  //     userName: "ion.costiuc"
  //   },
  //   {
  //     id: "3",
  //     firstName: "Vasile",
  //     lastName: "Constiu",
  //     cheatId: "vasile.costiuc",
  //     enable: true,
  //     userName: "vasile.costiuc"
  //   },
  //   {
  //     id: "4",
  //     firstName: "Iulian",
  //     lastName: "Suman",
  //     cheatId: "iulian.suman",
  //     enable: true,
  //     userName: "iulian.suman"
  //   },
  //   {
  //     id: "5",
  //     firstName: "Petru",
  //     lastName: "Ivan",
  //     cheatId: "12345456",
  //     enable: true,
  //     userName: "petru.ivan"
  //   },
  //   {
  //     id: "6",
  //     firstName: "Igor",
  //     lastName: "Dodon",
  //     cheatId: "12345456",
  //     enable: true,
  //     userName: "igor.dodon"
  //   },
  //   {
  //     id: "7",
  //     firstName: "Maia",
  //     lastName: "Sandu",
  //     cheatId: "12345456",
  //     enable: true,
  //     userName: "maia.sandu"
  //   }
  // ]

  size: 'large' = 'large';

  visible = false;
  tempClient?: Client;
  switchValue = this.tempClient?.enable;

  open(index: string): void {
    this.tempClient = this.editCache[index].data
    this.visible = true;
    this.imgBase64Path = "";
    this.switchValue = this.tempClient?.enable;

    //reminder
    this.reminderName = "";
    this.reminderMessage =""
    this.date = new Date(0, 0, 0, 0, 0, 0);
    this.time = "";

    this.http.get<ClientReminder[]>("/api/getClientReminderList?clientId="+this.tempClient.id).subscribe(
      response=>{
        this.listClientReminder = response;
        console.log(this.listClientReminder)
      }
    )

    this.http.get<ClientFeedback[]>("/api/getClientFeedBackList?clientId="+this.tempClient.id).subscribe(
      response=>{
        this.listClientFeeedback = response;
        console.log("feedback",this.listClientFeeedback)
      }
    )

  }

  deleteReminder(clientReminder ?: ClientReminder){
    this.http.post("/api/deleteClientReminder", clientReminder).subscribe(
      response=>{
        this.http.get<ClientReminder[]>("/api/getClientReminderList?clientId="+clientReminder?.clientId).subscribe(
          response=>{
            this.listClientReminder = response;
            console.log(this.listClientReminder)
          }
        )
      }
    )
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

  getData(i: string) {
    return this.editCache[i].data
  }


  Sned() {
    const clientMessageSender: ClientMessageSender = {
      message: this.message || 'test',
      cheatId: this.tempClient?.cheatId || "",
      photo : this.imgBase64Path
    }

    this.http.post('/api/sendMessage', clientMessageSender).subscribe(
      respons => {
        console.log(respons)
        this.message = "";
        this.imgBase64Path="";
        this.cardImageBase64 = "";
        this.isImageSaved = false;
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


  //modal

  clientReminder?: ClientReminder;
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  reminderName : string = "";
  reminderMessage : string = "";
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    console.log(this.time);

    this.clientReminder = {
      clientId : this.tempClient?.id,
      reminderName : this.reminderName,
      message : this.reminderMessage,
      date : this.date,
      hour : this.time
    }
    console.log(this.clientReminder)

    this.http.post('/api/addClientReminder', this.clientReminder).subscribe(
      respons => {
        console.log(respons)

        this.http.get<ClientReminder[]>("/api/getClientReminderList?clientId="+this.tempClient?.id).subscribe(
          response=>{
            this.listClientReminder = response;
            console.log(this.listClientReminder)
          }
        )
      }
    )




  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

date?: Date;
  //calendar
  onValueChange(value: Date): void {
    console.log(`Current value1: ${value}`);
    this.date = value;
  }



  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value2: ${change.date}`);
    console.log(`Current mode3: ${change.mode}`);
  }

  //ceas
  clock: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

  onValueTime(){
    console.log(this.time);
  }

  //selector tabela
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Client[] = [];
  listOfDatae: readonly Client[] = [];
  setOfCheckedId = new Set<string>();

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Client[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  //modal 
  panels = [
    {
      active: true,
      name: 'Socializare',
      disabled: false,
      message: "12.25.2022 Cosmin are socializare"
    },
    {
      active: false,
      name: 'Terapie',
      disabled: false,
      message: '12.27.2022 Cosmin are terapie. Sunteti rugata sa-l aduceti la timp in caz contrar futtio acasa'
    }
  ];

  //photo
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  imgBase64Path : string = '';
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;         
          this.isImageSaved = true;
          this.imgBase64Path = imgBase64Path;
          console.log(imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }}

  //mass mesage modal
  isVisibleMassMessage = false;

  showModalMassMessage(): void {
    this.isVisibleMassMessage = true;
  }

  handleOkMassMessage(): void {
    this.isVisibleMassMessage = false;

    const clientMessageSender: ClientMessageSender = {
      message: this.message || 'test',
      cheatId: this.tempClient?.cheatId || "",
      photo : this.imgBase64Path
    }

    console.log("sender",clientMessageSender)

    this.http.post('/api/sendMassMessage', clientMessageSender).subscribe(
      respons => {
        console.log(respons)
        this.message = "";
        this.imgBase64Path="";
        this.cardImageBase64 = "";
        this.isImageSaved = false;
      }
    )
  }

  handleCancelMassMessage(): void {
    console.log('Button cancel clicked!');
    this.isVisibleMassMessage = false;
  }

  //DeleteClient

  deleteClient(tempClient : Client):void {
    console.log(tempClient)
    this.http.post('/api/deleteClient', tempClient).subscribe(
      respons => {
        console.log(respons)
        this.message = "";
      }
    )
  }
  //Swich

  clickSwitch(){
    this.listOfData.forEach(
      client=>{

        if(client.id==this.tempClient?.id){
console.log(this.switchValue)
this.switchValue = true;

console.log(this.switchValue)

        }
      }
    )
  }

  programare: string = "Reminder"
  ngOnInit() {
    this.http.get<Client[]>("/api/getClientList")
    .subscribe(respons=>{
      this.listOfData = respons
    this.updateEditCache();
      console.log(respons)
    })

  }

}
