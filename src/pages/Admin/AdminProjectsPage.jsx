import { useEffect, useState } from "react";
import { sendGetRequest } from "../../axios/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { ColumnWrapper } from "../../style";
import { SelectBlock, TeamBlock } from "./AdminPagesStyle";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export function AdminProjectsPage() {
  const [projectList, setProjectList] = useState([]);

  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [limit, setLimit] = useState(10);

  const [searchText, setSearchText] = useState("");

  const param = useParams();
  let navigate = useNavigate();

  const onInfoClick = (id) => {
    navigate(`/admin/project/${id}`);
  };

  const onSearchChange = (e) => {
    setPageNum(0);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `app/projects?page_num=${pageNum}&limit=${limit}&search_text=${searchText}`
      );
      setProjectList(response.rows);
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
        {projectList
          ? projectList.map((project) => (
              <TeamBlock key={project.project_id}>
                {project.title}
                <Button
                  onClick={(e) => onInfoClick(project.project_id)}
                  variant="contained"
                >
                  info
                </Button>
              </TeamBlock>
            ))
          : null}
      </ColumnWrapper>
    </>
  );
}
