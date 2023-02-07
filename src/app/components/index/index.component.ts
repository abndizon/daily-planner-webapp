import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  items: Item[] = []
  category_id: number

  constructor(private itemService: ItemService) {}

  ngOnInit() : void {
    console.log("NgOnInit executing on index component..");
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
    })
  }

  formEventHandler = (payload : Item) => {
    console.log("Executing formEventHandler..");

    if (this.items.length > 0) {
      payload.id = (this.items[this.items.length-1].id as number) + 1;
    }
    else {
      payload.id = 1;
    }

    console.log(payload)
    this.items.push(payload)
  }

  setCategoryIdHandler = (payload: any) => {
    console.log("Executing setCategoryIdHandler..");

    this.category_id = payload.category_id
    console.log(`Category ID: ${this.category_id}`)
  }
}
