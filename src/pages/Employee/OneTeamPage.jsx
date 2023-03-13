import { useEffect, useState } from "react";
import {
  sendGetRequest,
  sendDeleteRequest,
  sendEditRequest,
} from "../../axios/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import {
  ButtonBlock,
  EmployeeBlock,
  SpecBlock,
  SpecText,
} from "./EmployeePagesStyle";
import { ColumnWrapper } from "../../style";
import { Button } from "@mui/material";

export function OneTeamPage() {
  const [memberList, setMemberList] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    teamId: "",
    specialization: "",
  });

  const param = useParams();
  let navigate = useNavigate();

  const onDeleteClick = async () => {
    await sendDeleteRequest(`/app/group/${groupInfo.teamId}`);

    navigate(`/employee/teams/${localStorage.getItem("logged")}`);
  };

  const onChangeClick = async () => {
    let newSpec =
      prompt("input new spec", groupInfo.specialization) ||
      groupInfo.specialization;
    await sendEditRequest(`/app/group/${groupInfo.teamId}`, {
      specialization: newSpec,
    });
    setGroupInfo({ teamId: groupInfo.teamId, specialization: newSpec });
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(`/app/group/${param.id}`);
      setGroupInfo({
        teamId: response.mainInfo.team_id,
        specialization: response.mainInfo.specialization,
      });
      setMemberList(response.members);
    })();
  }, [param.id]);

  return (
    <>
      <Header />
      <ColumnWrapper>
        <div>
          <SpecBlock>
            <SpecText>
              <strong>Specialization</strong>
            </SpecText>
            <SpecText>{groupInfo.specialization}</SpecText>
          </SpecBlock>
          <ButtonBlock>
            <Button onClick={(e) => onChangeClick()} variant="contained">
              change specialization
            </Button>
            <Button onClick={(e) => onDeleteClick()} variant="contained">
              delete team
            </Button>
          </ButtonBlock>
        </div>
        {memberList.map((member) => (
          <EmployeeBlock key={member.employee_id}>
            <SpecText>
              {member.first_name} {member.midle_name} {member.second_name}
            </SpecText>
            <SpecText>
              {member.post} for {member.experience}
            </SpecText>
          </EmployeeBlock>
        ))}
      </ColumnWrapper>
    </>
  );
}
