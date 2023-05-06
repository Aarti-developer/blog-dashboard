import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: any;
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;
  post:any;
  categories: any;
  postForm!:FormGroup;
  constructor(private categoryService: CategoriesService, private fb: FormBuilder, private postService: PostsService, private route: ActivatedRoute ) {

    this.route.queryParams.subscribe(val =>{
      this.postService.loadOneData(val['id']).subscribe(post =>{
        this.post = post;
        console.log(post);
        this.postForm = this.fb.group({
          title:[this.post.title,[Validators.required, Validators.minLength(10)]],
          permalink:[this.post.permalink, Validators.required],
          excerpt:[this.post.excerpt,[Validators.required, Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg:['', Validators.required],
          content:[this.post.content, Validators.required],
        })
        this.imgSrc = this.post.postImgPath;
      })
      
    })

 
  }
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }
  get fc(){
    return this.postForm.controls;
  }
  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    // console.log(this.permalink);
  }
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
  onSubmit(){
   let splitted = this.postForm.value.category.split('-');
   console.log(splitted);
   
    const postData: Post = {
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId:splitted[0],
        category:splitted[1] 
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date(),
    }
    console.log(postData.category.category);

    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';

  }

}
