import { useEffect, useState } from "react";
import { sendGetRequest } from "../../axios/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import projectDataStore from "../../store/projectDataStore";

import {
  ColumnLeftWrapper,
  ColumnWrapper,
  DownButtonBlock,
  TitlesBlock,
} from "../../style";
import {
  ModalContentBlock,
  ProjectBlock,
  ProjectExpandedBlock,
  TextBlock,
  TextBlock2,
} from "../Customer/CustomerPagesStyle";
import { ModalStyle } from "./AdminPagesStyle";

export function AdminOneProjectPage() {
  const [taskList, setTaskList] = useState([]);
  const [projectInfo, setProjectInfo] = useState({
    projectId: "",
    customerId: "",
    title: "",
    description: "",
    priority: "",
  });

  const [description, setDescription] = useState([]);
  const [period, setPeriod] = useState([]);
  const [startDate, setStartDate] = useState([]);

  const [open, setOpen] = useState(false);
  const param = useParams();
  let navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const responseTasks = await sendGetRequest(
        `app/project/task/${param.id}`
      );
      const responseProject = await sendGetRequest(`app/project/${param.id}`);
      setProjectInfo({
        projectId: responseProject.project_id,
        customerId: responseProject.customer_id,
        title: responseProject.title,
        description: responseProject.description,
        priority: responseProject.priority,
      });
      setTaskList(responseTasks);
    })();
  }, [param.id]);

  const onChooseTeamClick = async () => {
    const date = new Date(startDate);
    const nowDate = new Date();
    if (
      description.length >= 10 &&
      period.length !== 0 &&
      startDate.length === 10 &&
      date > nowDate
    ) {
      projectDataStore.saveData(
        projectInfo.projectId,
        description,
        period,
        startDate
      );
      navigate("/admin/teams");
    } else {
      const message = `description = ${description.length} must be > 10 and start date = ${startDate.length} must be = 10 symbols or start date passed`;
      alert(message);
    }
  };

  return (
    <>
      <Header />
      <ColumnWrapper>
        <ProjectExpandedBlock>
          <TitlesBlock>
            <p>
              <strong>Title</strong>
            </p>
            <p>
              <strong>Description</strong>
            </p>
          </TitlesBlock>
          <ColumnLeftWrapper>
            <p>{projectInfo.title}</p>
            <p>{projectInfo.description}</p>
          </ColumnLeftWrapper>
        </ProjectExpandedBlock>
        {taskList.map((task) => (
          <ProjectBlock key={task.task_id}>
            <TextBlock>{task.description}</TextBlock>
            <TextBlock>{task.state}</TextBlock>
            <TextBlock2>
              {task.period} from {task.start_date.slice(0, 10)}
            </TextBlock2>
          </ProjectBlock>
        ))}
        <DownButtonBlock>
          <Button onClick={handleOpen} variant="contained">
            Create task
          </Button>
        </DownButtonBlock>
      </ColumnWrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalStyle>
          <ModalContentBlock>
            <TextField
              label="Period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              sx={{ width: "250px" }}
            />
            <TextField
              label="Start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ width: "250px" }}
            />
            <TextField
              label="Description"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              sx={{ width: "250px" }}
            />
            <Button variant="contained" onClick={(e) => onChooseTeamClick()}>
              select team
            </Button>
          </ModalContentBlock>
        </ModalStyle>
      </Modal>
    </>
  );
}
