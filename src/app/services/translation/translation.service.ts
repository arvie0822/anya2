import { Component, Injectable, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root' // Ensures it's globally available
})
export class TranslationService {
    private static translocoService: TranslocoService;

    constructor(private service: TranslocoService) {
        TranslationService.translocoService = service;
    }

    // Static method for global translation
    static translate(key: string, params?: Record<string, any>, lang?: string): string {
        return this.translocoService ? this.translocoService.translate(key, params, lang) : key;
    }
}
