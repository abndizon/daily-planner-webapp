import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { DatetimeService } from 'src/app/services/datetime.service';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Output() formEvent: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() formselectCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dateTimeService : DatetimeService) {}

  @Input() item: Item = {
    name: "",
    categoryId: 1,
    date: this.dateTimeService.getDateToday(),
    startTime: "",
    endTime: ""
  }

  @Input() categories: Category[] = [
    {
      id: 1,
      name: "Personal"
    },
    {
      id: 2,
      name: "Work"
    },
  ]

  addBtnClicked = () => {
    console.log("Add Button was clicked. Adding this item to data.. ");
    console.log(this.item);
    
    let itemCopy = {...this.item};

    this.formEvent.emit(itemCopy);

    // Reset Form
    this.item.name = "";
    this.item.categoryId = 1;
    this.item.date = this.dateTimeService.getDateToday();
    this.item.startTime = "";
    this.item.endTime = "";
  }

  categorySelected = (payload:any) => {
    console.log(`Category ID selected: ${payload.target.value}`);
    this.formselectCategory.emit({category_id:payload.target.value});
  }
}
