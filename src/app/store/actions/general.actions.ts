import { createAction, props } from '@ngrx/store';

export const showNotification = createAction(
    '[General] Show notification',
);

export const dismissNotification = createAction(
    '[General] Dismiss notification',
);

export const delayDismissNotification = createAction(
    '[General] Delay dismiss notification',
);
