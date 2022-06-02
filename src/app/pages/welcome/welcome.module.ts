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
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTabsModule } from 'ng-zorro-antd/tabs';




@NgModule({
  imports: [WelcomeRoutingModule, 
    NzTableModule, 
    CommonModule,
    NzDrawerModule,
    FormsModule ,
    NzCommentModule,
    NzSwitchModule,
    NzModalModule ,
    NzCalendarModule,
    NzTimePickerModule,
    NzInputModule,
    NzCollapseModule,
    NzUploadModule,
    NzTabsModule
],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { 
}
