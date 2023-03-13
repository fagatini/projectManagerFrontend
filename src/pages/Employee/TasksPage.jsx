import { useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../axios/hooks";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import {
  ContentWrapper,
  LeftBlock,
  RightTopButton,
  TaskBlock,
} from "./EmployeePagesStyle";
import { ColumnWrapper, TitlesBlock } from "../../style";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export function TasksPage() {
  const [taskList, setTaskList] = useState([]);

  const [orderBy, setOrderBy] = useState("task_id");

  const [pageNum, setPageNum] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [limit, setLimit] = useState(4);

  const param = useParams();

  const onDoneClick = async (taskId) => {
    await sendPostRequest(`/app/employee/task/${taskId}`);
    setTaskList(taskList.filter((task) => task.task_id !== taskId));
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `/app/employee/tasks/${param.id}?order_by=${orderBy}&page_num=${pageNum}&limit=${limit}`
      );
      setTaskList(response.rows);
      setPageCount(Math.ceil(response.count / limit));
    })();
  }, [param.id, orderBy, pageNum, limit, taskList]);

  return (
    <>
      <Header />
      <ColumnWrapper>
        <LeftBlock>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <MenuItem value={"description"}>description</MenuItem>
              <MenuItem value={"task_id"} default>
                none
              </MenuItem>
              <MenuItem value={"start_date"}>start date</MenuItem>
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
        </LeftBlock>
        <div>
          {taskList
            ? taskList.map((task) => (
                <TaskBlock key={task.task_id}>
                  <TitlesBlock>
                    <p>
                      <strong>Description</strong>
                    </p>
                    <p>
                      <strong>Project</strong>
                    </p>
                    <p>
                      <strong>Deadlines</strong>
                    </p>
                  </TitlesBlock>
                  <ContentWrapper>
                    <p>{task.description}</p>
                    <p>{task.project_description}</p>
                    <p>
                      {task.period} from {task.start_date.slice(0, 10)}
                    </p>
                  </ContentWrapper>
                  <RightTopButton>
                    <Button
                      onClick={(e) => onDoneClick(task.task_id)}
                      variant="contained"
                    >
                      done
                    </Button>
                  </RightTopButton>
                </TaskBlock>
              ))
            : null}
        </div>
      </ColumnWrapper>
    </>
  );
}
