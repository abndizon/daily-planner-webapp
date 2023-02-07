import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() {}

  getDateToday(): string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var todayToString = yyyy + '-' + mm + '-' + dd ;
    console.log(`Date Today: ${todayToString}`);

    return todayToString
  }
}
