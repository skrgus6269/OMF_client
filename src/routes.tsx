import CheckScore from './pages/check-score';
import CheckScoreDetail from './pages/check-score/detail';
import Guide from './pages/guide';
import Login from './pages/login';
import Main from './pages/main';
import Grading from './pages/grading';
import Splash from './pages/splash';
import Layout from '@/pages/_layout';
import HomePage from '@/pages/homepage';
import Index from '@/pages/index';
import Redirection from '@/pages/redirection';
import Test from './pages/test';

export const routes = [
  {
    element: <Layout />,
    path: '/',
    children: [
      { path: '', element: <Index /> },
      { path: 'homepage', element: <HomePage /> },
      {
        path: 'check-score',
        children: [
          { index: true, element: <CheckScore /> },
          { path: ':id', element: <CheckScoreDetail /> },
        ],
      },
      { path: 'guide', element: <Guide /> },
      { path: 'login', element: <Login /> },
      { path: 'kakao/callback', element: <Redirection /> },
      { path: 'main', element: <Main /> },
      { path: 'test', element: <Test /> },
      { path: 'grading', element: <Grading /> },
      { path: 'splash', element: <Splash /> },
    ],
  },
];