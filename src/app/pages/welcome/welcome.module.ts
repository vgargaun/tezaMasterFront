import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule } from '@angular/forms';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';






@NgModule({
  imports: [WelcomeRoutingModule, 
    NzTableModule, 
    CommonModule,
    NzDrawerModule,
    FormsModule ,
    NzCommentModule,
    NzSwitchModule,
    NzModalModule 
],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { 
}
