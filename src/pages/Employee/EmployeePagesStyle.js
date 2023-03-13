import styled from "styled-components";
import { ColumnLeftWrapper, ColumnWrapper, RowWrapper } from "../../style";

export const EmployeeBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 10px 30px 10px 30px;
    margin-bottom: 30px;
    width:600px;
    justify-content:space-between;
    box-sizing: border-box;
`

export const SpecText = styled.p`
    width:250px;
`

export const FioText = styled.p`
    width:200px;
`

export const ExpText = styled.p`
    width:200px;
    text-align:left;
`

export const ButtonBlock = styled(RowWrapper)`
    width:600px;
    padding:20px 0 20px 0;
    justify-content:space-between;
`

export const SelectBlock = styled(RowWrapper)`
    width:600px;
    padding: 0 0 10px 0;
    justify-content:space-between;
`

export const LeftBlock = styled(RowWrapper)`
    width:600px;
    padding:20px 0 10px 0;
    align-items:flex-start;
`

export const SpecBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 0 30px 0 30px;
    margin-top: 30px;
    width:600px;
    justify-content:space-between;
    box-sizing: border-box;
    min-height:70px;
`

export const TaskBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 10px 30px 10px 30px;
    margin-bottom: 20px;
    width:600px;
    justify-content:space-between;
    box-sizing: border-box;

    position: relative;
`

export const ContentWrapper = styled(ColumnLeftWrapper)`
    width:380px;
`

export const PopOverContent = styled(ColumnWrapper)`
    width:170px;
    /* height:100px; */
    overflow-y:50px;
    padding:10px 20px 10px 20px;
    box-sizing: border-box;
`

export const TeamText = styled.div`
    padding-bottom:5px;
`

export const TeamRow = styled(RowWrapper)`
    width:100%;
    justify-content: space-between;
`

export const RightTopButton = styled.div`
    position:absolute;
    top:20px;
    right:20px;
`