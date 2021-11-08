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
     createBook.title=this.booktitle
     console.log(createBook)
     var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
   });
     this.http.post(`https://kz67v3rk25.execute-api.us-east-1.amazonaws.com/Prod/books`,{Headers: reqHeader}, createBook)
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
      "id": Id,
      "title": Item.value
    }
    console.log(this.book)
    var reqHeader = new HttpHeaders({ 
     'Content-Type': 'application/json',
  });
    this.http.put(`https://kz67v3rk25.execute-api.us-east-1.amazonaws.com/Prod/books`,{Headers: reqHeader}, this.book)
     .subscribe(res=>{
       this.message="Book Updated Successfully";
     },(err)=>{
       this.message=JSON.stringify(err);
   })
  }

  async onDeleteItem(Id:any){
    console.log(Id)
    this.book = `{id: ${Id}}`
    console.log(this.book)
    var reqHeader = new HttpHeaders({ 
     'Content-Type': 'application/json',
  });
    this.http.delete(`https://kz67v3rk25.execute-api.us-east-1.amazonaws.com/Prod/books`, this.book)
     .subscribe(res=>{
       this.message="book deleted successfully";
     },(err)=>{
       this.message=JSON.stringify(err.message);
   })
  }

  onGetBooks(){ 
    this.http.get(`https://kz67v3rk25.execute-api.us-east-1.amazonaws.com/Prod/books`)
     .subscribe(res=>{
       this.books=res
     },(err)=>{
       this.message=JSON.stringify(err.message);
   })
 }
}
