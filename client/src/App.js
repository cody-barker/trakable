import './styles/App.css';
import NavBar from './navbar/NavBar'
import Tasks from './tasks/Tasks'
import LoginPage from './login/LoginPage'
import Task from './tasks/Task'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchCurrentUser } from './login/usersSlice'

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCurrentUser())
    .then(() => setLoading(false))
  }, [dispatch])

  const currentUser = useSelector((state) => state.users.currentUser)

  if (loading) {
    return null
  }

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
          path="/tasks/:id"
          element={<Task />}
          />
        </Routes>
    </main>

  );
}

export default App;
