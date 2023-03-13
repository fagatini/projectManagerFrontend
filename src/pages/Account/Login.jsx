import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPostRequest } from "../../axios/hooks";
import { ColumnCenterWrapper } from "../../style";
import { LoginBlock, LoginTextField } from "./AccountPagesStyle";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassCorrect, setIsPassCorrect] = useState(true);
  const [isEmailExist, setIsEmailExist] = useState(true);

  const PassFieldElem = useRef(null);
  const EmailFieldElem = useRef(null);

  let navigate = useNavigate();

  const onLoginClick = async () => {
    if (email !== "" && password !== "") {
      const response = await sendPostRequest(`/app/login`, {
        email: email,
        password: password,
      });
      if (response.error) {
        if (response.error === "User is not exist") {
          setIsEmailExist(false);
        } else if (response.error === "Incorrect password") {
          setIsPassCorrect(false);
        }
      } else if (response.message === "User signed in") {
        localStorage.setItem("logged", response.id);
        localStorage.setItem("accountType", response.account_role);
        navigate(`/${response.account_role}/profile/${response.id}`);
      }
    }
  };

  const onTextFiledChange = (func, e) => {
    func(e.target.value);
    setIsEmailExist(true);
    setIsPassCorrect(true);
  };

  return (
    <ColumnCenterWrapper>
      <LoginBlock>
        <LoginTextField
          label="Email"
          error={!isEmailExist}
          ref={EmailFieldElem}
          value={email}
          variant="standard"
          onChange={(e) => onTextFiledChange(setEmail, e)}
        />
        <LoginTextField
          label="Password"
          type="password"
          error={!isPassCorrect}
          ref={PassFieldElem}
          variant="standard"
          value={password}
          onChange={(e) => onTextFiledChange(setPassword, e)}
        />
        <Button variant="contained" onClick={(e) => onLoginClick()}>
          log in
        </Button>
      </LoginBlock>
    </ColumnCenterWrapper>
  );
}
