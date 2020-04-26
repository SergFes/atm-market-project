import { observer, inject } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';

export default function withStore(Component: IReactComponent) {
    return inject('store')(observer(Component));
}
