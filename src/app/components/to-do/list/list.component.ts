import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { DatetimeService } from 'src/app/services/datetime.service';
import { CategoryService } from 'src/app/services/to-do/category.service';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  categories: Category[] = [];
  allItems: Item[] = [];
  displayItems: Item[] = [];
  dateFilter: string;
  categoryIdFIlter: number
  done: number = 0
  unDone: number = 0

  constructor(private dateTimeService: DatetimeService, private categoryService: CategoryService, private itemService: ItemService) { }

  ngOnInit(): void {
    console.log("NgOnInit executing on list component..");
    this.dateFilter = this.dateTimeService.getDateToday();
    this.categoryIdFIlter = 0;

    this.refreshItems();

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  getDateToday = (): string => {
    return this.dateTimeService.getDateToday()
  }

  filter = () => {
    console.log(`Filter Category selected: ${this.categoryIdFIlter}`);
    console.log(`Filter Date selected: ${this.dateFilter}`)

    this.unDone = 0;
    this.done = 0;

    if (this.categoryIdFIlter == 0) {
      console.log("called getItemsByDate")
      this.refreshItems();
    }
    else {
      console.log("called getItemsByDateAndCategory")

      this.itemService.getItemsByCategoryAndDate(this.categoryIdFIlter, this.dateFilter).subscribe((items) => {
        items.forEach((x) => {
          var date = new Date(x.date);
          x.date = this.dateTimeService.convertDateToStr(date);

          if (x.statusId == 1) {
            this.unDone = this.unDone + 1;
          }
          else if (x.statusId == 2) {
            this.done = this.done + 1;
          }
        });
        this.displayItems = items;
      })
    }
  }

  refreshItems = () => {
    this.itemService.getItemsByDate(this.dateFilter).subscribe((items) => {
      this.allItems = items;

      this.allItems.forEach((x) => {
        var date = new Date(x.date);
        x.date = this.dateTimeService.convertDateToStr(date);

        if (x.statusId == 1) {
          this.unDone = this.unDone + 1;
        }
        else if (x.statusId == 2) {
          this.done = this.done + 1;
        }
      });

      this.displayItems = this.allItems;
    })
  }

  deleteEventHandler = (id: number) => {
    console.log("Executing deleteEventHandler..");

    var taskCount = 0;
    const indexOfItem = this.displayItems.findIndex((x) => {
      if (x.id === id) {
        console.log(`Task id ${id} found: ${x.name}`);
        taskCount++;
      }
      return x.id === id;
    });

    console.log(`# of tasks with id ${id}: ${taskCount}`);

    if (indexOfItem !== -1) {
      this.displayItems.splice(indexOfItem, 1);
    }
  }

  statusChangedHandler = () => {
    console.log(`Undone ${this.unDone}`);
    console.log(`Done ${this.done}`);
  }

  countToDoStatus = (statusId: number) => {
    if (statusId == 1) {
      this.unDone = this.unDone + 1;
    }
    else if (statusId == 2) {
      this.done = this.done + 1;
    }
  }
}
