import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { ApprovalDetail, ApprovalProcess, EscalationDetail } from 'app/model/administration/approval-process';
import { TableRequest } from 'app/model/datatable.model';
import { DropdownHierarchyRequest, DropdownRequest, HeirarchyDropdownRequest, SearchHierarchy } from 'app/model/dropdown.model';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CoreService } from 'app/services/coreService/coreService.service';
import { MasterService } from 'app/services/masterService/master.service';
import { TenantService } from 'app/services/tenantService/tenant.service';
import { UserService } from 'app/services/userService/user.service';
import { Subject, debounceTime, distinctUntilChanged, forkJoin, takeUntil } from 'rxjs';
import { FailedMessage, SaveMessage, SuccessMessage } from 'app/model/message.constant';
import { ActivatedRoute, Router } from '@angular/router';
import { notifications } from 'app/mock-api/common/notifications/data';
import { CommonModule, DatePipe } from '@angular/common';
import { GF } from 'app/shared/global-functions';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { fuseAnimations } from '@fuse/animations';
import { CardTitleComponent } from 'app/core/card-title/card-title.component';
import { DropdownComponent } from 'app/core/dropdown/dropdown.component';
import { EmployeeHierarchyComponent } from 'app/core/employee-hierarchy/employee-hierarchy.component';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-approval-process',
  templateUrl: './approval-process.component.html',
  styleUrls: ['./approval-process.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CardTitleComponent,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    EmployeeHierarchyComponent,
    TranslocoModule,
  ],
})

export class ApprovalProcessComponent implements OnInit {
  request = new TableRequest()
  dropdownRequest = new HeirarchyDropdownRequest
  dropdownFix = new DropdownRequest
  mapData = new ApprovalProcess
  notificationDropdown = []
  show : boolean = false
  tagOptions = []
  aprrovallist : any = []
  sequence = -1
  approvalDropdowns = []
  esclateDropdowns = []
  approvalForm: FormGroup;
  id: string;
  pipe = new DatePipe('en-US');
  field_count = 0
  disable : boolean = false
  disablective : boolean = false
  inputChangeParent_m: UntypedFormControl = new UntypedFormControl();
  protected _onDestroy = new Subject<void>();
  complete: boolean = false
  isView: boolean = false
  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private userService: UserService,
    private masterService: MasterService,
    private coreService: CoreService,
    private message: FuseConfirmationService,
    private router: Router,
    private route: ActivatedRoute) { }

  get approvalSource(): FormArray {
    return this.approvalForm.get("approvalSource") as FormArray
  }

  get esclateSource(): FormArray {
    return this.approvalForm.get("esclateSource") as FormArray
  }

  approvalSources = []


  addApproval(index): FormGroup {
    var list = this.coreService.getEmployeeHeirarchy()
    this.approvalDropdowns.push(list)
    return this.fb.group({
      sequence: index,
      tagType: [],
      tagOption: null,
      notification: [],
      datasource: []
    })
  }

  addEscalate(index): FormGroup {
    var list = this.coreService.getEmployeeHeirarchy()
    this.esclateDropdowns.push(list)
    return this.fb.group({
      sequence: index,
      hasEscalate: false,
      days: 0,
      tagType: [],
      tagOption: null,
      notification: [],
      datasource: []
    })
  }

    handlerSequenceAdd(count) {

        this.sequence = 0
        var count = this.approvalForm.value.approvalLevel
        this.approvalSources = []

        const row = this.approvalSources

        for (let index = 0; index < count; index++) {
            this.approvalSources.push({
                approval: {sequence : index ,tagtype: {}, notif: [], source: [],              resultHierarchy: new SearchHierarchy },
                escalate: {sequence : index ,tagtype: {}, notif: [], source: [], days: 0,     resultHierarchy: new SearchHierarchy  }
            })
        }
    }

  removeSequence(i: number) {
    this.approvalSource.removeAt(i);
    this.esclateSource.removeAt(i);
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id') == "" ? "" : this.route.snapshot.paramMap.get('id');
    this.approvalForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      approvalLevel: 0,
      active: true,
      createdBy: 0,
      approvalCode:""
    //   approvalSource: this.fb.array([]),
    //   esclateSource: this.fb.array([]),
    });

    this.dropdownFix.id = []
    this.dropdownFix.id.push({ dropdownID: 0, dropdownTypeID: 120 })
    this.dropdownFix.search = ""
    this.dropdownFix.start = 0

    forkJoin({
      dropdownFix: this.masterService.getDropdownFix(this.dropdownFix),
      users: this.userService.getHierarchyEmployee(),
      details: this.tenantService.getApprovalWorkflow(this.id)
    }).subscribe({
      next: (response) => {

        this.notificationDropdown = response.dropdownFix.payload
        if(this.id != ""){
          this.isView = sessionStorage.getItem('action') == 'view';
          console.log(this.isView)
          var isCopy = sessionStorage.getItem('action') == 'duplicate';
          this.disable = true
          if (isCopy) {
            this.disable = false;
          } else if (this.isView) {
            this.disablective = true;
          }

          this.mapData.approvalID = response.details.payload.approvalID
          this.approvalForm.patchValue(response.details.payload)

          for (let index = 0; index < response.details.payload.approvalLevel; index++) {
            var selected = response.details.payload.approvalDetail.filter(x => x.sequence == index)
            var selectedescalate = response.details.payload.approvalEscalationDetail.filter(x => x.sequence == index)

            this.approvalSources.push({
              approval: { tagtype: {}, notif: [], source: selected, resultHierarchy: new SearchHierarchy },
              escalate: { tagtype: {}, notif: [], days: 0, source: selectedescalate, resultHierarchy: new SearchHierarchy }
            })
          }
        }
        // if(this.id != "0"){
        //   this.mapDetail(response.details.payload)
        // }
        this.notificationDropdown = response.dropdownFix.payload
        this.tagOptions = response.users.payload.filter(x => x.dropdownTypeID != -3)
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
        // this.approvalForm.enable()
        this.inputChangeParent_m.valueChanges.
        pipe(debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this._onDestroy)).subscribe(() => {
            this.handlerSearcParent(1)
        });
      },
    });
  }

  mapDetail(model) {
    Object.assign(this.mapData, model);

    this.approvalForm.patchValue(this.mapData)

    var approvalForm = this.approvalForm.get("approvalSource") as FormArray
    var escalateForm = this.approvalForm.get("esclateSource") as FormArray

    for (let index = 0; index < model.approvalLevel; index++) {
      var selected = model.approvalDetail.filter(x => x.sequence == index)
      var formgroup = approvalForm.controls[index]
      var map = []
      selected.forEach(element => {
        map.push({ sequence: element.sequence , employeeID: element.employeeID, displayName: element.displayName, notificationID: element.notificationID, notification : element.notification })
      });
      formgroup.get("datasource").setValue(map)
    }

    for (let index = 0; index < model.approvalLevel; index++) {
      var selected = model.approvalEscalationDetail.filter(x => x.sequence == index)
      var formgroup = escalateForm.controls[index]
      var map = []
      selected.forEach(element => {
        map.push({ sequence: element.sequence, hasEscalation: element.hasEscalation, days: element.days, employeeID: element.employeeID, displayName: element.displayName, notificationID: element.notificationID, notification : element.notification })
      });
      formgroup.get("datasource").setValue(map)
    }
  }

//   handlerChange(index, type) {
//     var form = type == "approvalSource" ? this.approvalForm.get("approvalSource") as FormArray : this.approvalForm.get("esclateSource") as FormArray
//     var formgroup = form.controls[index]

//     let dropdowns = type == "approvalSource" ? this.approvalDropdowns : this.esclateDropdowns

//     dropdowns[index].map(item => {
//       item.visible = false
//     })

//     formgroup.value.tagType.forEach(key => {
//       dropdowns[index].filter(x => x.dropdownTypeID == key)[0].visible = true
//     });
//     this.loadDropdowns(formgroup, index, dropdowns)
//   }

  loadDropdowns(formgroup, index, dropdowns) {
    this.dropdownRequest.search = null
    this.dropdownRequest.start = 0
    this.dropdownRequest.id = []
    let selection = []
    // this.resultHierarchy.Search.forEach(key => {
    //   selection.push(dropdowns[index].filter(x => x.dropdownTypeID == key)[0])
    // });

    const selected = selection.sort((a, b) => {
      return a.index - b.index;
    })[0];

    this.dropdownRequest.id.push({ dropdownID: [0], dropdownTypeID: selected.dropdownTypeID, key: selected.key })
    this.removeOptions(dropdowns[index])
    this.userService.getSearchHierarchy(this.dropdownRequest,false).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          dropdowns[index].filter(x => x.dropdownTypeID === selection[0].dropdownTypeID)[0].options = value.payload
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

//   handlerSelectiveChange(model, index, select, type) {
//     var form = type == "approvalSource" ? this.approvalForm.get("approvalSource") as FormArray : this.approvalForm.get("esclateSource") as FormArray
//     var formgroup = form.controls[index]
//     let dropdowns = type == "approvalSource" ? this.approvalDropdowns : this.esclateDropdowns

//     let param = new HeirarchyDropdownRequest
//     let id = 0
//     let selection = []
//     formgroup.value.tagType.forEach(key => {
//       selection.push(dropdowns[index].filter(x => x.dropdownTypeID == key)[0])
//     });
//     var nextList = selection.filter(x => x.dropdownTypeID != model.dropdownTypeID && x.index > model.index)
//     this.removeOptions(nextList)
//     if (nextList.length > 0) {
//       id = nextList.filter(x => x.dropdownTypeID != model.dropdownTypeID).sort((a, b) => {
//         return a.index - b.index;
//       })[0].dropdownTypeID;

//       param.id = []
//       param.id.push({
//         key: model.key,
//         dropdownID: [select],
//         dropdownTypeID: id,
//       })

//       this.userService.getSearchHierarchy(param,false).subscribe({
//         next: (value: any) => {
//           if (value.statusCode == 200) {
//             dropdowns[index].filter(x => x.dropdownTypeID == id)[0].options = value.payload
//           }
//           else {
//             console.log(value.stackTrace)
//             console.log(value.message)
//           }
//         },
//         error: (e) => {
//           console.error(e)
//         }
//       });
//     }
//   }

  removeOptions(options) {
    options.forEach(key => {
      key.value = null
      key.options = []
    });
  }

  handlerAddApproval(i, type) {

    // if (type == 'approval') {
    //     this.request.SearchColumn = []
    // }else{
    //     this.request.SearchColumn = []
    // }

    this.request.SearchColumn = []
    this.approvalSources[i][type].resultHierarchy.Search.forEach(element => {
        if (Array.isArray(element.Value)) {
            element.Value.forEach(val => {
              this.request.SearchColumn.push({
                "key": element.Key,
                "value": val + "",
                "type": 2
              })
            });
        }


        // this.resultHierarchy.Search.forEach(ee => {
        //     ee.Value.forEach(ii => {
        //         this.request.SearchColumn.push({
        //         "key": ee.Key,
        //         "value": ii+"",
        //         "type": 2
        //         })
        //     });
        // });
    });

    this.userService.getSearchHierarchyEmployee(this.request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {

            this.aprrovallist = value.payload.map(item => ({...item,

                hasEscalation : type =='approval' ? false : this.approvalSources[i][type]?.hasEscalate ,
                days : type =='approval' ? 0 :  parseInt(this.approvalSources[i][type]?.days, 10),

                sequence : i,
                employeeID : item.employeeID,
                displayName: item.displayName,
                notificationDescription : this.notificationDropdown.filter(x => this.approvalSources[i][type].notification.includes(x.dropdownID)).map(y => y.description).toString(),
                notification : this.approvalSources[i][type].notification
            }))

            this.aprrovallist.forEach(element => {
            this.approvalSources[i][type].source.push(element)
            });

            console.log(this.approvalSources[i][type].source)
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

    handlerDelete(i, x, type) {


        if (type == "approvalSource") {
            this.approvalSources[i].approval.source.splice(x,1)
        }else{
            this.approvalSources[i].escalate.source.splice(x,1)
        }
    }

  submit() {
    this.approvalForm.markAllAsTouched();
    if (this.approvalForm.valid) {
      const dialogRef = this.message.open(SaveMessage);

      dialogRef.afterClosed().subscribe((result) => {
        if (result == "confirmed") {

          this.mapData.name = this.approvalForm.value.name
          this.mapData.description = this.approvalForm.value.description
          this.mapData.approvalLevel = this.approvalForm.value.approvalLevel
          this.mapData.approvalID =  this.mapData.approvalID == 0 ? 0 :  this.mapData.approvalID
          this.mapData.active = this.approvalForm.value.active
          this.mapData.createdBy = this.approvalForm.value.createdBy

          this.approvalSources.forEach(data => {

            data.approval.source.forEach(approval => {
            this.mapData.approvalDetail.push(approval)
            });

            data.escalate.source.forEach(escalate => {
            this.mapData.approvalEscalationDetail.push(escalate)

            });
          });

          // Duplicate
          var ac = this.mapData
          var clone = (sessionStorage.getItem("action") == "duplicate")
          ac.approvalID   = clone ? 0   : ac.approvalID
          ac.approvalCode = clone ? ""  : ac.approvalCode

        //   this.mapData.approvalEscalationDetail = null

          this.tenantService.postApprovalWorkflow(ac).subscribe({
            next: (value: any) => {
              if (value.statusCode == 200) {
                this.message.open(SuccessMessage);
                this.router.navigate(['/search/approval-process']);
              }
              else {
                FailedMessage.message = "Transaction Failed!"
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

  mapApprovalSource() {
    var map: ApprovalDetail[] = []
    var form = this.approvalForm.get("approvalSource") as FormArray
    var formgroup = form.controls

    formgroup.forEach(element => {
      if (element.value.datasource != null || element.value.datasource != undefined) {
        element.value.datasource.forEach(data => {
          map.push({
            sequence: element.value.sequence,
            employeeID: data.employeeID,
            notification: data.notificationID
          })
        })
      }
    })
    return map
  }

  mapEscalateSource() {
    var map: EscalationDetail[] = []
    var form = this.approvalForm.get("esclateSource") as FormArray
    var formgroup = form.controls

    formgroup.forEach(element => {
      if (element.value.datasource != null || element.value.datasource != undefined) {
        element.value.datasource.forEach(data => {
          map.push({
            sequence: element.value.sequence,
            hasEscalation: element.value.hasEscalate,
            days: Number(data.days),
            employeeID: data.employeeID,
            notification: data.notificationID
          })
        })
      }
    })
    return map
  }

  handlerSearcParent(e){

    if (!this.complete) {
        // const search = this.inputChangeParent.value?.toLowerCase()
        const search = e == 1 ? this.inputChangeParent_m.value.toLowerCase() : 0
        if (!search) {

        }
    }
  }

  topdiv(){

    var top = '45%'
    this.approvalSources.forEach((approvedata, ii) => {
       if (approvedata.approval.source.length > 1) {
            top = '65%'
       }
    });

    return top
  }

}


