import { inject } from '@angular/core';
import { NavigationServiceadmin } from 'app/core/navigation/navigation.service-admin';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
// import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { forkJoin } from 'rxjs';

export const initialDataResolveradmin = () => {
    // const messagesService = inject(MessagesService);
    const navigationService = inject(NavigationServiceadmin);
    // const notificationsService = inject(NotificationsService);
    // const quickChatService = inject(QuickChatService);
    // const shortcutsService = inject(ShortcutsService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
        // messagesService.getAll(),
        // notificationsService.getAll(),
        // quickChatService.getChats(),
        // shortcutsService.getAll(),
    ]);
};
