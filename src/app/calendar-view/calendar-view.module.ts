import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarMonthlyComponent } from './calendar-monthly/calendar-monthly.component';
import { ModalsModule } from '../modals/modals.module';
import { WeeklyReelComponent } from './weekly-reel/weekly-reel.component';

@NgModule({
  declarations: [CalendarMonthlyComponent, WeeklyReelComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SharedModule,
    ModalsModule,
  ],
  exports: [CalendarMonthlyComponent],
})
export class CalendarViewModule {}
