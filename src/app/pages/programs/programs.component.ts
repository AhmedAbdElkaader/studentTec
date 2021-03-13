import { Component, OnInit } from '@angular/core';
import *  as  data from '../../data.json';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  Data: any = (data as any).default;
  Cities = [];
  Fields = []
  Schools = []
  Program = []
  Languge = []
  selectedCity = [];
  SelctedSchool = []
  SelctedFields = []
  selctedProgram = []
  arrOfAll = []
  sortArr = ['Price : low to hight', 'Price : hight to low ']
  Form: FormGroup
  FormForSort: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      radioButtons: new FormControl(''),
    })
    this.FormForSort = new FormGroup({
      radioButtonSortLowToHight: new FormControl(''),
    })
    for (let i = 0; i < this.Data.length; i++) {
      this.Cities.push(this.Data[i].city)
      this.Fields.push(this.Data[i].type)
      this.Schools.push(this.Data[i].school)
      this.Program.push(this.Data[i].level)
      this.Languge.push(this.Data[i].Language)
    }
    this.Cities = this.fiterArr(this.Cities)
    this.Fields = this.fiterArr(this.Fields)
    this.Schools = this.fiterArr(this.Schools)
    this.Program = this.fiterArr(this.Program)
    this.Languge = this.fiterArr(this.Languge)
    this.filterMianArr(this.Data)
  }


  filterMianArr(arr) {
    arr.forEach(function (value) {
      value.city = value.city.toLowerCase()
      value.type = value.type.toLowerCase()
      value.level = value.level.toLowerCase()
      value.school = value.school.toLowerCase()
    });
  }
  fiterArr(arr) {
    arr = arr.map(function (v) {
      return v.toLowerCase();
    });
    arr = arr.map(function (v) {
      return v.trim();
    });
    arr = [...new Set(arr)]
    arr = arr.filter(e => e !== '-');
    return arr
  }

  ifCity = []
  ifFiled
  ifSchool
  ifProgram
  
  showFilterResult() {
    this.Data = (data as any).default;
    this.selctedProgram = []
    if (this.Form.value.radioButtons != "") {
      this.selctedProgram.push(this.Form.value.radioButtons)
      this.ifProgram = this.selctedProgram
    } else {
      this.ifProgram = this.Program
    }
    if (this.selectedCity.length == 0) {
      this.ifCity = this.Cities
    } else {
      this.ifCity = this.selectedCity
      console.log(this.selectedCity)
    }
    if (this.SelctedFields.length == 0) {
      this.ifFiled = this.Fields
    } else {
      this.ifFiled = this.SelctedFields
    }
    if (this.SelctedSchool.length == 0) {
      this.ifSchool = this.Schools
    } else {
      this.ifSchool = this.SelctedSchool
    }

    let bigCities = this.Data.filter((elment) =>
      this.ifCity.includes(elment.city) &&
      this.ifSchool.includes(elment.school) &&
      this.ifFiled.includes(elment.type) &&
      this.ifProgram.includes(elment.level));
    if (this.FormForSort.value.radioButtonSortLowToHight == "" || this.FormForSort.value.radioButtonSortLowToHight == "Price : low to hight") {
      bigCities = bigCities.sort(function (a, b) {
        return parseFloat(a.fee) - parseFloat(b.fee);
      });
    } else {
      bigCities = bigCities.sort(function (a, b) {
        return parseFloat(b.fee) - parseFloat(a.fee);
      });
    }
    this.Data = bigCities
    console.log(bigCities)

  }
}
