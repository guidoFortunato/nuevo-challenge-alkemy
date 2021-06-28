import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
//import Login from './components/Login';
import Admin from './components/Admin';
import Home from './components/Home';
import {auth} from './firebase'



function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false  ? (
    
    <Router>
      
      <Navbar firebaseUser={firebaseUser}/>
        <div className="container">
        {/* <Switch> envuelve las rutas */}
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          {/* <Route path='/login'>
            <Login />
          </Route> */}
          <Route path='/admin'>
            <Admin />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>cargando...</p>
  )
}

export default App;
