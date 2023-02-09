import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { DatetimeService } from 'src/app/services/datetime.service';
import { CategoryService } from 'src/app/services/to-do/category.service';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Output() formEvent: EventEmitter<Item> = new EventEmitter<Item>();

  item: Item = {
    name: "",
    categoryId: 1,
    date: this.dateTimeService.getDateToday(),
    startTime: "",
    endTime: "",
    statusId: 1
  }

  errorMessages: string[] = []
  id: number
  btnLabel: string = "Add"
  successMsg = "created"
  title = "Add"

  categories: Category[] = []

  constructor(private dateTimeService: DatetimeService, private itemService: ItemService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    console.log(`Id of form component: ${this.id}`)

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories
    })

    if (this.id > 0) {
      this.itemService.getItemById(this.id).subscribe((item) => {
        this.item = item

        var date = new Date(this.item.date);
        this.item.date = this.dateTimeService.convertDateToStr(date);
      })

      this.btnLabel = "Save";
      this.successMsg = "updated"
      this.title = "Edit"
    }
  }

  addBtnClicked = () => {
    console.log("Add Button was clicked. Adding this item to data.. ");
    console.log(this.item);

    let itemCopy = { ...this.item };
    var item1;

    this.itemService.saveItem(itemCopy).subscribe(
      (item) => {
        item1 = item

        if(confirm(`Item ${this.successMsg}`)){
          window.location.href="/";
        }
        
        // Reset Form
        this.item.name = "";
        this.item.categoryId = 1;
        this.item.date = this.dateTimeService.getDateToday();
        this.item.startTime = "";
        this.item.endTime = "";
        this.errorMessages = []
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
                    this.errorMessages.push(errMessage);
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

  categorySelected = () => {
    console.log(`Category ID selected: ${this.item.categoryId}`);
  }

  nameChanged = () => {
    console.log(`Name changed: ${this.item.name}`);
  }
}
