import { Component, OnInit } from '@angular/core';
import {  AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
// firestore
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  categoryArray:  any[] =[];
  formCategory:string = '';
  formStatus:string = 'Add';
  categoryId:string= ''; 
  constructor( private categoryServices:CategoriesService ){}
  ngOnInit(): void {
    this.categoryServices.loadData().subscribe( val =>{
      this.categoryArray = val;
      console.log(val); 
    })
  }
  // formData :any;
  onSubmit(formData:any){
    let categoryData = {
      category:formData.value.category
    }
    if (this.formStatus == 'Add') {
      // console.log(categoryData);  
      this.categoryServices.saveData(categoryData);
      formData.reset();
    }
    else if(this.formStatus == 'Edit'){
      this.categoryServices.updateData(this.categoryId,categoryData );

    }
   
  }
  onEdit(category:any,id:any){
    console.log(category);
    this.formCategory = category;
    this.formStatus = 'Edit'; 
    this.categoryId = id; 
  }
  
}
