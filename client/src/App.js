import './App.css';
import NavBar from './navbar/NavBar'
import Tasks from './tasks/Tasks'
import LoginPage from './login/LoginPage'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchCurrentUser } from './login/usersSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  const currentUser = useSelector((state) => state.users.currentUser)

  if (!currentUser) {
    return <LoginPage />
  }

  return (
    <main>
      <NavBar />
        <Routes>
          <Route
          path="/"
          element={<Tasks />}/>
          <Route
          path="/login"
          element={<LoginPage />}
          />
        </Routes>
    </main>

  );
}

export default App;
