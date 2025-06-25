import { Component, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDatepickerModule} from "@angular/material/datepicker";
import { fuseAnimations } from "@fuse/animations";

@Component({
  selector: 'date-range-picker',
  templateUrl: './date-range-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})
export class DateRangePickerComponent {

  @Output() filter = new EventEmitter<any>();

  constructor() { }

  selectedDateRange: DateRange<Date>;

  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }

    this.filter.emit(this.selectedDateRange)
  }
}
