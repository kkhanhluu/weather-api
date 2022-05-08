import { IocContainer } from '@tsoa/runtime';
import Container from 'typedi';

export const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => Container.get<T>(controller as never),
};
