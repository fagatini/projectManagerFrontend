import { useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../axios/hooks";
import { Header } from "../../components/Header/Header";

import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ColumnWrapper } from "../../style";
import {
  ExpText,
  FioText,
  PopOverContent,
  SelectBlock,
  SpecBlock,
  TeamRow,
  TeamText,
} from "./EmployeePagesStyle";

export function AllEpmlPage() {
  const [employeeList, setEmployeeList] = useState([]);

  const [choosedUser, setChoosedUser] = useState(null);

  const [orderBy, setOrderBy] = useState("first_name");

  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [limit, setLimit] = useState(8);

  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchParamSelect, setSearchParamSelect] = useState("first_name");
  const [searchParam, setSearchParam] = useState("first_name");

  const [anchorEl, setAnchorEl] = useState(null);
  const [teamList, setTeamList] = useState([]);

  const handleClick = (event, empId) => {
    setChoosedUser(empId);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSearchClick = () => {
    setSearchText(searchInput);
    setPageNum(0);
    setSearchParam(searchParamSelect);
  };

  const onAddClick = async (team_id) => {
    // console.log(choosedUser);
    const response = await sendPostRequest(`/app/employee`, {
      team_id: team_id,
      employee_id: choosedUser,
    });
    if (response.error) alert("user already in team");
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `/app/employee?order_by=${orderBy}&page_num=${pageNum}&limit=${limit}&search_param=${searchParam}&search_text=${searchText}`
      );
      setEmployeeList(response.rows);
      setPageCount(Math.ceil(response.count / limit));

      const id = localStorage.getItem("logged");
      const TeamResponse = await sendGetRequest(
        `/app/profile/employee/teams/${id}`
      );
      setTeamList(TeamResponse);
    })();
  }, [orderBy, pageNum, limit, searchParam, searchText]);

  return (
    <>
      <Header />
      <ColumnWrapper>
        <SelectBlock>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <MenuItem value={"first_name"}>first name</MenuItem>
              <MenuItem value={"midle_name"}>midle name</MenuItem>
              <MenuItem value={"second_name"}>second name</MenuItem>
              <MenuItem value={"post"}>post</MenuItem>
            </Select>
          </FormControl>
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
        </SelectBlock>
        <SelectBlock>
          <TextField
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            label="Search field"
            variant="standard"
          ></TextField>
          <Button onClick={(e) => onSearchClick()} variant="contained">
            search
          </Button>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel>Search param</InputLabel>
            <Select
              value={searchParam}
              onChange={(e) => setSearchParamSelect(e.target.value)}
            >
              <MenuItem value={"first_name"}>first name</MenuItem>
              <MenuItem value={"midle_name"}>midle name</MenuItem>
              <MenuItem value={"second_name"}>second name</MenuItem>
              <MenuItem value={"post"}>post</MenuItem>
              <MenuItem value={"experience"}>experience</MenuItem>
            </Select>
          </FormControl>
        </SelectBlock>

        {employeeList
          ? employeeList.map((empl) => (
              <SpecBlock key={empl.employee_id}>
                <FioText>
                  {empl.first_name} {empl.midle_name} {empl.second_name}
                </FioText>
                <ExpText>
                  {empl.post} for {empl.experience}
                </ExpText>
                <Button
                  aria-describedby={id}
                  onClick={(e) => handleClick(e, empl.employee_id)}
                  variant="contained"
                >
                  Add to team
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                >
                  <PopOverContent>
                    {teamList.map((team) => (
                      <TeamRow key={team.team_id}>
                        <TeamText>{team.specialization}</TeamText>
                        <IconButton
                          onClick={(e) =>
                            onAddClick(team.team_id, empl.employee_id)
                          }
                        >
                          <ControlPointIcon />
                        </IconButton>
                      </TeamRow>
                    ))}
                  </PopOverContent>
                </Popover>
              </SpecBlock>
            ))
          : null}
      </ColumnWrapper>
    </>
  );
}
