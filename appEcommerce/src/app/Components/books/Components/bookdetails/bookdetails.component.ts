import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Components/authentication/Services/authentication.service';
import { PostComment } from 'src/app/Models/postComment';
import { CommentService } from 'src/app/Services/comment/comment.service';
import { Book } from '../../Models/book';
import { BooksService } from '../../Services/books.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
  providers:[BooksService]
})
export class BookdetailsComponent implements OnInit {

  book:Book;

  comments: PostComment[]=[];

  userId:any;

  useremail:any;

  constructor(private bookservice:BooksService, private activatedRound:ActivatedRoute, private commentService:CommentService, private router:Router, private authservice:AuthenticationService) { }

  ngOnInit(): void {

    this.activatedRound.params.subscribe(params=>{
      this.bookservice.getBookById(params["bookId"]).subscribe(data=>{this.book=data});
    })


    setInterval(() => {

      this.authservice.user.subscribe(user=>{

        if(user){

          this.userId = user.id;

          this.useremail=user.email;


          this.commentService.getComment().subscribe(data=>{

            this.comments=data;

            this.comments.forEach(element => {
              console.log(element);
            });

          },error=>{console.log(error)});


        }

      });

    }, 1000);

  }


  commentform = new FormGroup({

    commnettext: new FormControl("Comment",[Validators.required, Validators.minLength(1)]),



  });


  postComment()
  {
    const comment = {
      commnettext:this.commentform.value.commnettext,
      userId:this.userId,
      useremail:this.useremail
    }


    this.commentService.postComment(comment).subscribe(data => {console.log(data);});
  }

}
