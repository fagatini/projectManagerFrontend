import {TextField } from "@mui/material";
import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../style";

export const LinkStyled = styled.u`
    cursor:pointer
`

export const LoginBlock = styled(ColumnWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 15px 15px 15px 25px;
    width:450px;
    height:250px;
    box-sizing: border-box;
    justify-content:space-evenly;
`

export const LoginTextField = styled(TextField)`
    width:250px;
`

export const RegisterBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 20px 30px 30px 30px;
    margin-bottom: 80px;
    width:600px;
    justify-content:space-between;
    box-sizing: border-box;
`

export const RegisterBlock2 = styled(RowWrapper)`
    justify-content:space-evenly;
    width:540px;
    margin-top:10px;
    padding-top:10px;
    padding-bottom:20px;
    border: 1px solid;
    border-radius:10px;
`

export const ButtonWrapper = styled(ColumnWrapper)`
    height: 47px;
    justify-content:center;
`