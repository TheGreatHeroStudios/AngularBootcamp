import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';

import {
  AppState,
  appleCounterReducer,
  berryCounterReducer
} from './state';

// Register your reducers with NgRx framework in an AOT-compatible way
export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<AppState, Action>
>('Root reducers token', {
  factory: () => ({
    berryCounter: berryCounterReducer,
    appleCounter: appleCounterReducer
  })
});
