import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TranslocoModule } from '@ngneat/transloco';
import { FailedMessage, SuccessMessage } from 'app/model/message.constant';
import { csvSheet } from 'app/modules/upload/setting.model';
import { CoreService } from 'app/services/coreService/coreService.service';
import { FileService } from 'app/services/fileService/file.service';
import { UserService } from 'app/services/userService/user.service';
import { SharedModule } from 'app/shared/shared.module';
import { CSVBoxButtonComponent } from '@csvbox/angular2';
@Component({
  selector: 'upload-csv-box',
  templateUrl: './upload-csv-box.component.html',
  styleUrls: ['./upload-csv-box.component.css'],
  encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    CSVBoxButtonComponent,
    TranslocoModule
    ],
})
export class UploadCsvBoxComponent implements OnInit {

  @ViewChild('csvbutton') csvbutton: ElementRef;
  @Input() licenseKey: string = "HUmU3HgmAXH15K50gdl3WjuoHsTYT7"

  title = 'Uploader';
  // licenseKey = 'sWRBvqImU7vYvXMFt7ePX2Tpg88o73'; //Sheet# 4
  // licenseKey = 'HUmU3HgmAXH15K50gdl3WjuoHsTYT7'; //Sheet# 6
  // licenseKey: 'DeljvzEyLpSAhSPpVrbRdegSK8eiFd' // payroll net pay
  // user = { user_id: 'default123' };
  show: boolean = false
  successMessage = {...SuccessMessage}
  failedMessage = {...FailedMessage}

  environment = {
    env_name: 'sample',
    base_url: "http://localhost:8000/",
    authorized_domain: "http://localhost:8000/",
    user_id: "ilm",
    host: "49.0.243.156",
    port: "5432",
    database: "0001",
  }

  user={
    user_id: "dev",
    api: "https://dev.aanyahr.com:1111"
}

  constructor(
    private userService: UserService,
    private fileService: FileService,
    private message: FuseConfirmationService,
    private coreService: CoreService) { }

  ngOnInit() {
    this.fileService.postStoreInMemory(0).subscribe();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.show = true;
    }, 500);
  }

  ngOnDestroy(){
    this.fileService.postStoreInMemory(99).subscribe();
  }

  imported(result: boolean, data: any) {
    if(result) {
      this.successMessage.title = data.row_success + " rows uploaded"
      this.successMessage.message = "Sheet uploaded successfully"

    //   var api = csvSheet.find(x=>x.licenseKey == this.licenseKey)?.api

    //   if (api) {
    //     this.coreService.postData(api, {}).subscribe({
    //     next: (value: any) => {
    //       if (value.statusCode == 200) {
    //         this.message.open(this.successMessage);
    //         this.fileService.postStoreInMemory(99).subscribe();
    //       }
    //       else {
    //         this.failedMessage.message = value.message
    //         this.message.open(this.failedMessage);
    //         console.log(value.stackTrace)
    //         console.log(value.message)
    //       }
    //     },
    //     error: (e) => {
    //       this.message.open(this.failedMessage);
    //       console.error(e)
    //     }
    //   });
    // } else {
    //   this.successMessage.message = "Sheet uploaded successfully."
    //   this.message.open(this.successMessage);
    // }
    } else{
      this.failedMessage.message = "There was some problem uploading the sheet"
      this.message.open(this.failedMessage);
    }
  }
}
