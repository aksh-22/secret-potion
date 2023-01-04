import 'react-i18next';
import {en} from './translations';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    // defaultNS: 'common';
    resources: typeof en;
  }
}
