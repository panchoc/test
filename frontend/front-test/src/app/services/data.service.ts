import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface Character {
  name: string, 
  id: number,
  image : URL,
  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];
  public characters : Character[]
  constructor(
    private http : HttpClient
  ) { console.log('service ON') }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }

  public getAllCharacters(){
    const path = environment.API+'characters'
    let headers:HttpHeaders = new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      });
    return this.http.get(path,{headers})
  }

  public getCharacterById(id:number|string){
    const path = environment.API+'characters/'+id
    let headers:HttpHeaders = new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      });
    return this.http.get(path,{headers})
  }

  public getCharacterBooksById(id:number | string){
    const path = environment.API+'characters/books/'+id
    let headers:HttpHeaders = new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      });
    return this.http.get(path,{headers})
  }

  public getCharacterTitlesById(id:number | string){
    const path = environment.API+'characters/titles/'+id
    let headers:HttpHeaders = new HttpHeaders({
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      });
    return this.http.get(path,{headers})
  }

}
