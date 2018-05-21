import { Component, OnInit } from '@angular/core';
import { Oppurtunities } from './Ioppurtunities';
import { OppurtunityService } from '../oppurtunity.service';

@Component({
  selector: 'app-oppurtunity',
  templateUrl: './oppurtunity.component.html',
  styleUrls: ['./oppurtunity.component.css']
})
export class OppurtunityComponent implements OnInit {

  // Form Data for Oppurtunities  
  title: string;
  applications_close_date: Date;
  earliest_start_date: Date;
  latest_end_date: Date;
  description: string;

  backgrounds: Array<string>;
  backgroundObject: Object = [
    {
      "label": "Preferred",
      "value": "Preferred"
    },
    {
      "label": "Required",
      "value": "Required"
    },
  ]
  backgroundOptions: string;

  skills: Array<string>;
  skillsObject: Object = [
    {
      "label": "Preferred",
      "value": "Preferred"
    },
    {
      "label": "Required",
      "value": "Required"
    },
    {
      "label": "Featured",
      "value": "Featured"
    }
  ]
  skillsOptions: string;

  selection_process: string;
  salary: number;


  thirtyDays: string;
  ninetyDays: string;
  //role_info.city

  postObject: any = {
    "title": "",
    "applications_close_date": "",
    "earliest_start_date": "",
    "latest_end_date": "",
    "description": "",
    "backgrounds": "",
    "skills": "",
    "selection_process": "",
    "salary": "",
  }

  oppurtunityID: Number = 6124;
  response:any;

  constructor(private _service: OppurtunityService) { }

  ngOnInit() {
    this.getThirty();
    this.getNinety();

    this._service.getSkills()
    .subscribe(data=>{
      
    })

  }
  getThirty(): string {
    return this.thirtyDays = new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  }
  getNinety(): string {
    return this.ninetyDays = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  }
  saveDetails(value) {
    this.postObject.title = value.title;
    this.postObject.applications_close_date = value.applications_close_date;
    this.postObject.earliest_start_date = value.earliest_start_date;
    this.postObject.latest_end_date = value.latest_end_date;
    this.postObject.description = value.description;
    this.postObject.skills = value.skills;
    this.postObject.selection_process = value.selection_process;
    this.postObject.backgrounds = value.backgrounds;
    this.backgroundOptions = value.backgroundOptions;
    this.skillsOptions = value.skillsOptions;

    console.log(JSON.stringify(this.postObject))

    this._service.postOppurtunity(this.postObject, this.oppurtunityID)
      .subscribe(data => {
        this.response = data
      })

  }

}
