import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  getDateToday(): string {
    var today = new Date();
    var todayToString = this.convertDateToStr(today);

    console.log(`Date Today: ${todayToString}`);

    return todayToString
  }

  convertDateToStr(date: Date): string {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    var dateString = yyyy + '-' + mm + '-' + dd;

    return dateString;
  }

  convertTime(time: string) : string {
    var timeArray = time.split(':');

    // fetch
    var hours = Number(timeArray[0]);
    var minutes = Number(timeArray[1]);

    // calculate
    var timeValue = "";

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

    return timeValue;
  }
}
