import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/to-do/item.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  id: number
  item: Item = {
    name: "",
    categoryId: 0,
    date: "",
    startTime: "",
    endTime: ""
  }

  constructor(
    private route: ActivatedRoute,
    private todoItemsService: ItemService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    console.log(`ShowComponent for id ${this.id}`)

    this.todoItemsService.getItemById(this.id).subscribe((item) => {
      this.item = item
    })
  }
}
