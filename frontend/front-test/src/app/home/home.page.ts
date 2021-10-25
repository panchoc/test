import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface Character {
  name: string, 
  id: number,
  image : URL,
  
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage  {
  displayedColumns: string[] = ['image', 'name', 'id'];
  dataSource: MatTableDataSource<Character>;

  public characters: Array<any>;
  public page_size:number = 10;
  public page_number:number = 1;
  //public length:number;

  

  constructor(private data: DataService,
    ) {
      // this.data.getAllCharacters()
      // .subscribe((res : Character[] )=> {
      //   //console.log(res.length)
      //  //this.characters = res
      //  this.dataSource = new MatTableDataSource(res)
      //   return res
      //  //this.length = res.length
      // }, err =>{
      //   console.log('error getAll', err)
      // })
     
      
    }

    ngOnInit(){
    this.getAllCharacters()
  }
  // refresh(ev) {
  //   setTimeout(() => {
  //     ev.detail.complete();
  //   }, 3000);
  // }

  // getMessages(): Message[] {
  //   return this.data.getMessages();
  // }

  getAllCharacters(){
    this.data.getAllCharacters()
    .subscribe((res : Array<Character> )=> {
      //console.log(res.length)
     this.characters = res
     //this.dataSource = new MatTableDataSource(this.characters)
     // return res
     //this.length = res.length
    }, err =>{
      console.log('error getAll', err)
    })
    
  }

  handlePage(e : PageEvent){
    this.page_size = this.page_size
    this.page_number = e.pageIndex + 1
  }
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.characters[0].filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
