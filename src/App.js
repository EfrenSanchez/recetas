//Dependencies
import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom"

//Pages
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Timer from './pages/Timer'

//Componets
import IfOffline from './components/IfOffline'

//Styles
import './App.css'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <header>
            <Link to="/">Recetas <IfOffline>Offline</IfOffline></Link>
            <Link to="/timer" className="timerLink">⏱</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;