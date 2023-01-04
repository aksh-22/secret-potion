import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { createRef } from 'react';
export const navigationRef = createNavigationContainerRef<any>();
export const isReadyRef: any = createRef();

export function navigate(name: never | any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function reset(args: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.reset(args);
  }
}

export function dispatch(...args: [any]) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(...args));
  }
}

// export function replace(name, params) {
//   if (isReadyRef.current && navigationRef.current) {
//     navigationRef?.current?.replace(name, params);
//   }
// }
