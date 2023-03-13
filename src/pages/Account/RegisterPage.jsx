import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { sendPostRequest } from "../../axios/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ColumnCenterWrapper,
  ColumnLeftWrapper,
  ColumnWrapper,
} from "../../style";
import {
  ButtonWrapper,
  RegisterBlock,
  RegisterBlock2,
} from "./AccountPagesStyle";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  const [midleName, setMidleName] = useState("");
  const [post, setPost] = useState("");
  const [experience, setExperience] = useState("");

  let navigate = useNavigate();

  const onSaveClick = async () => {
    if (true || "all okey") {
      let response;
      if (accountType === "employee") {
        response = await sendPostRequest(`/app/employee_reg`, {
          login: login,
          email: email,
          password: password,
          first_name: firstName,
          midle_name: midleName,
          second_name: secondName,
          post: post,
          experience: experience,
        });
      } else if (accountType === "customer") {
        response = await sendPostRequest(`/app/customer_reg`, {
          login: login,
          email: email,
          password: password,
          first_name: firstName,
          second_name: secondName,
        });
      }
      if (response.error) {
        if (response.error === "Email is already used") {
          alert("email is already used");
        }
      } else if (response.message) {
        if (response.message === "new user created") {
          localStorage.setItem("logged", response.id);
          localStorage.setItem("accountType", response.accountType);
          switch (response.account_role) {
            case "customer":
              navigate(`/profile/customer:${response.id}`);
              break;
            case "employee":
              navigate(`/profile/employee:${response.id}`);
              break;
          }
        }
      } else {
        alert("smth went wrong");
      }
    }
  };

  return (
    <ColumnCenterWrapper>
      <RegisterBlock>
        <ColumnLeftWrapper>
          <TextField
            label="login"
            variant="standard"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            label="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ColumnLeftWrapper>
        <ColumnLeftWrapper>
          <TextField
            label="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="confirm password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </ColumnLeftWrapper>
      </RegisterBlock>

      <RegisterBlock>
        <ColumnLeftWrapper>
          <FormControl sx={{ width: "222px" }}>
            <InputLabel>Account type</InputLabel>
            <Select
              value={accountType}
              label="Account type"
              variant="standard"
              onChange={(e) => setAccountType(e.target.value)}
            >
              <MenuItem value={"employee"}>Employee</MenuItem>
              <MenuItem value={"customer"}>Customer</MenuItem>
            </Select>
          </FormControl>

          {accountType === "employee" ? (
            <RegisterBlock2>
              <ColumnWrapper>
                <TextField
                  label="First name"
                  variant="standard"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  variant="standard"
                  label="Midle name"
                  value={midleName}
                  onChange={(e) => setMidleName(e.target.value)}
                />
                <TextField
                  label="Second name"
                  variant="standard"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </ColumnWrapper>
              <ColumnWrapper>
                <TextField
                  label="Post"
                  variant="standard"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
                <TextField
                  label="Experience"
                  variant="standard"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <ButtonWrapper>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      onSaveClick();
                    }}
                  >
                    save
                  </Button>
                </ButtonWrapper>
              </ColumnWrapper>
            </RegisterBlock2>
          ) : null}

          {accountType === "customer" ? (
            <RegisterBlock2>
              <TextField
                label="First name"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Second name"
                variant="standard"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={(e) => {
                  onSaveClick();
                }}
              >
                save
              </Button>
            </RegisterBlock2>
          ) : null}
        </ColumnLeftWrapper>
      </RegisterBlock>
    </ColumnCenterWrapper>
  );
}
