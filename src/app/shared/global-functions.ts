import { TranslocoService } from "@ngneat/transloco";
import { inject } from '@angular/core';
import { TranslationService } from 'app/services/userService/user.service';

export class GF {

    static IsEmpty(value: any, allowZero?: boolean): boolean {
        return value === null || value === undefined || value === '' || (allowZero ? !allowZero : value === 0 ) || value?.length === 0;
    }

    static IsEmptyReturn(value: any, returns: any): any {
        return this.IsEmpty(value) ? returns : value;
    }

    static IsEqual(value: any, compare: any[]): any {
        return compare.includes(value)
    }

    static IsMultiEmpty(object: object, keys: string[], isAll: boolean): any {
        // check if isAll is true then should check all keys in object is empty then return true, else false and if isAll = false some should empty then return true else false
        if (isAll) {
            return keys.every(x=>this.IsEmpty(object[x]))
        } else {
            return keys.some(x=>this.IsEmpty(object[x]))
        }
    }

    static FilterEqual(list: any, compareOn: string = null, compare: any[]): any {
        if (compareOn) {
            return list.filter(x=>compare.includes(x[compareOn]))
        } else {
            return list.filter(x=>compare.includes(x))
        }
    }

    static FilterNotEqual(list: any, compareOn: string = null, compare: any[]): any {
        if (compareOn) {
            return list.filter(x=>!compare.includes(x[compareOn]))
        } else {
            return list.filter(x=>!compare.includes(x))
        }
    }

    static FilterNotIncludes(list: any, compareOn: string = null, compare: string): any {
        if (compareOn) {
            return list.filter(x=>!x[compareOn].toLowerCase().includes(compare.toLowerCase()) )
        } else {
            return list.filter(x=>!x.toLowerCase().includes(compare.toLowerCase()))
        }
    }

    static sort(list: any, sortby: string = null): any {
        if (sortby) {
            return list.sort((a, b) => {
                const valueA = typeof a[sortby] === 'string' ? a[sortby].toLowerCase() : a[sortby];
                const valueB = typeof b[sortby] === 'string' ? b[sortby].toLowerCase() : b[sortby];
                return this.compareValues(valueA, valueB);
            });
        } else {
            return list.sort((a, b) => {
                const valueA = typeof a === 'string' ? a.toLowerCase() : a;
                const valueB = typeof b === 'string' ? b.toLowerCase() : b;
                return this.compareValues(valueA, valueB);
            });
        }
    }

    static compareValues(valueA, valueB) {
        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    }

    static unique(list: any, compare: any, object: string): any {
        list.forEach(op => {
            if (!compare.some(x => x[object] == op[object])) {
                compare.push(op)
            }
        });

        return compare;
    }

    static removeOrPushFromList(list: any, exclude: any, id: string | number): any {
        var newList = this.IsEmptyReturn(list, exclude);
        if (newList.some(x => x === id)) {
            var idx = exclude.findIndex(x=>x===id)
            exclude.splice(idx,1)
          } else {
            exclude.push(id);
          }
        return exclude;
    }

    static arraysAreEqual(array1: Array<any>, array2: Array<any>, object?: string): boolean {
        // Check if the arrays are both empty
        if (this.IsEmpty(array1) && this.IsEmpty(array2)) {
          return true;
        }
        // Check if the arrays have the same length
        if (array1.length !== array2.length) {
          return false;
        }
        // Check each element of the arrays
        for (let i = 0; i < array1.length; i++) {
            if (object) {
                if (array1[i][object] !== array2[i][object]) {
                    return false;
                }
            } else {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }
            // If all elements are equal, the arrays are equal
            return true;
        }
    }

    static getNestedObject(obj, path) {
        return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
    }

    static groupedByCount(list, keys) {
        const grouped = list.reduce((acc, obj) => {
            const key = obj[keys].length === 0 ? "empty" : JSON.stringify(obj[keys].map(name => name.trim()).sort());
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(grouped).length;
    }

    static toCamelCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1).replace(/([-_]\w)/g, (matches) => matches[1].toUpperCase());
    }


    static ConvertSP(inputString) {
        const specialCharacters = {
          'á': 'a',
          'é': 'e',
          'í': 'i',
          'ó': 'o',
          'ú': 'u',
          'ñ': 'n',
          'Á': 'A',
          'É': 'E',
          'Í': 'I',
          'Ó': 'O',
          'Ú': 'U',
          'Ñ': 'N',
          'ä': 'a',
          'ë': 'e',
          'ï': 'i',
          'ö': 'o',
          'ü': 'u',
          'Ä': 'A',
          'Ë': 'E',
          'Ï': 'I',
          'Ö': 'O',
          'Ü': 'U',
          'à': 'a',
          'è': 'e',
          'ì': 'i',
          'ò': 'o',
          'ù': 'u',
          'À': 'A',
          'È': 'E',
          'Ì': 'I',
          'Ò': 'O',
          'Ù': 'U',
          'â': 'a',
          'ê': 'e',
          'î': 'i',
          'ô': 'o',
          'û': 'u',
          'Â': 'A',
          'Ê': 'E',
          'Î': 'I',
          'Ô': 'O',
          'Û': 'U',
          'å': 'a',
          'Å': 'A',
          'æ': 'ae',
          'Æ': 'AE',
          'ø': 'o',
          'Ø': 'O',
          'ç': 'c',
          'Ç': 'C',
          'ß': 'ss',
          'ÿ': 'y',
          'Ÿ': 'Y'
        };
        inputString = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let outputString = '';

        for (let i = 0; i < inputString.length; i++) {
          const char = inputString[i];
          const convertedChar = specialCharacters[char] || char;
          outputString += convertedChar;
        }

        return outputString;
      }

      static isBrokenImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(false);  // image loaded, not broken
            img.onerror = () => resolve(true);  // image failed to load, broken
            img.src = url;
        });
    }


    static base64ToFile(base64: string, filename: string, mimeType: string): File {
        const bstr = atob(base64); // directly decode
        const n = bstr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new File([u8arr], filename, { type: mimeType });
    }

}

var exportFileName = ""

export const Globals = {
    SERVICE_URL: 'https://v2uat.aanyahr.com:6300/reporting/reportservice/api/Viewer',
    REPORT_SERVER_URL: 'https://v2uat.aanyahr.com:6300/reporting/api/site/master',
    SERVER_TOKEN: '',
    DESIGNER_SERVICE_URL: '',
    TOOLBAR_OPTIONS: {
        showToolbar: true,
        customGroups: [{
            items: [{
                type: 'Default',
                cssClass: 'e-icon e-edit e-reportviewer-icon ej-webicon CustomGroup',
                id: 'edit-report',
                // Need to add the proper header and content once, the tool tip issue resolved.
                tooltip: {
                    header: 'Edit Report',
                    content: 'Edit this report in designer'
                }
            }],
            // Need to remove the css (e-reportviewer-toolbarcontainer ul.e-ul:nth-child(4)) once the group index issue resolved
            groupIndex: 3,
            cssClass: 'e-show'
        }]
    },
    DESTROY_REPORT: true,
    RENDERING_COMPLETE: (event) => {
        var parameters = event.reportParameters;
        exportFileName = parameters?.find(x=>x.name == "ReportName")?.values[0]
    },
    EXPORT_ITEM_CLICK: (event) => {
        event.fileName = exportFileName
        Globals.DESTROY_REPORT = false;
    },
    EDIT_REPORT: (args) => {
        if (args.value === 'edit-report') {
            const path = location.href.split('#');
            const reportPath = location.href.lastIndexOf('external-parameter-report') !== -1 ? 'external-parameter-report' :
                location.href.lastIndexOf('parameter-customization') !== -1 ? 'parameter-customization' : args.model.reportPath;
            const ReportDesignerPath = reportPath.indexOf('.rdlc') !== -1 ? 'report-designer/rdlc' : 'report-designer';
            window.open(`${path[0]}#/${ReportDesignerPath}?report-name=${reportPath}`,
                path[1].indexOf('/preview') === -1 ? '_blank' : '_self');

        }
    }
};
