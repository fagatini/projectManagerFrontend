import { useEffect, useState } from "react";
import { sendGetRequest } from "../../axios/hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { SelectBlock, TeamBlock } from "./AdminPagesStyle";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { ColumnWrapper } from "../../style";
import projectDataStore from "../../store/projectDataStore";

export function AdminAllTeamsPage() {
  const [teamList, setTeamList] = useState([]);

  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [limit, setLimit] = useState(9);

  const [searchText, setSearchText] = useState("");

  const param = useParams();
  let navigate = useNavigate();

  const onInfoClick = async (teamId) => {
    navigate(`/team/${teamId}`);
  };

  const onSearchChange = (e) => {
    setPageNum(0);
    setSearchText(e.target.value);
  };

  const onIconClick = (team_id) => {
    projectDataStore.saveOnServer(team_id);
    const id = projectDataStore.task.project_id;
    navigate(`/admin/project/${id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `/app/admin/teams?page_num=${pageNum}&limit=${limit}&search_text=${searchText}`
      );
      setTeamList(response.rows);
      setPageCount(Math.ceil(response.count / limit));
    })();
  }, [param.id, pageNum, limit, searchText]);

  return (
    <>
      <Header />
      <ColumnWrapper>
        <SelectBlock>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel>Page number</InputLabel>
            <Select
              value={pageNum}
              onChange={(e) => setPageNum(e.target.value)}
            >
              {[...Array(pageCount).keys()].map((e) => (
                <MenuItem key={e} value={e}>
                  {e + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => onSearchChange(e)}
            value={searchText}
            label="Search field"
            variant="standard"
          ></TextField>
        </SelectBlock>
        {teamList
          ? teamList.map((team) => (
              <TeamBlock key={team.team_id}>
                {team.team_id}: {team.specialization}
                <div>
                  {projectDataStore.isCreatingStart() ? (
                    <Tooltip title="add">
                      <IconButton onClick={(e) => onIconClick(team.team_id)}>
                        <ControlPointIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                  <Button
                    onClick={(e) => onInfoClick(team.team_id)}
                    variant="contained"
                  >
                    info
                  </Button>
                </div>
              </TeamBlock>
            ))
          : null}
      </ColumnWrapper>
    </>
  );
}
