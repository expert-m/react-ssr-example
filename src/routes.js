import AppRoot from './components/AppRoot'
import Home from './components/Home'


const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/',
        component: Home,
      },
    ],
  },
]


export default routes
