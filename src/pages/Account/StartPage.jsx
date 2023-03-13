import { useNavigate } from "react-router-dom";
import { ColumnCenterWrapper } from "../../style";
import TaskIcon from "@mui/icons-material/Task";
import { LinkStyled } from "./AccountPagesStyle";

export function StartPage() {
  const navigate = useNavigate();

  const onLogInClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <ColumnCenterWrapper>
      <h1>
        <TaskIcon />
        Tasker
      </h1>
      <h3>Project managment and realization as customer</h3>
      <h3>Doing task and finding teammates as employee</h3>
      <h3>
        All you need it's just{" "}
        <LinkStyled onClick={(e) => onRegisterClick(e)}>register</LinkStyled> on
        Tasker web-site
      </h3>
      <h3>
        If you already have an account you can{" "}
        <LinkStyled onClick={(e) => onLogInClick(e)}>log in</LinkStyled> it
      </h3>
    </ColumnCenterWrapper>
  );
}
