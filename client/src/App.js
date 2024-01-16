import './styles/App.css';
import NavBar from './components/navbar/NavBar'
import Tasks from './components/tasks/Tasks'
import LoginPage from './components/users/LoginPage'
import Task from './components/tasks/Task'
import EditTask from './components/tasks/EditTask'
import Projects from './components/projects/Projects'
import Project from './components/projects/Project'
import Teams from './components/teams/Teams'
import Team from './components/teams/Team'
import NotFound from './components/NotFound'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchCurrentUser, fetchUsers } from './state/usersSlice'
import { fetchProjects } from './state/projectsSlice'
import { fetchTeams } from './state/teamsSlice'
import { ToastContainer} from 'react-toastify';

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
    return <div></div>
  }

  if (!currentUser || currentUser.errors) {
    return <LoginPage />
  }

  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <main>
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
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
