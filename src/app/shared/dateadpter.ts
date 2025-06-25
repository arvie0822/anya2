import { Injectable, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { fuseAnimations } from '@fuse/animations';

@Injectable({
  providedIn: 'root', // Makes this service available globally without needing to be included in a module's `providers` array
})
export class CustomDateAdapter extends DateAdapter<Date> {

  override setLocale(locale: string): void {
    super.setLocale(locale);
    // Set the locale logic, if needed
  }

  override parse(value: any, parseFormat?: any): Date | null {
    if (!value) return null;
    if (typeof value === 'string') {
      const dateParts = value.split('/');
      if (dateParts.length === 3) {
        const month = parseInt(dateParts[0], 10) - 1;
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
        return new Date(Date.UTC(year, month, day));
      }
    }
    return value instanceof Date ? new Date(value) : null;
  }

  override format(date: Date, displayFormat: string): string {
    if (!date) return '';
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString();
    return `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;
  }

  override getYear(date: Date): number {
    return date.getUTCFullYear();
  }

  override getMonth(date: Date): number {
    return date.getUTCMonth();
  }

  override getDate(date: Date): number {
    return date.getUTCDate();
  }

  override getDayOfWeek(date: Date): number {
    return date.getUTCDay();
  }

  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return style === 'short' ? months.map(m => m.substr(0, 3)) :
           style === 'narrow' ? months.map(m => m[0]) : months;
  }

  override getDateNames(): string[] {
    return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return style === 'short' ? days.map(d => d.substr(0, 3)) :
           style === 'narrow' ? days.map(d => d[0]) : days;
  }

  override getYearName(date: Date): string {
    return date.getUTCFullYear().toString();
  }

  override getFirstDayOfWeek(): number {
    return 0; // Sunday
  }

  override getNumDaysInMonth(date: Date): number {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  }

  override clone(date: Date): Date {
    return new Date(date.getTime());
  }

  override createDate(year: number, month: number, date: number): Date {
    const result = new Date(Date.UTC(year, month, date));
    if (result.getUTCFullYear() !== year || result.getUTCMonth() !== month || result.getUTCDate() !== date) {
      throw new Error('Invalid date');
    }
    return result;
  }

  override today(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  }

  override addCalendarMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setUTCMonth(newDate.getUTCMonth() + months);
    return newDate;
  }

  override addCalendarYears(date: Date, years: number): Date {
    const newDate = new Date(date);
    newDate.setUTCFullYear(newDate.getUTCFullYear() + years);
    return newDate;
  }

  override addCalendarDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    return newDate;
  }

  override toIso8601(date: Date): string {
    return date.toISOString();
  }

  override isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  override isValid(date: Date): boolean {
    return !isNaN(date.getTime());
  }

  override invalid(): Date {
    return new Date(NaN);
  }
}
