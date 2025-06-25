import { Validators } from '@angular/forms';

export class Company {
    apiKeys: string = '';
    companyId: number = 0;
    companyCode = ['', [Validators.required]];
    companyName = [null, [Validators.required]];
    companyLogo: string = '';
    seriesCode = [{ value: null, disabled: true }, []];
    createdBy: number = 0;
    dateCreated: string = '';
    active: boolean = true;
    isEmail: boolean = true;
    telephone: string = '';
    emailAddress = [null, [Validators.email, Validators.required]];
    isPwExpires: boolean = null;
    daysPwExpires: number = null;
    restrictPreviousPw: boolean = null;
    daysRemindPwExpires: number = null;
}

export class Client {
    apiKeys: string = '';
    companyId: number = 0;
    companyCode = ['', [Validators.required]];
    companyName = ['', [Validators.required]];
    companyLogo: string = '';
    seriesCode = ['', [Validators.required]];
    createdBy: number = 0;
    dateCreated = new Date();
    active: boolean = true;
    isEmail: boolean = false;
    telephone: string = '';
    emailAddress: string = '';
    isPwExpires: boolean = false;
    daysPwExpires: number = 0;
    restrictPreviousPw: boolean = false;
    daysRemindPwExpires: number = 0;
}
