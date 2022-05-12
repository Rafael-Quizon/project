import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/login'
import Main from './pages/Main/dashboard'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path= "/mainpage" exact component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
