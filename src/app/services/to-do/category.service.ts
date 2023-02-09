import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  baseUrl : string = 'http://localhost:5148'

  constructor(private http: HttpClient) { }

  getAllCategories = (): Observable<Category[]> => {
    let categories: Observable<Category[]>;
    categories = this.http.get<Category[]>(`${this.baseUrl}/categories`, httpOptions);

    return categories;
  }

  getCategoryById = (id: number) : Observable<Category> => {
    let category: Observable<Category>

    category = this.http.get<Category>(`${this.baseUrl}/categories/${id}`, httpOptions)
    return category;
  }

  saveCategory = (category: Category) : Observable<Category> => {
    return this.http.post<Category>(`${this.baseUrl}/categories`, category, httpOptions);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}/categories/delete/${category.id}`);
  }
}
