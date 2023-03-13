import { useEffect, useState } from "react";
import { sendGetRequest } from "../../axios/hooks";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import {
  ColumnCenterWrapperHeader,
  ColumnLeftWrapper,
  DownButtonBlock,
  ProfileBlock,
  TitlesBlock,
} from "../../style";
import { Button } from "@mui/material";

export function AdminProfilePage() {
  const [accountData, setAccountData] = useState({
    login: "",
    email: "",
    password: "",
  });
  const param = useParams();

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(`/app/profile/admin/${param.id}`);
      setAccountData({
        login: response.login,
        email: response.email,
        password: response.password,
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
        <DownButtonBlock>
          <Button variant="contained">edit account</Button>
        </DownButtonBlock>
      </ColumnCenterWrapperHeader>
    </>
  );
}
