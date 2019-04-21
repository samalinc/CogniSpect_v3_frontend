import withUser from 'components/HOC/WithUser';

import Menu from 'containers/Menu';
import Login from 'containers/Login';
import NotFound from 'containers/NotFound';
import ConferenceContainer from 'containers/Conference';
import ThemesContainer from 'containers/Themes';
import ConferenceNew from 'containers/ConferenceNew';
import ThemesNew from 'containers/ThemesNew';
import Domains from 'containers/Domains';
import {
  QuestionsAnswers,
  Guests,
  GuestsNew,
  GuestsEdit,
  Materials,
  Agenda,
  ThemeEdit,
  Users
} from 'containers';
import Survey from 'containers/Survey';
import Settings from 'containers/Settings';
import AuthLayout from '../layouts/AuthLayout';
import DefaultLayout from '../layouts/DefaultLayout';
import ConferenceLayout from '../layouts/ConferenceLayout';

const routes = [
  {
    path: '/users',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: Users,
  },
  {
    path: '/login',
    exact: true,
    isPrivate: false,
    layout: DefaultLayout,
    component: Login,
    withUser: true,
  },
  {
    path: '/meetings',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: ConferenceContainer,
  },
  {
    path: '/domains',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: Domains,
  },
  {
    path: '/themes',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: ThemesContainer,
  },
  {
    path: '/conference/new',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: ConferenceNew,
  },
  {
    path: '/themes/new',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: ThemesNew,
  },
  {
    path: '/themes/edit/:id',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: ThemeEdit,
  },
  {
    path: '/:id/theme',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: ThemesContainer,
  },
  {
    path: '/:id/menu',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Menu,
  },
  {
    path: '/:id/settings/meeting',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Settings,
  },
  {
    path: '/:id/agenda',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Agenda,
  },
  {
    path: '/:id/agenda',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Agenda,
  },
  {
    path: '/:id/materials',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Materials,
  },
  {
    path: '/:id/guests/new',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: GuestsNew,
  },
  {
    path: '/:id/guests',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Guests,
  },
  {
    path: '/:id/questions-answers',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: QuestionsAnswers,
  },
  {
    path: '/:id/survey',
    exact: true,
    isPrivate: true,
    layout: ConferenceLayout,
    component: Survey,
  },
  {
    path: '*',
    exact: true,
    isPrivate: true,
    layout: DefaultLayout,
    component: NotFound,
  },
];

export default routes;
