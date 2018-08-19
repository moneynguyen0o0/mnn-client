import loadable from 'loadable-components';

import { Error as ErrorComponent, Loading } from 'app/components';

export default loadable(() => import('./Home'), {
  LoadingComponent: Loading,
  ErrorComponent
});
