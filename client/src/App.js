import './styles/App.css';
import NavBar from './navbar/NavBar'
import Tasks from './tasks/Tasks'
import LoginPage from './users/LoginPage'
import Task from './tasks/Task'
import EditTask from './tasks/EditTask'
import Projects from './projects/Projects'
import Project from './projects/Project'
import Teams from './teams/Teams'
import Team from './teams/Team'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchCurrentUser } from './users/usersSlice'
import { fetchProjects } from './projects/projectsSlice'
import { fetchTeams } from './teams/teamsSlice'

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(fetchProjects())
    dispatch(fetchTeams())
    .then(() => setLoading(false))
  }, [dispatch])

  const currentUser = useSelector((state) => state.users.currentUser)

  if (loading) {
    return <div></div>
  }

  if (currentUser === null || currentUser.errors) {
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
          <Route 
          path="/tasks/:id/edit"
          element={<EditTask />}
          />
          <Route 
          path="/projects"
          element={<Projects />}
          />
          <Route 
          path="/projects/:id"
          element={<Project />}
          />
          <Route 
          path="/teams"
          element={<Teams />}
          />
          <Route 
          path="/teams/:id"
          element={<Team />}
          />
        </Routes>
    </main>

  );
}

export default App;
