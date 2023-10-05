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
import NotFound from './NotFound'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchCurrentUser, fetchUsers } from './users/usersSlice'
import { fetchProjects } from './projects/projectsSlice'
import { fetchTeams } from './teams/teamsSlice'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    dispatch(fetchCurrentUser())
      .then(() => setLoading(false))
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(fetchUsers());
      dispatch(fetchProjects());
      dispatch(fetchTeams());
    }
  }, [dispatch, currentUser && currentUser.id]);

  if (loading) {
    return <div>"Loading..."</div>
  }

  if (!currentUser || currentUser.errors) {
    return <LoginPage />
  }

  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/tasks/:id" element={<Task />} />
        <Route path="/tasks/:id/edit" element={<EditTask />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>

  );
}

export default App;
