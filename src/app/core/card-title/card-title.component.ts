import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { myData } from 'app/app.moduleId';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-card-title',
  templateUrl: './card-title.component.html',
  styleUrls: ['./card-title.component.css'],

  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslocoModule
],
})
export class CardTitleComponent implements OnInit {

  @Input()  title:     string
  @Input()  back:      boolean
  @Input()  return:    boolean = false
  @Input()  prev:      boolean = false
  @Input()  next:      boolean = false
  @Input()  sub:       boolean
  @Input()  switch:    boolean
  private lastLocationUrl: string = '';
  @Output() backTap:   EventEmitter<boolean>  = new EventEmitter<boolean>();
  @Output() prevTap:   EventEmitter<void> = new EventEmitter<void>();
  @Output() nextTap:   EventEmitter<void> = new EventEmitter<void>();
  @Output() returnTap: EventEmitter<string>  = new EventEmitter<string>();
  @Output() switchTap: EventEmitter<string>  = new EventEmitter<string>();
  @Output() submitTap: EventEmitter<string>  = new EventEmitter<string>();

  constructor(private router: Router, private _location: Location) {
  }

  ngOnInit() {
  }

  changeOrient(){
    this.switchTap.emit('')
  }

  backClicked(){
    this.backTap.emit(true)
    myData.backSave = true
    this._location.back();
  }

  prevClicked(){
    this.prevTap.emit()
  }

  nextClicked(){
    this.nextTap.emit();
  }

  submit(){
    this.submitTap.emit('')
  }

  returnClicked(){
    this.returnTap.emit('')
  }
}
