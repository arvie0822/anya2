import { FuseConfirmationConfig } from "@fuse/services/confirmation";
import { TranslocoService } from "@ngneat/transloco";
import { TranslationService } from "app/services/userService/user.service";


let translocoService: TranslocoService | null = null;

// Function to set TranslocoService (Call in AppComponent)
export function setTranslocoService(service: TranslocoService): void {
    translocoService = service;
}

// Function to translate a message when accessed
function createMessageConfig(baseConfig: FuseConfirmationConfig): FuseConfirmationConfig {
    return new Proxy(baseConfig, {
        get(target, prop: keyof FuseConfirmationConfig) {
            if (prop === 'message' || prop === 'title') {
                if (!translocoService) {
                    console.warn('TranslocoService is not initialized yet!');
                    return target[prop]; // Return original message if not initialized
                }
                return prop === 'message'
                    ? translocoService.translate(target.message as string)
                    : translocoService.translate(target.title as string)
            }
            return target[prop];
        },
    });
}

export const SaveMessage: FuseConfirmationConfig = createMessageConfig({
        title: '',
        message: "Are you sure you want to save?",
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation-circle',
            color: 'warn'
        },
        actions: {
            confirm: {
                show: true,
                label: "Yes",
                color: 'primary',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: true
})



export const SuccessMessage: FuseConfirmationConfig = createMessageConfig ({
    title      :  'Successful!',
    message    :  'Transaction has been Saved!',
    icon       : {
        show : true,
        name : 'heroicons_outline:clipboard-document-check',
        color: 'success'
    },
    actions    : {
        confirm: {
            show : true,
            label: 'Confirm',
            color: 'primary'
        },
        cancel : {
            show : false,
            label: 'Cancel'
        }
    },
    dismissible: false
});

export const FailedMessage: FuseConfirmationConfig = createMessageConfig ({
    title      :  'Failed!',
    message    :  'Transaction Failed!',
    icon       : {
        show : true,
        name : 'heroicons_outline:exclamation-circle',
        color: 'error'
    },
    actions    : {
        confirm: {
            show : true,
            label: 'Confirm',
            color: 'warn'
        },
        cancel : {
            show : false,
            label: 'Cancel'
        }
    },
    dismissible: false
});
