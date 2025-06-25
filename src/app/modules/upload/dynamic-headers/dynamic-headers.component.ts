import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOptions, DropdownRequest } from 'app/model/dropdown.model';
import { MasterService } from 'app/services/masterService/master.service';

import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { FileService } from 'app/services/fileService/file.service';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GF } from 'app/shared/global-functions';

@Component({
  selector: 'app-dynamic-headers',
  templateUrl: './dynamic-headers.component.html',
  styleUrls: ['./dynamic-headers.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    CardTitleComponent,
    MatOptionModule,
    TranslocoModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatPaginator
],
})
export class DynamicHeadersComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['headers','headerMapping'];
    dynamicHeadersType : number
    dynamicHeadersForm: FormGroup
    id: string;
    _onDestroy: any
    dropdownFix = new DropdownRequest
    dropdownOptions = new DropdownOptions
    isEdit: boolean = false
    isUploading: boolean = false
    caseId: any
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    headerList: any
    fileDetail = {
      files: null,
      name: null,
      save: 0,
      guid: "",
      error: false
    }
    pageIndex = 0
    pageSize = 0
    startIndex = 0
    endIndex = 0
    fileHeaders: string[] = [];
    hasFileUploaded = false;
    successMessage = {...SuccessMessage}
    failedMessage = {...FailedMessage}
    headerId: number


  constructor(
    private masterService: MasterService,         
    private fileService: FileService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private message: FuseConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    this._onDestroy.unsubscribe()
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  
    this.dynamicHeadersForm = this.fb.group({
      dynamicHeadersType: [null, Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required]
    });
  
    this.dropdownFix.id.push({
      dropdownID: 0,
      dropdownTypeID: 182
    });

    if (this.id !== '') {
      this.isEdit = true;

      this.fileService.getDynamicHeaderTemplate(this.id).subscribe({
        next: (value: any) => {
          this.headerId = value.payload.id;

          this.dynamicHeadersType = value.payload.idHeader; 
          
          this.dynamicHeadersForm.patchValue({
            code: value.payload.headerCode, 
            description: value.payload.headerDescription 
          });
          
          this.dataSource.data = value.payload.headers.map(header => ({
              matching_keyword: header.matching_keyword,
              column_name: header.column_name,
              display_label: header.column_name
            }));
          
          this.caseId = this.dynamicHeadersType === 31215 ? 3 : 
                       this.dynamicHeadersType === 31214 ? 4 : 0
          
          if (this.caseId > 0) {
            this.fileService.getDynamicHeaders(this.caseId).subscribe({
              next: (response: any) => {
                this.headerList = response;
              },
              error: (e) => {
                console.error('Error fetching dynamic headers:', e);
              }
            });
          }
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
    }
    
  
    this.initData();
  }
  

  initData() {
    this.isEdit = this.id !== null && this.id !== "";
  
    this._onDestroy = this.masterService.getDropdownFix(this.dropdownFix).subscribe({
      next: (value: any) => {
        this.dropdownOptions.dynamicHeadersDef = value.payload.filter(
          x => x.dropdownTypeID === 182 && [31215, 31214].includes(x.dropdownID)
        );
      },
      error: (e) => {
        console.error('Error fetching dropdown fix:', e);
      }
    });
  }
  

  onTemplateTypeChange() {
    this.clearFileUpload();
    this.hasFileUploaded = false;
    
    this.caseId = this.dynamicHeadersType === 31215 ? 3 : this.dynamicHeadersType === 31214 ? 4 : 0;
  
    if (this.caseId > 0) {
      this.fileService.getDynamicHeaders(this.caseId).subscribe({
        next: (response: any) => {
          this.headerList = response;
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => {
          console.error('Error fetching dynamic headers:', e);
        }
      });
    } else {
      this.headerList = [];
      this.dataSource = new MatTableDataSource([]);
      this.dataSource.paginator = this.paginator;
    }
  }
  
  clearFileUpload() {
    let fileInput: HTMLElement = document.querySelector("#fileUpload") as HTMLElement;
    if (fileInput) {
      fileInput.setAttribute('value', '');
    }
    
    this.fileDetail = {
      files: null,
      name: null,
      save: 0,
      guid: "",
      error: false
    };
    
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
  }
  
  uploadFile(event) {
    let element: HTMLElement = document.querySelector("#fileUpload") as HTMLElement;
    let file = event.target.files[0];
  
    if (!file) return;
  
    element.setAttribute('value', file.name);
  
    this.fileDetail.files = event.target.files;
    this.fileDetail.name = file.name;
    this.fileDetail.save = 0;
    this.fileDetail.guid = "";
  
    this.fileService.getHeadersFromExcel(event.target.files).subscribe({
      next: (value) => {
        this.fileHeaders = value.payload;
        this.hasFileUploaded = true; 
        
        this.createMappingTable();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching headers:', error);
      }
    });
  
    event.target.value = null;
  }
  
  createMappingTable() {

    const rows = Object.keys(this.fileHeaders).map(excelHeader => {
      return {
        column_name: excelHeader, 
        display_label: this.fileHeaders[excelHeader] || ''
      };
    });
  
    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.paginator = this.paginator;
  }



  nextBatch(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  
    this.startIndex = this.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  
    this.dataSource = this.headerList.slice(this.startIndex, this.endIndex);
  }
  

  submit() {
    const codeControl = this.dynamicHeadersForm.get('code');
    const descriptionControl = this.dynamicHeadersForm.get('description');
  
    codeControl?.markAsTouched();
    descriptionControl?.markAsTouched();
  
    if (GF.IsEmpty(this.dynamicHeadersForm.value.code) || GF.IsEmpty(this.dynamicHeadersForm.value.description)) {
      this.failedMessage.message = "Some required fields are missing."
      this.message.open(this.failedMessage);
      return; 
    }
  
    const headerCode = codeControl?.value;
    const headerDescription = descriptionControl?.value;
    
    const mappedHeaders = this.dataSource.data.map(row => {
      if (this.isEdit) {
        return {
          column_name: row.display_label,
          matching_keyword: row.matching_keyword
        };
      } else {
        return {
          column_name: row.display_label,
          matching_keyword: row.column_name
        };
      }
    });
    
    const validMappedHeaders = mappedHeaders.filter(header => header.column_name);
    
    const payload = {
      id: this.isEdit ? this.headerId : 0,
      headerCode: headerCode,
      headerDescription: headerDescription,
      idHeader: this.dynamicHeadersType, 
      headers: validMappedHeaders
    };

     const dialogRef = this.message.open(SaveMessage);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "confirmed") {    
          this.fileService.postDynamicHeaderTemplate(payload).subscribe({
            next: (value) => {
              this.successMessage.message = value.message;
              this.message.open(this.successMessage);
              this.router.navigate(['/search/dynamicdropdown']);
            },
            error: (error) => {
              console.error('Error saving template:', error);
            }
          });
        }
      });
  }
  
}
