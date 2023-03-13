import styled from "styled-components";
import { RowWrapper } from "../../style";

export const TeamBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 15px 15px 15px 25px;
    margin-bottom:20px;
    width:450px;
    box-sizing: border-box;
    justify-content:space-between;
`

export const SelectBlock = styled(RowWrapper)`
    width:450px;
    margin-top:20px;
    justify-content:space-between
`

export const ModalStyle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    /* border: 2px solid #000; */
    box-shadow: 24px;
    padding: 4px;
    display: flex;
    flex-direction: column;
`