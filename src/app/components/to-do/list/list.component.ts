import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { DatetimeService } from 'src/app/services/datetime.service';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private dateTimeService : DatetimeService) {}

  @Input() items: Item[] = [];

  getDateToday() : string {
    return this.dateTimeService.getDateToday()
  }

  deleteEventHandler = (id : number) => {
    console.log("Executing deleteEventHandler..");
    
    var taskCount = 0;
    const indexOfItem = this.items.findIndex((x) => {
      if (x.id === id) {
        console.log(`Task id ${id} found: ${x.name}`); 
        taskCount++;
      }
      return x.id === id;
    });

    console.log(`# of tasks with id ${id}: ${taskCount}`);

    if (indexOfItem !== -1) {
      console.log(`Delete at Index: ${indexOfItem}`);
      this.items.splice(indexOfItem, 1);
    }
  }
}
