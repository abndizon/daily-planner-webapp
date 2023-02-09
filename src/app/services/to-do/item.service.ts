import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from 'src/app/models/item';
import { catchError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  baseUrl : string = 'http://localhost:5148'

  constructor(private http: HttpClient) { }

  getAllItems = (): Observable<Item[]> => {
    let items: Observable<Item[]>;
    items = this.http.get<Item[]>(`${this.baseUrl}/todo_items`, httpOptions);

    return items;
  }

  getItemById = (id: number) : Observable<Item> => {
    let item: Observable<Item>
    item = this.http.get<Item>(`${this.baseUrl}/todo_items/${id}`, httpOptions)
    
    return item;
  }

  getItemsByDate = (date: string): Observable<Item[]> => {
    let items: Observable<Item[]>;
    items = this.http.get<Item[]>(`${this.baseUrl}/todo_items/date/${date}`, httpOptions);

    return items;
  }

  getItemsByCategoryAndDate = (id: number, date: string): Observable<Item[]> => {
    let items: Observable<Item[]>;
    items = this.http.get<Item[]>(`${this.baseUrl}/todo_items/category/${id}/date/${date}`, httpOptions);

    return items;
  }

  saveItem = (item: Item) : Observable<Item> => {
    return this.http.post<Item>(`${this.baseUrl}/todo_items`, item, httpOptions)
  }

  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(`${this.baseUrl}/todo_items/delete/${item.id}`);
  }

  getItemsForDate = (date : string): Item[] => {
    let allItems: Item[] = [];
    let itemsForDate: Item[] = [];

    this.getAllItems().subscribe((itemsParam) => {
      allItems = itemsParam;
    })

    itemsForDate = allItems.filter((i) => {
      return i.date === date;
    });

    return itemsForDate;
  }
}
