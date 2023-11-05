import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import TeamForm from './TeamForm';

function Teams() {
  const [vis, setVis] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);
  const userFirstName = currentUser.first_name;

  const handleVis = () => {
    setVis(!vis);
  };

  const userTeamsComps = currentUser.teams.map((team) => {
    if (team.tasks.some(task => task.user_id === currentUser.id)) {
      return (
        <div className="card">
          <NavLink className="nav-links" to={`/teams/${team.id}`} key={team.id}>
            {team.name}
          </NavLink>
        </div>
      )
    }
  });

  return (
    <div>
      <button className="add-btn" onClick={handleVis}>
        {!vis ? '+' : '-'}
      </button>
      <div className="links-container">
        {vis && <TeamForm vis={vis} setVis={setVis} />}
        <h4>Teams</h4>
        {userTeamsComps}
      </div>
    </div>
  );
}

export default Teams;