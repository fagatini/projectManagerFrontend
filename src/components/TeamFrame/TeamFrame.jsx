import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendEditRequest } from "../../axios/hooks";
import { SpecText, TeamFrameBlock } from "./TeamFrameStyle";

export function TeamFrame(props) {
  const [team, setTeam] = useState({ ...props.team });
  const param = useParams();
  let navigate = useNavigate();

  const onLeaveClick = async () => {
    await sendEditRequest(`/app/profile/employee/teams/${param.id}`, {
      team_id: team.team_id,
    });
    props.leaveFunc(team.team_id);
  };

  const onInfoClick = async () => {
    navigate(`/team/${team.team_id}`);
  };

  return (
    <TeamFrameBlock>
      <p>
        <strong>Specialization</strong>
      </p>
      <SpecText>{team.specialization}</SpecText>
      <Button onClick={(e) => onLeaveClick()} variant="contained">
        leave
      </Button>
      <Button onClick={(e) => onInfoClick()} variant="contained">
        info
      </Button>
    </TeamFrameBlock>
  );
}
