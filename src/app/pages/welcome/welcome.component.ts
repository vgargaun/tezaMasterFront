import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Client } from "../../models/client";
import { Test } from "../../models/test";
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { formatDistance } from 'date-fns';

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


  //calendar
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  //ceas
  clock: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

  //titlu
  value?: string;

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
  fileList: NzUploadFile[] = [
    
     
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.response) {
      file.response = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.response;
    this.previewVisible = true;
  };

  programare : string = "Reminder"
  ngOnInit() {
    // this.http.get<Client[]>("/api/getClientList")
    // .subscribe(respons=>{
    //   this.listOfData = respons
     this.updateEditCache();
    //   console.log(respons)
    // })

  }

}
