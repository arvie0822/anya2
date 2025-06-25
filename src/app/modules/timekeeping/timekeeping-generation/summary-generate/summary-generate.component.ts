import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/services/coreService/coreService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TimekeepingService } from 'app/services/timekeepingService/timekeeping.service';
import { TableRequest } from 'app/model/datatable.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FileService } from 'app/services/fileService/file.service';
import { fuseAnimations } from '@fuse/animations';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-summary-generate',
  templateUrl: './summary-generate.component.html',
  styleUrls: ['./summary-generate.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
      CommonModule,
      MatCardModule,
      CardTitleComponent,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatButtonModule
    ],
})
export class SummaryGenerateComponent implements OnInit {
  isLoadingResults: boolean = true;
  totalRows: number = 0;
  url: string = ""
  TKCache: string = ""
  table: any = []
  displayedColumns: string[] = [
    'employeeCode', 'displayName', 'subCompany', 'branch', 'regularHours', 'late', 'undertime', 'isAbsent', 'lwopHour', 'ptoHour', 'vlHour', 'slHour', 'otherlHour', 'regularHoursND', 'ot',
    'otnd', 'lh', 'lhot', 'lhotnd', 'lhoT8', 'lhotnD8', 'lhrd', 'lhrdotnd', 'lhrdoT8', 'lhrdotnD8',
    'sh', 'shot', 'shotnd', 'shoT8', 'shotnD8', 'shrd', 'shrdotnd', 'shrdoT8', 'shrdotnD8', 'otrd',
    'otrdnd', 'otrD8', 'otrdnD8', 'dh', 'dhot', 'dhotnd', 'dhoT8', 'dhotnD8', 'dhrd',
    'dhrdotnd', 'dhrdoT8', 'dhrdotnD8',
  ];
  dataSource = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading: boolean = true
  request = new TableRequest()
  constructor(
    private router: Router,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private timekeepingService: TimekeepingService,
    private cdRef: ChangeDetectorRef,
    private message: FuseConfirmationService,
    private fileService: FileService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadData(), 0)

    this.cdRef.detectChanges();
  }
  handlePageEvent(e): void {
    this.request.Start = e.pageIndex
    this.request.Length = e.pageSize
    this.loadData()
  }

  handleSortEvent(e): void {
    this.paginator.pageIndex = 0
    this.request.Start = 0
    this.request.Order = e.active
    this.request.OrderBy = e.direction
    this.loadData()
  }

  loadData() {

    this.isLoadingResults = true;
    if (this.data.type == "viewAdjustment") {
      this.viewTK()
    }
    if (this.data.type == "adjustment") {
     this.generateData()
    }
    if (this.data.type == "view") {
      this.loadTK()
     }
  }


  generateData() {
    this.isLoadingResults = true;
    this.timekeepingService.generateTimekeepingSummary({
      timekeepingId: this.data.props.encryptId
    }).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.isLoadingResults = false;
          this.TKCache = value.payload
          this.data.type = "view"
          this.loadTK()
        }
        else {
          console.log(value.stackTrace)
          console.log(value.message)
        }
      },
      error: (e) => {
        console.error(e)
      }
    });

  }

  loadTK() {
    this.isLoadingResults = true;
    this.timekeepingService.viewGeneratedTimekeepingSummary({
      cache: this.TKCache,
      table: this.request
    }).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.isLoadingResults = false;
          console.log(value.payload.data)
          this.dataSource = value.payload.data
          this.totalRows = value.payload.totalRows
        }
        else {
          console.log(value.stackTrace)
          console.log(value.message)
        }
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  viewTK(){
    this.timekeepingService.getTimekeepingAdjustment({
      encryptId: this.data.props.encryptId,
      table: this.request
    }).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.isLoadingResults = false;
          console.log(value.payload.data)
          this.dataSource = value.payload.data
          this.totalRows = value.payload.totalRows
        }
        else {
          console.log(value.stackTrace)
          console.log(value.message)
        }
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  handleExportEvent(): void {
    this.isLoadingResults = true;
    var view = {
      encryptId: this.data.props.encryptId,
      exportType: 2
    }
    this.timekeepingService.tkExport(view, 2).subscribe({
      next: (data: any) => {
        this.coreService.exportToExcel(data.payload, "Timekeeping")
        this.isLoadingResults = false;
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  submit() {
    const dialogRef = this.message.open(SaveMessage);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == "confirmed") {
        var obj = {
          timekeepingId: this.data.props.encryptId,
          cache: this.TKCache
        }
        this.timekeepingService.postTimekeepingSummary(obj).subscribe({
          next: (value: any) => {
            if (value.statusCode == 200) {
              this.message.open(SuccessMessage);
              this.router.navigate(['/search/timekeeping-generation-view']);
              this._dialog.closeAll();
            }
            else {
              this.message.open(FailedMessage);
              console.log(value.stackTrace)
              console.log(value.message)
            }
          },
          error: (e) => {
            this.message.open(FailedMessage);
            console.error(e)
          }
        });
      }
    });
  }

}


