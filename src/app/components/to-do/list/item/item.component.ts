import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { throwError } from 'rxjs';
import { Item } from 'src/app/models/item';
import { DatetimeService } from 'src/app/services/datetime.service';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: Item
  itemIsChecked: boolean
  startTime: string
  endTime: string

  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>()
  @Output() statusChangedEvent: EventEmitter<number> = new EventEmitter<number>()

  constructor (private itemService: ItemService, private dateTimeService: DatetimeService) {}

  ngOnInit(): void {
    console.log("NgOnInit executing on item component..");
    if (this.item.statusId == 1) {
      this.itemIsChecked = false;
    } 
    else if (this.item.statusId == 2) {
      this.itemIsChecked = true;
    }

    this.startTime = this.dateTimeService.convertTime(this.item.startTime)
    this.endTime = this.dateTimeService.convertTime(this.item.endTime)
  }

  deleteBtnClicked = () => {
    console.log(`Delete button was clicked on task id: ${this.item.id}, task name: ${this.item.name}"`)
    this.itemService.deleteItem(this.item).subscribe(() => {
      alert(`${this.item.name} deleted`)
      this.deleteEvent.emit(this.item.id)
    });
  }

  updateStatus = () => {
    if (this.item.statusId == 1) {
      console.log(`Updating status of item: ${this.item.name} to Done`)
      this.item.statusId = 2;
    }
    else if (this.item.statusId == 2) {
      console.log(`Updating status of item: ${this.item.name} to To-Do`)
      this.item.statusId = 1;
    }

    this.itemService.saveItem(this.item).subscribe(
      () => {
        this.statusChangedEvent.emit();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`Error status : ${error.message}`);
            alert(error.statusText)

            if (error.status == 422) {
              var errObj = error.error;
              for (const value of Object.values(errObj)) {
                console.log("Logging error messages from server..");
                var listOfValue = value as Array<string>;
                if (listOfValue.length > 0) {
                  for (const errMessage of Object.values(listOfValue)) {
                    console.log(errMessage);
                  }
                }
              }
            }
          }
        } else {
          console.error("Some thing else happened");
        }
        return throwError(error);
      });
  }
}
