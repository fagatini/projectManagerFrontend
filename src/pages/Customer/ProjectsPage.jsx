import { useEffect, useState } from "react";
import { sendGetRequest, sendPostRequest } from "../../axios/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";

import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {
  ButtonBlock,
  ButtonBlock2,
  ModalContentBlock,
  ModalStyle,
  ProjectBlock,
} from "./CustomerPagesStyle";
import { ColumnWrapper } from "../../style";
import { Button } from "@mui/material";

export function ProjectsPage() {
  const [projectList, setProjectList] = useState([]);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const param = useParams();
  let navigate = useNavigate();

  const onInfoClick = (id) => {
    navigate(`/customer/project/${id}`);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSaveClick = async () => {
    if (title.length >= 10 && description.length >= 20) {
      const accountId = param.id;
      const response = await sendPostRequest(`app/project`, {
        accountId,
        title,
        description,
      });

      setProjectList([...projectList, response]);
      handleClose();
    } else {
      const message = `things to short, description = ${description.length} must be > 20 and title = ${title.length} must be > 10`;
      alert(message);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `app/profile/customer/projects/${param.id}`
      );
      setProjectList(response);
    })();
  }, [param.id]);

  return (
    <>
      <Header />
      <ColumnWrapper>
        <ButtonBlock>
          <Button onClick={(e) => handleOpen()} variant="contained">
            create new
          </Button>
        </ButtonBlock>
        {projectList
          ? projectList.map((project) => (
              <ProjectBlock key={project.project_id}>
                <p>{project.title}</p>
                <Button
                  onClick={(e) => onInfoClick(project.project_id)}
                  variant="contained"
                >
                  info
                </Button>
              </ProjectBlock>
            ))
          : null}
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
                save project
              </Button>
            </ButtonBlock2>
          </ModalContentBlock>
        </ModalStyle>
      </Modal>
    </>
  );
}
