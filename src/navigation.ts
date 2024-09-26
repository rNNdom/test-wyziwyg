// navigation.json
export const navigationBar = [
  {
    title: 'Datos',
    path: '/datos'
  },
  {
    title: 'Foro',
    path: '/foro'
  },
  {
    title: 'Servicios',
    path: '/servicios'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    subItems: [
      {
        title: 'Subsección 1',
        path: '/dashboard/subseccion1'
      },
      {
        title: 'Subsección 2',
        path: '/dashboard/subseccion2'
      }
    ]
  }
]
