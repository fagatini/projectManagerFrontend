import { useEffect, useState } from "react";
import { sendGetRequest, sendEditRequest } from "../../axios/hooks";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  ButtonBlock2,
  ModalContentBlock,
  ModalStyle,
  ProjectBlock,
  ProjectExpandedBlock,
  TextBlock,
  TextBlock2,
} from "./CustomerPagesStyle";
import { ColumnWrapper, ContentBlock, TitlesBlock } from "../../style";

export function OneProjectPage() {
  const [taskList, setTaskList] = useState([]);
  const [projectInfo, setProjectInfo] = useState({
    projectId: "",
    customerId: "",
    title: "",
    description: "",
    priority: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);
  const param = useParams();

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
      setTitle(responseProject.title);
      setDescription(responseProject.description);
    })();
  }, [param.id]);

  const onSaveClick = async () => {
    if (title.length >= 10 && description.length >= 20) {
      await sendEditRequest(`app/project/:${param.id}`, {
        id: param.id,
        title,
        description,
      });

      setProjectInfo({
        projectId: projectInfo.project_id,
        customerId: projectInfo.customer_id,
        title: title,
        description: description,
        priority: projectInfo.priority,
      });

      handleClose();
    } else {
      const message = `things to short, description = ${description.length} must be > 20 and title = ${title.length} must be > 10`;
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
            <Button onClick={handleOpen} variant="contained">
              edit
            </Button>
          </TitlesBlock>
          <ContentBlock>
            <p>{projectInfo.title}</p>
            <p>{projectInfo.description}</p>
            <p></p>
          </ContentBlock>
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
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={{ width: "250px" }}
            />
            <TextField
              label="Description"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              rows={4}
              sx={{ width: "350px" }}
            />
            <ButtonBlock2>
              <Button onClick={(e) => onSaveClick()} variant="contained">
                save changes
              </Button>
            </ButtonBlock2>
          </ModalContentBlock>
        </ModalStyle>
      </Modal>
    </>
  );
}
