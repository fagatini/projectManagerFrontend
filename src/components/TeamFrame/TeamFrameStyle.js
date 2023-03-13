import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../style";

export const TeamFrameBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 10px 30px 10px 30px;
    margin-bottom: 30px;
    width:600px;
    justify-content:space-between;
    box-sizing: border-box;
`

export const SpecText = styled.p`
    width:150px;
`

export const TeamWrapper = styled(ColumnWrapper)`
    margin-top:40px;
`

export const ButtonBlock = styled.div`
    align-items:flex-start;
    width:600px;
`
