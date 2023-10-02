import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import TeamForm from './TeamForm';

function Teams() {
  const [vis, setVis] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);
  const allTeams = useSelector((state) => state.teams.entities);
  const userTeams = allTeams.filter((team) => team.auth_users.includes(currentUser.id));

  const handleVis = () => {
    setVis(!vis);
  };

  const userFirstName = currentUser.first_name;
  const userNamePossessive = userFirstName.endsWith('s') ? `${userFirstName}'` : `${userFirstName}'s`;

  const userTeamsComps = userTeams.map((team) => (
    <NavLink className="nav-links" to={`/teams/${team.id}`} key={team.id}>
      {team.name}
    </NavLink>
  ));

  return (
    <div>
      <button className="add-btn" onClick={handleVis}>
        {!vis ? '+ Add Team' : 'Cancel'}
      </button>
      <div className="links-container">
        {vis && <TeamForm vis={vis} setVis={setVis} />}
        <h4>{userNamePossessive} Teams</h4>
        {userTeamsComps.length > 0 ? userTeamsComps : 'Please create a team.'}
      </div>
    </div>
  );
}

export default Teams;