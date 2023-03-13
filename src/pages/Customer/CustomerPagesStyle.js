import styled from "styled-components";
import { ColumnLeftWrapper, RowWrapper } from "../../style";

export const ProjectBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 10px 30px 10px 30px;
    margin-bottom: 30px;
    width:600px;
    justify-content:space-between;
    box-sizing: border-box;
`

export const ButtonBlock = styled.div`
    align-items:flex-start;
    width:600px;
    margin-top:40px;
    margin-bottom:30px;
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

export const ModalContentBlock = styled(ColumnLeftWrapper)`
    padding:20px;
    justify-content:space-between;
    height:300px;
`

export const ButtonBlock2 = styled.div`
    width:100%;
    align-items:center; 
`

export const TextBlock = styled.div`
    width:200px;
`

export const TextBlock2 = styled.div`
    width:300px;
`

// export const TextBlock3 = styled.div`
//     width:30px;
// `

export const ProjectExpandedBlock = styled(ProjectBlock)`
    margin-top:80px;
`
