import { Validators } from "@angular/forms"

export class Rate {

    statutory   : number = 0
    month       : number = 0
    year        : number = 0

}
export class HDMF {

    monthlySalary : string =''
    empeeShare    : string =''
    empersShare   : string =''
    total         : string =''

}

export interface SSS {

    range      : string;
    emp_comp   : string;
    mandatory  : number;
    total      : string;
    reg1       : number;
    reg2       : number;
    reg3       : number;
    emp1       : number;
    emp2       : number;
    emp3       : number;
    mandatory1 : number;
    mandatory2 : number;
    mandatory3 : number;
    total1     : number;
    total2     : number;
    total3     : number;

}

export interface TAX {

    daily   : string;
    d1      : string;
    d2      : string;
    d3      : string;
    d4      : string;
    d5      : string;
    d6      : string;
}
export interface TAXA {

    week    : string;
    w1      : string;
    w2      : string;
    w3      : string;
    w4      : string;
    w5      : string;
    w6      : string;
}

export interface TAXB {

    semiMonth    : string;
    sm1          : string;
    sm2          : string;
    sm3          : string;
    sm4          : string;
    sm5          : string;
    sm6          : string;
}

export interface TAXC {

    monthly    : string;
    m1         : string;
    m2         : string;
    m3         : string;
    m4         : string;
    m5         : string;
    m6         : string;
}
