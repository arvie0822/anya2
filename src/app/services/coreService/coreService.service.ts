import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, timeout } from 'rxjs';
import * as XLSX from 'xlsx';
import { dropdownFix, dropdownType } from 'app/model/dropdown.model';
import { dropdownCustomType } from 'app/model/dropdown-custom.model';
import { environment } from 'environments/environment';
import {
    FailedMessage,
    SaveMessage,
    SuccessMessage,
} from 'app/model/message.constant';
import { FileService } from '../fileService/file.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GF, } from 'app/shared/global-functions';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import { DatePipe } from '@angular/common';
import { StorageServiceService } from '../storageService/storageService.service';
import { Router } from '@angular/router';
import { FilingService } from '../filingService/filing.service';
import { translate, TranslocoService } from '@ngneat/transloco';

interface valid {
    invalid: boolean;
    locked: boolean;
    late: boolean;
    msg: string;
    lateSave: boolean;
    saveNow: boolean;
    reset: boolean;
    _msg: typeof FailedMessage | typeof SaveMessage | typeof SuccessMessage;
}

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    dropdownFix: any = dropdownFix;
    dropdownType: any = dropdownType;
    dropdownCustomType: any = dropdownCustomType;
    failedMessage = { ...FailedMessage };
    successMessage = { ...SuccessMessage };
    saveMessage = Object.assign({}, SaveMessage);

    serverURL: string = environment.reports + 'api/site/master';
    serverServiceAuthorizationToken: string =
        'bearer ' + sessionStorage.getItem('rt');
    Reportid: string;

    //For Session Timeout
    private idleStateSource = new BehaviorSubject<string>('');
    currentIdleState = this.idleStateSource.asObservable();
    pipe = new DatePipe('en-US');
    updateIdleState(idleState: string) {
        this.idleStateSource.next(idleState);
    }
    //For Session Timeout

    // ====globaldata==============
    private globalsource = new BehaviorSubject<any>(null);
    currentdataState = this.globalsource.asObservable();

    globaldatastate(idleState: string) {
        this.globalsource.next(idleState);
    }
    // ====globaldata==============

    constructor(
        private http: HttpClient,
        private fileService: FileService,
        private message: FuseConfirmationService,
        private router: Router,
        private storage: StorageServiceService,
        private filingService: FilingService,
        private storageServiceService: StorageServiceService,
        private translocoService: TranslocoService,
    ) {}

    getTableData(uri, params): Observable<any> {
        return this.http.post(uri, params).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getCoreDropdown(id, params): Observable<any> {
        var custom = this.dropdownCustomType.find((x) => x.type === id);
        params.id.push({ dropdownID: 0, dropdownTypeID: custom.dropdownType });
        return this.http.post(custom?.uri || '', params).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getCoreDropdownwithparam(id, payload, tid): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        return this.http
            .post(
                this.dropdownCustomType.find((x) => x.type === id)?.uri || 0,
                payload,
                { params: params }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    postData(uri, params): Observable<any> {
        return this.http.post(uri, params).pipe(
            timeout(5 * 60 * 1000), // 5 minutes timeout
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getData(uri, param): Observable<any[]> {
        let params = new HttpParams();
        params = params.append('id', param);
        return this.http.get<any[]>(uri, { params: params });
    }

    postfilingData(uri, data, tid): Observable<any> {
        let params = new HttpParams();
        params = params.append('tid', tid);
        return this.http
            .post(environment.apiUrl + 'filing/' + uri, data, {
                params: params,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    //   cancelfiling(uri, data ,id): Observable<any> { postCancelFiling
    //     let params = new HttpParams();
    //     params = params.append('id', id);
    //     return this.http.post(environment.apiUrl+ "filing/" + uri, data, { params: params }).pipe(
    //       switchMap((response: any) => {
    //         return of(response);
    //       })
    //     );
    //   }

    encrypt_decrypt(encrypt, params: any[]): Observable<any> {
        var url = encrypt ? 'bulkEncrypt' : 'bulkDecrypt';
        return this.http.post(environment.apiUrl + 'user/' + url, params).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    getEntitlement(uri, param): Observable<any[]> {
        // let params = new HttpParams();
        // params = params.append('id', param);
        return this.http.get<any[]>(uri, { params: param });
    }

    getEntitlementv2(uri, param): Observable<any> {
        // let params = new HttpParams();
        // params = params.append('id', param);
        return this.http.post(uri, param);
    }

    getDropdownFix(id: number[]): any[] {
        let dropdowns: any = [];
        id.forEach((element) => {
            if (element == 0) {
                dropdowns = this.dropdownFix.map((item) => ({
                    dropdownID: item.id,
                    description: item.description,
                    typeID: item.type_id,
                }));
            } else {
                dropdowns = [
                    ...dropdowns,
                    ...this.dropdownFix
                        .filter((x) => x.type_id == element)
                        .map((item) => ({
                            dropdownID: item.id,
                            description: item.description,
                            typeID: item.type_id,
                        })),
                ];
            }
        });
        return dropdowns;
    }

    getDropdownType(id: number[]): any[] {
        let dropdowns: any = [];
        id.forEach((element) => {
            if (element == 0) {
                dropdowns = this.dropdownType.map((item) => ({
                    dropdownID: item.id,
                    description: item.description,
                }));
            } else {
                dropdowns = [
                    ...dropdowns,
                    ...this.dropdownType
                        .filter((x) => x.type_id == element)
                        .map((item) => ({
                            dropdownID: item.id,
                            description: item.description,
                        })),
                ];
            }
        });
        return dropdowns;
    }

    dynamicFormMappingData(formGroup, payload) {
        for (var form of formGroup) {
            switch (form.type) {
                case 'time':
                    var date = new Date(payload[form.key]);
                    form.value = date;
                    break;
                case 'switch':
                    if (form.key == 'active') {
                        form.visible = true;
                        form.editable = true;
                    }
                    break;
                case 'date':
                    var date = new Date(payload[form.key]);
                    form.value = date;
                    break;
                default:
                    form.value = payload[form.key];
                    break;
            }
        }
    }

    dynamicFormDefaultData(formGroup) {
        for (var form of formGroup) {
            switch (form.type) {
                case 'number':
                    form.value = 0;
                    break;
                case 'switch':
                    form.value = true;
                    if (form.key == 'active') {
                        form.visible = false;
                        form.editable = false;
                    }
                    break;
                case 'time':
                    form.value = null;
                    break;
                case 'date':
                    form.value = new Date();
                    break;
                default:
                    form.value = '';
                    break;
            }
        }
    }

    getEmployeeHeirarchy() {
        return [
            {
                index: 0,
                key: 'SubCompanyID',
                value: null,
                dropdownTypeID: -1,
                options: [],
                change: 'SubCompany',
                visible: false,
            },
            {
                index: 1,
                key: 'BranchID',
                value: null,
                dropdownTypeID: -2,
                options: [],
                change: 'Branch',
                visible: false,
            },
            {
                index: 3,
                key: 'DepartmentID',
                value: null,
                dropdownTypeID: 38,
                options: [],
                change: 'Department',
                visible: false,
            },
            {
                index: 4,
                key: 'OccupationID',
                value: null,
                dropdownTypeID: 37,
                options: [],
                change: 'Occupation',
                visible: false,
            },
            {
                index: 5,
                key: 'SupervisorID',
                value: null,
                dropdownTypeID: -3,
                options: [],
                change: 'Supervisor',
                visible: false,
            },
            {
                index: 6,
                key: 'EmployeeID',
                value: null,
                dropdownTypeID: -4,
                options: [],
                change: 'Employee',
                visible: false,
            },
            {
                index: 7,
                key: 'Heirarchy',
                value: null,
                dropdownTypeID: 132,
                options: [],
                change: 'Supervisor',
                visible: false,
            },
        ];
    }

    exportToExcel(arr: any[], name?: string) {
        console.log(arr);
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(wb, ws, name);
        XLSX.writeFile(wb, `${name}.xlsx`);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    //start--convertion base64 to excel
    converB64ToExcel(base64String, fileName) {
        var binaryString = this.base64ToBinary(base64String);
        var arrayBuffer = this.binaryToArrayBuffer(binaryString);
        var blob = this.arrayBufferToBlob(
            arrayBuffer,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        this.downloadExcelBlob(blob, fileName);
    }

    base64ToBinary(base64) {
        var binaryString = atob(base64);
        return binaryString;
    }

    binaryToArrayBuffer(binaryString) {
        var length = binaryString.length;
        var buffer = new ArrayBuffer(length);
        var array = new Uint8Array(buffer);
        for (var i = 0; i < length; i++) {
            array[i] = binaryString.charCodeAt(i);
        }
        return buffer;
    }

    arrayBufferToBlob(arrayBuffer, type) {
        return new Blob([arrayBuffer], { type: type });
    }

    downloadExcelBlob(blob, fileName) {
        var downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = fileName;
        downloadLink.click();
    }
    //end--convertion base64 to excel

    //code for exporting all list/template
    exportAll(request, mid, view) {
        this.fileService.exportFileHandler(request, mid, view).subscribe({
            next: (value: any) => {
                if (value.statusCode == 200) {
                    if (GF.IsEmpty(value.payload.fileData)) {
                        this.failedMessage.message = 'No file to export!';
                        this.failedMessage.title = 'Export Failed';
                        this.message.open(this.failedMessage);
                    } else {
                        this.converB64ToExcel(
                            value.payload.fileData,
                            value.payload.fileName
                        );
                        this.successMessage.message =
                            'Your export was successful!';
                        this.successMessage.title = 'Export';
                        this.message.open(this.successMessage);
                    }
                } else {
                    console.log(value.stackTrace);
                    console.log(value.message);
                }
            },
            error: (e) => {
                console.error(e);
            },
        });
    }

    async directDownloadBoldRTemplate(
        reportName: string,
        exportName: string,
        ext: string,
        parameters: string,
        zip: JSZip,
        isZip: boolean,
        rid: string
    ): Promise<void> {
        var serverURL = this.serverURL.replace(
            'master',
            sessionStorage.getItem('se') === '0001'
                ? 'master'
                : sessionStorage.getItem('se').toLowerCase().replaceAll(" ","")
        );
        const ReportName = reportName;
        var authorizationToken = 'bearer ' + sessionStorage.getItem('rt');

        var reportId = isZip
            ? rid
            : await this.getReportId(serverURL, ReportName, authorizationToken);

        var exten = [
            {
                exFilter: ['pdf', 'PDF', 'Pdf'],
                type: 'application/pdf',
                ext: 'pdf',
                exportType: 'Pdf',
            },
            {
                exFilter: ['xlsx', 'Excel'],
                type: 'application/xlsx',
                ext: 'xlsx',
                exportType: 'Excel',
            },
        ];

        if (!exten.some((x) => x.exFilter.includes(ext))) {
            console.log(`Export Type "${ext}" does not exist in the array.`);
            return;
        }

        //For Exporting the Report
        var exType = exten.find((x) => x.exFilter.includes(ext));
        const body = {
            ReportId: reportId,
            ExportType: exType.exportType,
        };

        const exporturl =
            serverURL +
            '/v1.0/reports/' +
            body.ReportId +
            '/' +
            body.ExportType +
            '/export-filter';

        const requestBody = {
            FilterParameters: GF.IsEmptyReturn(parameters, ''),
        };

        try {
            const response = await axios.post(exporturl, requestBody, {
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const jsonstring = JSON.stringify(response.data);
            const jsonData = JSON.parse(jsonstring);
            const fileContent = jsonData.FileContent;
            const byteArray = this.base64ToArrayBuffer(fileContent);
            const file = new Blob([byteArray], { type: exType.type });

            if (isZip) {
                if (ext === 'pdf') {
                    zip.file(`${exportName}.pdf`, byteArray);
                } else {
                    zip.file(`${exportName}.xlsx`, byteArray);
                }
            } else {
                saveAs(file, exportName + '.' + exType.ext);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async bulkDownloadReport(
        reportName: string,
        zipName: string,
        pdfName: string,
        extentions: string,
        parameterName: string,
        paramater: any
    ) {
        const zip = new JSZip();
        var serverURL = this.serverURL.replace(
            'master',
            sessionStorage.getItem('se') === '0001'
                ? 'master'
                : sessionStorage.getItem('se').toLowerCase().replaceAll(" ","")
        );
        var authorizationToken = 'bearer ' + sessionStorage.getItem('rt');
        var reportId = await this.getReportId(
            serverURL,
            reportName,
            authorizationToken
        );
        for (const item of paramater[parameterName]) {
            var keys = Object.keys(paramater);
            var params = '{';
            keys.forEach((key) => {
                params += `'${key}':['${
                    parameterName == key ? item.id : key == "createdBy" ? item["createdBy"] : paramater[key]
                }'],`;
            });
            params += '}';
            var dd = this.pipe.transform(new Date(), 'MM-dd-yyyy');

            // var pdfname = GF.IsEmptyReturn(pdfname,GF.IsEmptyReturn(zipName,reportName))
            //  var tin = GF.IsEmptyReturn(item.tin + "00000","")
            //  var surname = item.lastname.toUpperCase()
            var filename = GF.IsEmptyReturn(pdfName, item.filename);

            await this.directDownloadBoldRTemplate(
                reportName,
                filename,
                extentions,
                params,
                zip,
                true,
                reportId
            );
        }

        zipName = GF.IsEmptyReturn(zipName, reportName);

        zip.generateAsync({ type: 'blob' }).then((content: any) => {
            saveAs(content, zipName + '.zip');
        });

        return true;
    }

    //get report id by report name
    async getReportId(serverURL, ReportName, token) {
        const url = `${serverURL}/v1.0/items`;
        const queryParams = {
            itemType: 3, //Retrieving values for the 'Report' Item Type(3) //Do not change this
        };

        try {
            const response = await axios.get(url, {
                params: queryParams,
                headers: {
                    Authorization: token,
                },
            });
            const itemNames: string[] = [];
            const itemIds: string[] = [];

            response.data.forEach((item: any) => {
                itemNames.push(item.Name);
                itemIds.push(item.Id);
            });

            if (itemNames.includes(ReportName)) {
                const index = itemNames.indexOf(ReportName);
                const matchingItemId = itemIds[index];
                this.Reportid = matchingItemId;
                return matchingItemId;
            } else {
                console.log(
                    `Report name "${ReportName}" does not exist in the array.`
                );
                return null;
            }
        } catch (error) {
            console.error('Error retrieving items:', error);
            return null;
        }
    }

    //base64 to bytes
    base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binaryString = window.atob(base64);
        const length = binaryString.length;
        const bytes = new Uint8Array(length);

        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return bytes.buffer;
    }

    postDeleteData(uri, listid): Observable<any> {
        return this.http.post(uri, listid).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    downloadAttachment(filename, tid, mid) {
        this.storage.fileDownload(filename, tid, mid).subscribe({
            next: (value: any) => {

                const base64 = value.payload.fileContents
                const contentType = value.payload.fileContents || 'application/octet-stream';
                // convert base64 to blob
                // const blob = this.base64ToBlob(base64, contentType);
                const blob = this.base64ToBlob(base64, contentType);

                this.downloadExcelBlob(blob, filename);
            },
            error: (e) => {
                this.failedMessage.title = 'Download failed!';
                this.failedMessage.message =
                    'It seems that the attachments are corrupted or damaged. Please request a new file from the requester.';
                this.message.open(this.failedMessage);
            },
        });
    }

    valid(value, late, row, isfiling, route, msg): Promise<valid> {
        return new Promise((resolve) => {
            var p = value.payload;

            if (GF.IsEmpty(p)) {
                this.failedMessage.title = translate("Warning!")
                this.failedMessage.message = value.message;
                this.message.open(this.failedMessage);
                resolve(valid);
                return;
            }

            var fi = GF.IsEmptyReturn(msg, 'filling');
            var valid = {
                invalid: p.valiationState > 0,
                locked: p.lockingState === 2,
                late: p.lockingState === 1,
                msg: late && p.validationMessage == "Late"
                    ?  translate('Transaction has been Saved!')
                    : p.valiationState === 2 && p.lockingState > 0
                    ? p.errorList.join("<br>")
                    : p.valiationState > 0 && p.lockingState > 0
                    ? p.validationMessage + ' and ' + p.lockingMessage
                    : p.valiationState > 0
                    ? p.validationMessage.replace(
                          'Error',
                          GF.IsEmptyReturn(p.errorList.join("<br>"), p.validationMessage)
                      )
                    : p.lockingState > 0
                    ? p.lockingMessage
                          .replace(
                              'Late',
                              row > 1 && row === p.late
                                  ? translate('All employees have late') +" "+ fi +" "+ translate('continue?')
                                  : row > 1 && row !== p.late
                                  ? translate('Some employees have late') +" "+ fi +" "+ translate('continue?')
                                  : row === 1
                                  ?  'Late ' + fi +" "+ translate('This will be considered as an adjustment. Continue?')
                                  : p.validationMessage
                          )
                          .replace(
                              'Locked',
                              row > 1 && row === p.locked
                                  ? translate('All dates in this') +" "+ fi +" "+ translate('are fully locked, please check and file again')
                                  : row > 1 && row !== p.locked
                                  ? translate('Some dates in this') +" "+ fi +" "+ translate('are fully locked, please check and file again')
                                  : row === 1
                                  ? (isfiling
                                        ? 'Filing'
                                        : GF.IsEmptyReturn(msg, 'Approval')) +
                                    translate('for this cutoff is fully locked')
                                  : p.validationMessage
                          )
                    : translate('Transaction has been Saved!') ,
                _msg: late && p.validationMessage == "Late"
                    ? this.successMessage
                    : p.valiationState > 0 || p.lockingState > 0
                    ? this.failedMessage
                    : this.successMessage,

                lateSave: late,
                saveNow: false,
                reset: false,
            };

            //Success Saving
            if (value.statusCode === 200) {
                var successMessage = Object.assign({}, SuccessMessage);
                this.message.open(successMessage);
                if (isfiling) {
                    this.router.navigate(route);
                    resolve(valid);
                    return;
                }
                valid.reset = true;
                resolve(valid);
                return;
            }

            // invalid = false and locked = false and valid.late = true && late = false
            if (!valid.invalid && !valid.locked && valid.late && !late) {
                var locked = this.saveMessage;
                locked.message = valid.msg;
                var sure = this.message.open(locked);
                sure.afterClosed().subscribe((result) => {
                    if (result == 'confirmed') {
                        valid.saveNow = true;
                        valid.lateSave = true;
                        valid.reset = true;
                        resolve(valid);
                        return;
                    } else {
                        resolve(valid);
                        return;
                    }
                });

                // invalid = false and locked = true
            } else if (!valid.invalid && valid.locked) {
                valid._msg.title = value.message;
                valid._msg.message = valid.msg;
                this.message.open(valid._msg);
                resolve(valid);
                return;

                // any validation
            } else {
                valid._msg.title = value.message;
                valid._msg.message = valid.msg;
                this.message.open(valid._msg);
                resolve(valid);
                return;
            }
        });
    }

    async required(id, data, moduleId, lvId) {
        var request = {
            moduleId: moduleId,
            subModuleId: lvId,
            dateFrom: new Date(),
            dateTo: new Date(),
            overtimeTiming: 0,
            shiftId: 0,
            leaveFilingType: 0,
            targetId: id,
            date: this.pipe.transform(new Date(), 'yyyy-MM-dd'),
        };

        try {
            const response = await this.filingService
                .getFilingValidationOnUI(request)
                .toPromise();

            // var reason = response.validationtype.payload.isreasonrequired
            // var attachment = response.validationtype.payload.isattachrequired;
            // var all = reason && attachment;

            var reason = response.payload.isReasonRequired;
            var attachment = response.payload.isAttachmentRequired;
            var all = reason && attachment;

            var reqReason = data.some((x) =>
                GF.IsEmpty(x?.reason || x.otreason)
            );
            var reqattach = data.some((x) =>
                GF.IsEmpty(x?.uploadPath || x.uploadFileot)
            );

            var msg = '';
            if (all && (reqReason || reqattach)) {
                msg += translate('Reason and UploadFile');
            } else {
                if (reason && reqReason) {
                    msg += translate("Reason");
                }
                if (attachment && reqattach) {
                    msg += translate("UploadFile");
                }
            }
            if ((reason && reqReason) || (attachment && reqattach)) {
                this.failedMessage.title = translate('Warning!');
                this.failedMessage.message = msg += translate('is Required.');
                this.message.open(this.failedMessage);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            // Handle errors if any
            console.error('Error in required function:', error);
        }
    }

    uploadimage(files, id, moduleid, login) {
        id.forEach((ids, ii) => {
            var file = files.find((x,xx) => GF.IsEmptyReturn(x.index, xx) == ii);

            if (!GF.IsEmpty(file)) {
                const fileToUpload = <File>file.files;
                if (fileToUpload && file.isupload) {
                    const formData = new FormData();
                    formData.append('file', file.files);

                    this.storageServiceService
                        .fileUpload(formData, ids, moduleid, login)
                        .subscribe({
                            next: (value: any) => {
                                if (value) {
                                }
                            },
                            error: (e) => {},
                        });
                }
            }
        });
    }

    downloadJsonFile = (filename, dataObjToWrite) => {
        const blob = new Blob([JSON.stringify(dataObjToWrite)], {
            type: 'text/json',
        });
        const link = document.createElement('a');

        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ['text/json', link.download, link.href].join(
            ':'
        );

        const evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        link.dispatchEvent(evt);
        link.remove();
    };

    downloadFile(fileUrl: string, fileName: string) {
        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = fileName; // This sets the downloaded file name
        anchor.target = '_blank';  // Optional: Opens in a new tab (useful for viewing files)

        // Append to the DOM and trigger the click
        document.body.appendChild(anchor);
        anchor.click();
        // Remove the anchor element
        document.body.removeChild(anchor);
      }

    base64ToBlob(base64: string, contentType: string): Blob {
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i += 512) {
            const slice = byteCharacters.slice(i, i + 512);
            const byteNumbers = new Array(slice.length);
            for (let j = 0; j < slice.length; j++) {
                byteNumbers[j] = slice.charCodeAt(j);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }
}
