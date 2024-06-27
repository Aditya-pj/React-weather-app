import Home from './home';
import './App.css';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
