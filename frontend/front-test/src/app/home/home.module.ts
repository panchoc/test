import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { PaginatePipe } from '../pipes/paginate.pipe';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,NgxPaginationModule,
    MessageComponentModule,
    HomePageRoutingModule, MatPaginatorModule, MatListModule,MatCardModule
    ,MatFormFieldModule, MatInputModule, MatTableModule,MatRippleModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
