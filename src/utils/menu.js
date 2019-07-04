

export function navigation(id) {
  return {
    items: [
      {
        title: true,
        name: 'Functions',
      },
      {
        name: 'Q&A',
        url: `/${id}/questions-answers`,
        icon: 'cui-speech',
      },
      {
        name: 'Surveys',
        url: `/${id}/survey`,
        icon: 'icon-chart',
      },
      {
        name: 'Guests',
        url: `/${id}/guests`,
        icon: 'cui-people',
        key: 'guests',
      },
      {
        name: 'Menu',
        icon: 'icon-direction',
        url: `/${id}/menu`,
      },
      {
        name: 'Agenda',
        icon: 'icon-notebook',
        url: `/${id}/agenda`,
      },
      {
        name: 'Materials',
        icon: 'icon-docs',
        url: `/${id}/materials`,
      },
      {
        name: 'Meeting',
        icon: 'fa icon-calendar',
        url: `/${id}/settings/meeting`,
      },
    ],
  };
}


export const mainNavigation = {
  items: [
    {
      title: true,
      name: 'Users',
    },
    {
      name: 'Users',
      icon: 'fa icon-user',
      exact: true,
      url: '/users',
    },
    {
      title: true,
      name: 'Tests',
    },
    {
      name: 'Tests',
      icon: 'fa icon-calendar',
      exact: true,
      url: '/surveys',
    },
    {
      name: 'Question list',
      icon: 'nav-icon icon-question',
      exact: true,
      url: '/polls/?page=1',
    },
    {
      name: 'New question',
      icon: 'nav-icon icon-options',
      exact: true,
      url: '/questions/new?type=CHOOSE',
    },
    {
      name: 'Sessions',
      icon: 'fa icon-calendar',
      exact: true,
      url: '/sessions',
    },
    {
      title: true,
      name: 'Settings',
    },
    {
      name: 'Subjects',
      icon: 'cui-layers',
      exact: true,
      url: '/subjects',
    },
    {
      name: 'Topics',
      icon: 'cui-bookmark',
      exact: true,
      url: '/topics',
    },
    {
      name: 'Settings',
      icon: 'fa icon-settings',
      exact: true,
      url: '/settings',
    },
    // {
    //   name: 'Meetings',
    //   icon: 'fa icon-calendar',
    //   exact: true,
    //   url: '/meetings',
    // },
    // {
    //   name: 'Themes',
    //   icon: 'fa cui-drop',
    //   url: '/themes',
    // },
    // {
    //   name: 'Domains',
    //   icon: 'fa icon-globe',
    //   url: '/domains',
  ],

};

