import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: Item
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter<number>()

  deleteBtnClicked = () => {
    console.log(`Delete button was clicked on task id: ${this.item.id}"`)
    this.deleteEvent.emit(this.item.id)
  }
}
