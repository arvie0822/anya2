import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { FilingService } from 'app/services/filingService/filing.service';
import { StorageServiceService } from 'app/services/storageService/storageService.service';
import { myData } from 'app/model/app.moduleId';
import _ from 'lodash';
import { CoreService } from 'app/services/coreService/coreService.service';
import { DropdownRequest } from 'app/model/dropdown.model';
import { UserService } from 'app/services/userService/user.service';
import { forkJoin } from 'rxjs';
import { GF, } from 'app/shared/global-functions';
import { fuseAnimations } from '@fuse/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { DropdownCustomComponent } from 'app/core/dropdown-custom/dropdown-custom.component';
import { MatMenuModule } from '@angular/material/menu';
import { translate, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DropdownCustomComponent,
    TranslocoModule,
    MatTooltipModule
],
})
export class ChangeLocationComponent implements OnInit {

  @ViewChild('clocationtable') clocationtable: MatTable<any>;

  @Input() selectedemployee: any
  @Input() datasource: any

  @Output() employeeIds = new EventEmitter<any>();
  @Output() disabledsubmit = new EventEmitter<any>();

  location: FormGroup
  tid: string
  isSave: boolean = false
  pipe = new DatePipe('en-US');
  moduleId: any
  transactionId: any
  loginId = 0
  fileExtension: string | undefined;
  clickCount: number = 0;
  idsimage
  id: string = ""
  late: boolean = false
  dropdownRequest0 = new DropdownRequest
  disabledbutton: boolean = false
  actiondbutton: boolean = false
  applyToAllMsg = Object.assign({}, SaveMessage)
  failedMessage = { ...FailedMessage }
  saveMessage = { ...SaveMessage }

  locationsource: Location[] = [];
  clocation: string[] = ['action', 'date', 'currentlocation', 'newlocation', 'reason', 'status', 'upload'];
  imagefiless: any = []
  imagefile = []
  newlocation = []


  constructor(
    private fb: FormBuilder,
    private filingService: FilingService,
    private message: FuseConfirmationService,
    private router: Router,
    private storageServiceService: StorageServiceService,
    private coreService: CoreService,
    private route: ActivatedRoute,
    private userService: UserService,
    private translocoService: TranslocoService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.disabledsubmit.emit(false)
    this.tid = sessionStorage.getItem("u")
    var action = sessionStorage.getItem("action")
    this.moduleId = "114"
    this.id = this.route.snapshot.paramMap.get('id');

    this.dropdownRequest0.id.push(
      { dropdownID: 0, dropdownTypeID: 0 },
    )

    forkJoin({
      newlocations: this.userService.getAssignLocationDropdown(this.dropdownRequest0),
    })
      .subscribe({
        next: (response) => {
          this.newlocation = response.newlocations.payload

          if (this.id !== "") {
            if (action == 'edit') {
              this.actiondbutton = false
              this.filingService.getChangeLocation(this.id).subscribe({
                next: (value: any) => {
                  if (value.statusCode == 200) {

                    this.datasource.push({
                      action: [{ id: value.payload.action }],
                      date: [{ id: this.pipe.transform(value.payload.date, "yyyy-MM-dd") }],
                      locationCode: [{ id: value.payload.prevLocation == 0 ? "" : this.newlocation.find(x => x.dropdownID == value.payload.prevLocation).description }],
                      currentLocationId: [{ id: value.payload.currentLocationId }],
                      prevLocation: [{ id: value.payload.currentLocationId }],
                      locationId: [{ id: value.payload.locationId }],
                      reason: [{ id: value.payload.reason }],
                      status: [{ id: value.payload.status }],
                      uploadPath: [{ id: GF.IsEmpty(value.payload.uploadPath) ? "" : value.payload.uploadPath }],
                      changeLocationId: [{ id: value.payload.changeLocationId }],
                      disabled: [{ id: false }],
                      disable: true
                    })

                    this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                      .subscribe({
                        next: (value: any) => {
                          this.tid = value.payload[0]
                        },
                        error: (e) => {
                          console.error(e)
                        },
                        complete: () => {

                        }
                      });

                    this.employeeIds.emit(value.payload.employeeId)
                    this.clocationtable.renderRows()

                    this.datasource.forEach(stats => {
                      stats.status.forEach(ele => {
                        if (ele.id == 'First Level Approval') {
                          stats.disabled.forEach(elem => {
                            elem.id = false
                          });
                        }
                      });
                    });
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
            } else if (action == 'view') {
              this.filingService.getChangeLocation(this.id).subscribe({
                next: (value: any) => {
                  this.disabledbutton = true
                  this.actiondbutton = true
                  if (value.statusCode == 200) {


                    this.datasource.push({
                      action: [{ id: value.payload.action }],
                      date: [{ id: this.pipe.transform(value.payload.date, "yyyy-MM-dd") }],
                      locationCode: [{ id: value.payload.prevLocation == 0 ? "" : this.newlocation.find(x => x.dropdownID == value.payload.prevLocation).description }],
                      currentLocationId: [{ id: value.payload.currentLocationId }],
                      prevLocation: [{ id: value.payload.currentLocationId }],
                      locationId: [{ id: value.payload.locationId }],
                      reason: [{ id: value.payload.reason }],
                      status: [{ id: value.payload.status }],
                      uploadPath: [{ id: GF.IsEmpty(value.payload.uploadPath) ? "" : value.payload.uploadPath }],
                      changeLocationId: [{ id: value.payload.changeLocationId }],
                      disabled: [{ id: false }],
                      disable: true
                    })
                    this.actiondbutton = true
                    this.disabledsubmit.emit(true)
                    this.coreService.encrypt_decrypt(true, [value.payload.employeeId.toString()])
                      .subscribe({
                        next: (value: any) => {
                          this.tid = value.payload[0]
                        },
                        error: (e) => {
                          console.error(e)
                        },
                        complete: () => {

                        }
                      });

                    this.employeeIds.emit(value.payload.employeeId)

                    this.clocationtable.renderRows()
                    //   this.initData()
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
          } else {
            this.datasource.forEach(element => {
              element.status.forEach(clstatus => {
                if (clstatus.id == "First Level Approval") {
                  element.locationId.forEach(locationId => {
                    locationId.disable = true
                  });
                  element.reason.forEach(reason => {
                    reason.disable = true
                  });
                } else if (clstatus.id == "") {
                  element.locationId.forEach(locationId => {
                    locationId.disable = false
                  });
                  element.reason.forEach(reason => {
                    reason.disable = false
                  });
                }
              });
            });
          }
        }
      })
  }

  clickpwd(e, i, x) {
    this.datasource[i].locationId[x].disable = false
    this.datasource[i].reason[x].disable = false
    this.datasource[i].disabled[x].id = false
  }

  handleAdd(e, i, x) {

    // user/getAssignLocationDropdown
    if (e.locationId[x].id != 0) {
      this.datasource[i].action.push({ id: '' })
      var dates = i < 0 ? e.date[i].id : e.date[x].id
      this.datasource[i].date.push({ id: dates })
      var locationdisplay = i < 0 ? e.locationId[i].id : e.locationId[x].id
      this.datasource[i].locationCode.push({ id: this.newlocation.find(x => x.dropdownID == locationdisplay).description })
      // this.datasource[i].locationCodeId.push({id : locationdisplay})
      this.datasource[i].locationId.push({ id: 0, disable: false })
      this.datasource[i].currentLocationId.push({ id: locationdisplay, disable: false })
      this.datasource[i].prevLocation.push({ id: locationdisplay })
      this.datasource[i].reason.push({ id: '' })
      this.datasource[i].status.push({ id: '' })
      this.datasource[i].uploadPath.push({ id: '' })
      this.datasource[i].changeLocationId.push({ id: 0 })
      this.datasource[i].disabled.push({ id: false })
    } else {
      this.failedMessage.message = translate("New location can't be Empty")
      this.message.open(this.failedMessage);
    }
  }

  applyAll(e, i, elm, x, a) {
    debugger
    if (i == 0 && x == 0 ) {
      this.applyToAllMsg.title = translate("Apply to All")
      this.applyToAllMsg.message = translate("Do you want this changes apply to all?")
      this.applyToAllMsg.actions.confirm.label = "Yes"
      this.applyToAllMsg.actions.cancel.label = "No"
      const msg = this.message.open(this.applyToAllMsg)
      this.cdr.detectChanges()
      msg.afterClosed().subscribe((result) => {
        console.log(result)
        if (result == "confirmed") {
          this.datasource.forEach(item => {
            item.status.forEach(stats => {
              if (stats.id == "") {
                if (a == 'res') {
                  item.reason.forEach(id => {
                    id.id = e
                  });
                } else {
                  item.locationId.forEach(id => {
                    id.id = e
                  });
                }
              }
            });
          });
        this.cdr.detectChanges()
        }
      })

    }
  }

  uploadimage(id) {

    this.imagefiless = myData.fileimage
    if (this.imagefiless.length === 0) {
      return
    }

    this.imagefiless.forEach((file, ii) => {
      const fileToUpload = <File>file.files;
      if (fileToUpload && file.isupload) {
        const formData = new FormData();
        formData.append("file", file.files);

        this.storageServiceService.fileUpload(formData, id[ii].changeLocationId, this.moduleId, this.loginId).subscribe({
          next: (value: any) => {
            if (value) {

            }
          },
          error: (e) => {
          }
        });
      }
    });
  }

  public async submit(e) {
    console.log(this.selectedemployee)

    if (sessionStorage.getItem("action") == 'edit') {
      this.tid
    } else {
      if (sessionStorage.getItem('moduleId') == "68" || sessionStorage.getItem('moduleId') == "160") {
        this.tid = this.selectedemployee
      } else {
        this.tid = sessionStorage.getItem("u")
      }
    }

    var final = [];
    var fl = []
    e.forEach(ems => {
      var keys = Object.keys(ems);
      var maxLength = Math.max(...keys.map(key => Array.isArray(ems[key]) ? ems[key].length : 1));
      for (var i = 0; i < maxLength; i++) {
        var obj = {};
        keys.forEach(key => {
          if (Array.isArray(e[0][key])) {
            obj[key] = ems[key][i].id;
          }
          else {
            obj[key] = ems[key];
          }
        });
        final.push(obj);
      }
    });
    var ds = final.map(x => ({
      action: x.action,
      date: x.date,
      locationCode: x.locationCode,
      locationId: x.locationId,
      reason: x.reason,
      status: x.status,
      uploadPath: x.uploadPath,
      changeLocationId: x.changeLocationId,
      disabled: x.disabled,
      currentLocationId: x.currentLocationId,
      prevLocation: x.currentLocationId,
    }))

    var save = ds.filter(x => x.status != "Approved" && x.disabled == false)

    if (save.length == 0) {
      this.failedMessage.title = translate("Warning!")
      this.failedMessage.message = translate("No location changes!") // "No location changes!"
      this.message.open(this.failedMessage);
      this.disabledsubmit.emit(false)
      return
    }

    save.forEach(ii => {
      ii["lateFiling"] = false
      ii["isUpload"] = false
      ii["date"] = this.pipe.transform(ii.date, "yyyy-MM-dd")
      // ii["changeLocationId"] = ii.transactionId == undefined ? ii.changeLocationId : ii.transactionId
    });

    var cancelsave = await this.coreService.required(this.tid, save, '114', 0)
    if (cancelsave) {

      this.disabledsubmit.emit(false)
      return
    }

    this.isSave = true
    const dialogRef = this.message.open(SaveMessage);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "confirmed") {
        this.isSave = true
        this.filingService.postChangeLocation(save, this.tid, this.late).subscribe({
          next: (value: any) => {

            //   Error lock cannot file ==============================
            this.coreService.valid(value, this.late, e.length, true, ['/search/filing-view'], "").then((res) => {
              if (res.saveNow) {
                this.late = res.lateSave
                this.submit(e)
                return
              }

              if (res.reset) {
                this.late = false
                this.disabledsubmit.emit(false)
              }

              this.imagefiless = myData.fileimage
              if (this.imagefiless.length === 0) {
                return
              }

              this.coreService.uploadimage(myData.fileimage, value.payload.transactionIds, this.moduleId, this.loginId)

            })
          }
        })
      }else{
        this.disabledsubmit.emit(false)
      }
    })
  }

  async uploadFile(event, id, i, e) {
    let fileName = event.target.files[0].name;
    this.fileExtension = this.getFileExtension(fileName);
    var namefile = this.fileExtension

    const fileToUpload0 = event.target.files[0];
    const name = fileToUpload0.name;

    let reduce: File;

    console.log(1)
    if (namefile == "jpg" || namefile == "png") {
      try {
        reduce = await this.reduceImageSize(fileToUpload0, 50 * 1024, 0.8);
        console.log(2)

      } catch (error) {
        console.error('Error reducing image size:', error);
        return; // If an error occurs, you might want to handle it accordingly.
      }
    } else {
      reduce = fileToUpload0

    }
    const renamedFile = new File([reduce], name, { type: reduce.type });
    if (this.imagefiless.some((x) => x.index == i)) {
      const idx = this.imagefiless.findIndex((x) => x.index == i);
      this.imagefiless[idx].files = reduce;
      this.imagefiless[idx].isupload = true;
    } else {
      const renamedFile = new File([reduce], name, { type: reduce.type });
      var inx = this.imagefiless.length == 0 ? 0 : this.imagefiless.length - 1
      for (let index = inx; index <= i; index++) {
        var isup = index == i ? true : false
        this.imagefiless.push({
          index: index,
          files: renamedFile,
          isupload: isup
        });
      }

    }

    myData.fileimage = _.uniqBy([...this.imagefiless], JSON.stringify)
    var sample = myData.fileimage
    console.log(this.imagefiless)

    e.uploadPath.forEach(file => {
      file.id = file.id.replace("C:\\fakepath\\", '')
    });
  }

  getFileExtension(fileName: string): string {
    // Use regex to extract the file extension from the file name
    const match = /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileName);
    if (match && match[1]) {
      return match[1].toLowerCase(); // Convert to lowercase if needed
    } else {
      return 'Unknown';
    }
  }

  async reduceImageSize(file: File, maxSizeInBytes: number, quality: number): Promise<File> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (event: ProgressEvent<FileReader>) {
        const image = new Image();

        image.onload = function () {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const originalWidth = image.width;
          const originalHeight = image.height;
          let resizedWidth = originalWidth;
          let resizedHeight = originalHeight;

          // Calculate the new width and height to fit the desired file size
          while (file.size > maxSizeInBytes && resizedWidth > 10 && resizedHeight > 10) {
            resizedWidth *= 0.9;
            resizedHeight *= 0.9;

            canvas.width = resizedWidth;
            canvas.height = resizedHeight;

            context.clearRect(0, 0, resizedWidth, resizedHeight);
            context.drawImage(image, 0, 0, resizedWidth, resizedHeight);

            file = dataURLtoFile(canvas.toDataURL(file.type, quality), file.name);
          }
          resolve(file);
        };

        image.src = event.target?.result as string;
      };

      reader.readAsDataURL(file);

      function dataURLtoFile(dataURL: string, fileName: string): File {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
      }
    });
  }

  disableedit(i) {
    this.datasource[i].locationId
  }

  handleDeleteBreak(index, x, e) {
    if (x !== 0) {
      this.datasource[index].action.splice(x, 1);
      this.datasource[index].date.splice(x, 1);
      this.datasource[index].locationCode.splice(x, 1);
      this.datasource[index].locationId.splice(x, 1);
      this.datasource[index].currentLocationId.splice(x, 1);
      this.datasource[index].prevLocation.splice(x, 1);
      this.datasource[index].reason.splice(x, 1);
      this.datasource[index].status.splice(x, 1);
      this.datasource[index].upload.splice(x, 1);
      this.datasource[index].changeLocationId.splice(x, 1);
      this.datasource[index].disabled.splice(x, 1);
      this.datasource[index].disable.splice(x, 1);
    } else {
      this.datasource.splice(index, 1);
    }
    this.clocationtable.renderRows();
  }
}
