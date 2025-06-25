import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { GF } from 'app/shared/global-functions';

@Directive({
    selector: '[OnlyNumber][max][min]'
})
export class OnlyNumberDirective {
    @Input() OnlyNumber: boolean;
    @Input() max: number;
    @Input() min: number;
    @Input() maxLength: number;
    @Input() allowDecimal: boolean;
    @Input() allowNegative: boolean;
    @Input() allowthousand: boolean;
    @Input() decimal: number;
    @Input() suffix: string;
    @Input() prefix: string;

    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
        let inputValue = this.el.nativeElement.value;
        let selectionStart = this.el.nativeElement.selectionStart;
        let selectionEnd = this.el.nativeElement.selectionEnd;

        if (this.OnlyNumber) {
            // Clear the input if all text is selected and a number key is pressed
            if (selectionStart === 0 && selectionEnd === inputValue.length && !isNaN(Number(event.key))) {
                this.el.nativeElement.value = '';
                inputValue = '';
            }
            // Handling negative sign
            if (this.allowNegative && e.key === '-' && inputValue.indexOf('-') === -1 && this.el.nativeElement.selectionStart === 0) {return;}
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
                // Allow: Ctrl+C
                (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
                // Allow: Ctrl+V
                (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
                // Allow: Ctrl+X
                (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }

            if (this.allowDecimal) {
                // Only allow one decimal point
                if (e.keyCode === 190 || e.keyCode === 110) {
                    if (inputValue.indexOf('.') !== -1 || inputValue === '') {
                        e.preventDefault();
                        return;
                    }
                }
            }

            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            } else {
                let newValue = parseFloat(inputValue + e.key);

                if (this.allowDecimal) {
                    // Only allow up to `decimal` decimal places
                    if (e.key === '.' && (inputValue.indexOf('.') !== -1 || inputValue.length === 0)) {
                        e.preventDefault();
                        return;
                    }

                    let decimalIndex = inputValue.indexOf('.');
                    if (decimalIndex !== -1 && inputValue.length - decimalIndex > this.decimal) {
                        e.preventDefault();
                        return;
                    }
                }

                if (this.max && newValue > this.max) {
                    e.preventDefault();
                }

                if (this.min && newValue < this.min) {
                    e.preventDefault();
                }

                if (this.maxLength && inputValue.length >= this.maxLength) {
                    e.preventDefault();
                }
            }
        }
    }

    @HostListener('paste', ['$event']) onPaste(event) {
        let e = <ClipboardEvent>event;
        let clipboardData = e.clipboardData;
        let pastedData = clipboardData.getData('text');
        let inputValue = this.el.nativeElement.value;

        if (this.OnlyNumber) {
            let regex = /^[0-9]+$/;
            let hasInvalidChars = !regex.test(pastedData);
            if (hasInvalidChars) {
                e.preventDefault();
                return;
            }

            let newValue = parseInt(inputValue + pastedData);

            if (this.max && newValue > this.max) {
                e.preventDefault();
                return;
            }

            if (this.min && newValue < this.min) {
                e.preventDefault();
                return;
            }

            if (this.maxLength && (inputValue.length + pastedData.length) > this.maxLength) {
                e.preventDefault();
                return;
            }
        }

        if (this.allowDecimal && pastedData.includes('.')) {
            // Only allow one decimal point
            e.preventDefault();
            return;
        }

        let dotIndex = inputValue.indexOf('.');
        if (dotIndex !== -1) {
            // If there's already a decimal point, only allow pasting if it won't exceed the allowed decimal places
            let decimalPlaces = inputValue.length - dotIndex - 1;
            if (pastedData.length > this.decimal - decimalPlaces) {
                e.preventDefault();
                return;
            }
        }
    }

    @HostListener('blur') onBlur() {
        var inputValue = this.el.nativeElement.value.replace(GF.IsEmptyReturn(this.suffix, ""), "");
        var input = inputValue.replace(GF.IsEmptyReturn(this.suffix, ""), "");
        if (GF.IsEmpty(inputValue)) {
            this.el.nativeElement.value = "";
            return;
        }

        //Add Decimal
        if (this.allowDecimal) {
            let dotIndex = inputValue.indexOf('.');
            var dec = "";
            var decimal = "";
            for (let index = 0; index < this.decimal; index++) {
                dec += "0";
            }
            decimal = dec
            if (dotIndex !== -1) {
                decimal = inputValue.substring((dotIndex + 1), inputValue.length)
                input = inputValue.substring(0, dotIndex)
            } else {
                input = inputValue
            }
            if (decimal.length < this.decimal) {
                dec = "";
                for (let ii = 0; ii < this.decimal; ii++) {
                    dec += decimal[ii] === "0" ? "0" : GF.IsEmptyReturn(decimal[ii], "0");
                }
            } else {
                dec = decimal
            }

            input = input + "." + dec
        }

        //Add Suffix
        if (this.suffix) {
            var sufIndex = input.indexOf(this.suffix)
            if (sufIndex == -1) {
                input = input + this.suffix;
            }
        }

        // Add Prefix
        if (this.prefix) {
            var prefixIndex = input.indexOf(this.prefix);
            if (prefixIndex == -1) {
                input = this.prefix + input;
            }
        }

        // Format with Commas
        if (this.allowthousand) {
            input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        this.el.nativeElement.value = input;
    }
}
