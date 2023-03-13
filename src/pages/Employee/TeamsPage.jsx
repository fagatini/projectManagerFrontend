import { useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../axios/hooks";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { TeamFrame } from "../../components/TeamFrame/TeamFrame";
import { Button } from "@mui/material";
import {
  ButtonBlock,
  TeamWrapper,
} from "../../components/TeamFrame/TeamFrameStyle";

export function TeamsPage() {
  const [teamList, setTeamList] = useState([]);
  const param = useParams();

  const leaveTeam = (teamId) => {
    setTeamList(teamList.filter((e) => e.team_id !== teamId));
  };

  const onCreateClick = async () => {
    let newSpec = prompt("input new spec");
    if (newSpec && newSpec.length >= 3) {
      const response = await sendPostRequest(`/app/group`, {
        leader_acc_id: param.id,
        specialization: newSpec,
      });
      setTeamList([...teamList, response]);
    } else alert("spec is to short or smth went wrong");
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `/app/profile/employee/teams/${param.id}`
      );
      setTeamList(response);
    })();
  }, [param.id]);

  return (
    <>
      <Header />
      <TeamWrapper>
        {teamList
          ? teamList.map((team) => (
              <TeamFrame key={team.team_id} team={team} leaveFunc={leaveTeam} />
            ))
          : null}
        <ButtonBlock>
          <Button onClick={(e) => onCreateClick()} variant="contained">
            create new
          </Button>
        </ButtonBlock>
      </TeamWrapper>
    </>
  );
}
