import { cloneDeep } from 'lodash';
import { lazy } from 'react';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';

import { MEMBER_NAME } from '@/features/member';
import { STORE_NAME } from '@/features/store';
import { USER_NAME } from '@/features/user';
import PrivateRoute from '@/routes/private-route';
import { capitalizeFirstLetter } from '@/utils';
import { BsPersonVcard } from 'react-icons/bs';
import { FaStore } from 'react-icons/fa';
import { SlEarphonesAlt } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import {
  DASHBOARD_PATH,
  MEMBER_PATH,
  STORE_PATH,
  SUPPORT_PATH,
  USER_PATH,
} from './path';
import { NavParamsLink, TypeNavs, TypeRoutes } from './type-navs';
import { SUPPORT_NAME } from '@/features/support';

const Dashboard = lazy(() => import('@/pages/dashboard'));

const Users = lazy(() => import('@/pages/users'));
const UserDetail = lazy(() => import('@/pages/users/[id]'));
const UserAdd = lazy(() => import('@/pages/users/add'));

const Members = lazy(() => import('@/pages/members'));
const MemberDetail = lazy(() => import('@/pages/members/[id]'));

const Stores = lazy(() => import('@/pages/stores'));
const StoreDetail = lazy(() => import('@/pages/stores/[id]'));

const Support = lazy(() => import('@/pages/support'));

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
        label: `chi tiết ${USER_NAME}`,
        element: <UserDetail />,
        hidden: true,
      },
      {
        key: '/add',
        label: `Thêm ${USER_NAME}`,
        element: <UserAdd />,
        hidden: true,
      },
    ],
  },
  {
    key: MEMBER_PATH,
    label: `quản lý ${MEMBER_NAME}`,
    icon: <BsPersonVcard />,
    element: <Members />,
    children: [
      {
        key: '/:id',
        label: `chi tiết ${MEMBER_NAME}`,
        element: <MemberDetail />,
        hidden: true,
      },
    ],
  },
  {
    key: STORE_PATH,
    label: `quản lý ${STORE_NAME}`,
    icon: <FaStore />,
    element: <Stores />,
    children: [
      {
        key: '/:id',
        label: `chi tiết ${STORE_NAME}`,
        element: <StoreDetail />,
        hidden: true,
      },
    ],
  },
  {
    key: SUPPORT_PATH,
    label: `quản lý ${SUPPORT_NAME}`,
    icon: <SlEarphonesAlt />,
    element: <Support />,
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
  if (nav.hidden === true) return;
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
