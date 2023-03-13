import styled from "styled-components";

export const ColumnWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const RowWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

export const ColumnCenterWrapper = styled(ColumnWrapper)`
    justify-content:center;
    height:100vh;
`

export const ColumnCenterWrapperHeader = styled(ColumnWrapper)`
    justify-content:center;
    height:calc(100vh - 68px);
`

export const ColumnLeftWrapper = styled(ColumnWrapper)`
    justify-content:center;
    align-items:flex-start;
    /* height:100vh; */
`

export const ContentBlock = styled(ColumnLeftWrapper)`
    justify-content:space-between;
`


export const ProfileBlock = styled(RowWrapper)`
    border: 1px solid;
    border-radius:10px;
    padding: 15px 15px 15px 25px;
    margin-bottom:30px;
    width:600px;
    box-sizing: border-box;
`

export const TitlesBlock = styled(ColumnLeftWrapper)`
    width: 200px;
    height: 100%;
`

export const DownButtonBlock = styled.div`
    margin-bottom:80px;
    align-items:flex-start;
    width:600px;
`