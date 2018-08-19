import loadable from 'loadable-components';

import { Error as ErrorComponent, Loading } from 'app/components';

export default loadable(() => import('./UserList'), {
  LoadingComponent: Loading,
  ErrorComponent
});
