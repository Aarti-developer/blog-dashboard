import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  parmalink: any;
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;

  categories: any[] = [];
  postForm:FormGroup;
  constructor(private categoryServices: CategoriesService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title:['',[Validators.required, Validators.minLength(10)]],
      parmalink:['',[Validators.required]],
      excerpt:['',[Validators.required, Validators.minLength(50)]],
      postImg:['',[Validators.required]],
      content:['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    this.categoryServices.loadData().subscribe((val) => {
      this.categories = val;
    });
  }
  get fc(){
    return this.postForm.controls;
  }
  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.parmalink = title.replace(/\s/g, '-');
    // console.log(parmalink);
  }
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
}
