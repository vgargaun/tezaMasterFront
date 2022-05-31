import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Client } from "../../models/client";
import { Test } from "../../models/test";

import { formatDistance } from 'date-fns';


@Component({
  selector: 'app-mass-mailing',
  templateUrl: './mass-mailing.component.html',
  styleUrls: ['./mass-mailing.component.css']
})
export class MassMailingComponent implements OnInit {


  ngOnInit() {

  }

}
