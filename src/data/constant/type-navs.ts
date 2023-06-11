import { ReactElement } from 'react';

type NavsChild = {
  key: string;
  icon?: ReactElement;
  title?: string | ReactElement;
  label?: string | ReactElement;
  element?: ReactElement;
};

export type TypeNavs = NavsChild & {
  children?: NavsChild[];
};

type RouteChild = Pick<NavsChild, 'element'> & {
  path: string;
};

export type TypeRoutes = RouteChild & {
  children?: RouteChild[];
};

export type NavParamsLink = { key: string; label: string; children?: unknown };
