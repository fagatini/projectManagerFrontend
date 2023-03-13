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

export function CustProfilePage() {
  const [accountData, setAccountData] = useState({
    login: "",
    email: "",
    password: "",
  });
  const [customerData, setCustomerData] = useState({
    firstName: "",
    secondName: "",
  });
  const param = useParams();

  useEffect(() => {
    (async () => {
      const response = await sendGetRequest(
        `/app/profile/customer/${param.id}`
      );
      setAccountData({
        login: response.accountData.login,
        email: response.accountData.email,
        password: response.accountData.password,
      });
      setCustomerData({
        firstName: response.customerData.first_name,
        secondName: response.customerData.second_name,
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
              <strong>Last name</strong>
            </p>
          </TitlesBlock>
          <ColumnLeftWrapper>
            <p>{customerData.firstName}</p>
            <p>{customerData.secondName}</p>
          </ColumnLeftWrapper>
        </ProfileBlock>
        <DownButtonBlock>
          <Button variant="contained">edit account</Button>
        </DownButtonBlock>
      </ColumnCenterWrapperHeader>
    </>
  );
}
