import { useEffect, useState } from "react";
import { sendGetRequest } from "../../axios/hooks";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import {
  ProfileBlock,
  ColumnLeftWrapper,
  TitlesBlock,
  ColumnCenterWrapperHeader,
  DownButtonBlock,
} from "../../style";
import { Button } from "@mui/material";

export function EmpProfilePage() {
  const [accountData, setAccountData] = useState({
    login: "",
    email: "",
    password: "",
  });
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    midleName: "",
    secondName: "",
    post: "",
    experience: "",
  });
  const param = useParams();

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `/app/employee/profile/${param.id}`
      );
      setAccountData({
        login: response.accountData.login,
        email: response.accountData.email,
        password: response.accountData.password,
      });
      setEmployeeData({
        firstName: response.employeeData.first_name,
        midleName: response.employeeData.midle_name,
        secondName: response.employeeData.second_name,
        post: response.employeeData.post,
        experience: response.employeeData.experience,
      });
    })();
  }, [param.id]);

  return (
    <>
      <Header />
      <ColumnCenterWrapperHeader>
        <ProfileBlock>
          <TitlesBlock>
            <p>
              <strong>Login</strong>
            </p>
            <p>
              <strong>Email</strong>
            </p>
            <p>
              <strong>Password</strong>
            </p>
          </TitlesBlock>
          <ColumnLeftWrapper>
            <p>{accountData.login}</p>
            <p>{accountData.email}</p>
            <p>{accountData.password}</p>
          </ColumnLeftWrapper>
        </ProfileBlock>

        <ProfileBlock>
          <TitlesBlock>
            <p>
              <strong>First name</strong>
            </p>
            <p>
              <strong>Midle name</strong>
            </p>
            <p>
              <strong>Last name</strong>
            </p>
            <p>
              <strong>Post</strong>
            </p>
            <p>
              <strong>Experience</strong>
            </p>
          </TitlesBlock>
          <ColumnLeftWrapper>
            <p>{employeeData.firstName}</p>
            <p>{employeeData.midleName}</p>
            <p>{employeeData.secondName}</p>
            <p>{employeeData.post}</p>
            <p>{employeeData.experience}</p>
          </ColumnLeftWrapper>
        </ProfileBlock>
        <DownButtonBlock>
          <Button variant="contained">edit account</Button>
        </DownButtonBlock>
      </ColumnCenterWrapperHeader>
    </>
  );
}
