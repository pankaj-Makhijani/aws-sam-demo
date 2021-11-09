import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Console } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'samfrontend';
  booktitle='';
  book:any;
  message:any;
  books:any=[]
  constructor(private http:HttpClient){}
  onCreateBook(createBook:any){
    //  console.log(createBook);
     createBook.title=this.booktitle;
    //  createBook = JSON.stringify({"title": this.booktitle})
     console.log(createBook)
     console.log(typeof createBook)
     var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
   });
     this.http.post(`https://38krqssli8.execute-api.us-east-1.amazonaws.com/Prod/books`, createBook)
      .subscribe(res=>{
        this.message="book created successfully";
      },(err)=>{
        this.message=JSON.stringify(err.message);
    })
  }

  onUpdateItem(Id:any, Item:any){
    console.log(Id)
    console.log(Item.value)
    this.book = {
      id: Id,
      title: Item.value
    }
    console.log(this.book)
    var reqHeader = new HttpHeaders({ 
     'Content-Type': 'application/json',
  });
    this.http.put(`https://38krqssli8.execute-api.us-east-1.amazonaws.com/Prod/books`, this.book)
     .subscribe(res=>{
       this.message="Book Updated Successfully";
     },(err)=>{
       this.message=JSON.stringify(err);
   })
  }

  onDeleteItem(Id:any){
    console.log(Id)
    this.book = {
      id: Id
    }
    console.log(this.book)
    var reqHeader = new HttpHeaders({ 
     'Content-Type': 'application/json',
  });
    this.http.delete(`https://38krqssli8.execute-api.us-east-1.amazonaws.com/Prod/books?id=${Id}`, this.book)
     .subscribe(res=>{
       this.message="book deleted successfully";
     },(err)=>{
       this.message=JSON.stringify(err);
   })
  }

  onGetBooks(){ 
    this.http.get(`https://38krqssli8.execute-api.us-east-1.amazonaws.com/Prod/books`)
     .subscribe(res=>{
       this.books=res
     },(err)=>{
       this.message=JSON.stringify(err.message);
   })
 }
}
