import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService, Message } from '../services/data.service';

RouterModule
@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message: Message;

  public name;
  public image;
  public gender;
  public slug;
  public rank;
  public culture;
  public house;

  public books: Array<string>;
  public titles: Array<string>;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getCharacterById(id)
      .subscribe((res: Array<object>) => {
        //console.log(res[0]['image_'])
        this.name = res[0]['name']
        this.image = res[0]['image_']
        this.house = res[0]['house']
        this.gender = res[0]['gender']
        this.rank = res[0]['rank'] ? res[0]['rank'] : 'Unranked'
        this.culture = res[0]['culture'] ? res[0]['culture'] : 'No Culture'
        this.slug = res[0]['slug']
      }, error => {
        console.log('error char id', error)
      })

    this.data.getCharacterBooksById(id)
      .subscribe((res: Array<string>) => {
        // console.log(res)
        this.books = res
        this.books = this.books
      }, err => {
        console.log(err)
      })

    this.data.getCharacterTitlesById(id)
      .subscribe((res: Array<string>) => {
        this.titles = res;
      }, err => {
        console.log(err)
      })

  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  getDetails(id) {
    //let id = this.activatedRoute.snapshot.paramMap.get('id')
    /* this.data.getCharacterById(id)
      .subscribe((res : Array<object>) => {
        console.log(res[0]['image_'])
        this.details = res[0]
      }, error => console.log('error char id', error)) */

  }


}
