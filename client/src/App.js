import './styles/App.css';
import NavBar from './navbar/NavBar'
import Tasks from './tasks/Tasks'
import LoginPage from './users/LoginPage'
import Task from './tasks/Task'
import EditTask from './tasks/EditTask'
import Projects from './projects/Projects'
import Project from './projects/Project'
import Workspaces from './workspaces/Workspaces'
import Workspace from './workspaces/Workspace'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchCurrentUser } from './users/usersSlice'
import { fetchProjects } from './projects/projectsSlice'
import { fetchWorkspaces } from './workspaces/workspacesSlice'

function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(fetchProjects())
    dispatch(fetchWorkspaces())
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
          path="/workspaces"
          element={<Workspaces />}
          />
          <Route 
          path="/workspaces/:id"
          element={<Workspace />}
          />
        </Routes>
    </main>

  );
}

export default App;
