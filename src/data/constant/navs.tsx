import { cloneDeep } from 'lodash';
import { lazy } from 'react';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';

import { USER_NAME } from '@/features/user';
import PrivateRoute from '@/routes/private-route';
import { capitalizeFirstLetter } from '@/utils';
import { Link } from 'react-router-dom';
import { DASHBOARD_PATH, USER_PATH } from './path';
import { NavParamsLink, TypeNavs, TypeRoutes } from './type-navs';

const Dashboard = lazy(() => import('@/pages/dashboard'));

const Users = lazy(() => import('@/pages/users'));
const UserDetail = lazy(() => import('@/pages/users/[id]'));
const UserAdd = lazy(() => import('@/pages/users/add'));

const navs: TypeNavs[] = [
  {
    key: DASHBOARD_PATH,
    label: 'dashboard',
    icon: <AiOutlineDashboard />,
    element: <Dashboard />,
  },
  {
    key: USER_PATH,
    label: `quản lý ${USER_NAME}`,
    icon: <AiOutlineUser />,
    element: <Users />,
    children: [
      {
        key: '/:id',
        element: <UserDetail />,
      },
      {
        key: '/add',
        element: <UserAdd />,
      },
    ],
  },
];

const getRoutes = (arr: TypeRoutes[], nav: TypeNavs, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element && <PrivateRoute>{nav.element}</PrivateRoute>,
  });
  return arr;
};

const addLink = (nav: NavParamsLink) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label)
  ) : (
    <Link to={nav.key}>{capitalizeFirstLetter(nav.label)}</Link>
  );
};

const getShowNavigation = (
  nav: TypeNavs,
  basePath = ''
): TypeNavs | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: TypeNavs[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    icon: nav.icon,
    title: addLink(nav as NavParamsLink),
    label: addLink(nav as NavParamsLink),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: TypeNavs[] = [];
const routeList: TypeRoutes[] = [];

for (const nav of navs) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { menuList, routeList };
