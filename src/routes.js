export const ROUTES = {
  login: '/login',
  create: '/create',
  settings: '/settings',
  home: '/',
  reports: {
    internal: '/reports/internal',
    regulator: '/reports/regulator'
  },
  specificReport: {
    index: '/specific-report/:id',
    edit: '/specific-report/:id/edit'
  },
  notFound: '*'
}

export const getRouteWithId = (route, id) => {
  if (id) {
    return route.replace(':id', id)
  }
  return route
}
