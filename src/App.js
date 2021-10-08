import {BrowserRouter, Route}from 'react-router-dom'
import Content from './pages/Content';
import vscode from './pages/vscode';
import docker from './pages/docker';

const routes = [
  {path: "/", component: Content},
  {path: "/vscode", component: vscode},
  {path: "/docker", component: docker},
];

function App() {
  return (
    <BrowserRouter basename="jupiter">
      <div>
        {
          routes.map((page, index) => page.component ?
            <Route key={index} exact path={page.path} component={page.component}/> : "")
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
