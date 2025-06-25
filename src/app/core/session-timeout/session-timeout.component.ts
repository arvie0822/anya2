import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { fuseAnimations } from '@fuse/animations';
import { LayoutComponent } from 'app/layout/layout.component';
import { CoreService } from 'app/services/coreService/coreService.service';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
],
})
export class SessionTimeoutComponent implements OnInit {

  @ViewChild(LayoutComponent) layout: LayoutComponent;

  @Output() btnLogout = new EventEmitter<void>();
  @Output() btnStay = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<SessionTimeoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private core: CoreService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.core.currentIdleState.subscribe((idleState) => {
      this.data = idleState;
      this.cdr.detectChanges();
    });
  }

  logout(){
    this.btnLogout.emit()
  }

  stay(){
    this.btnStay.emit()
  }
}
