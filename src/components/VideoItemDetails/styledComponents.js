import styled from 'styled-components'

export const BgVideoItem = styled.div`
    padding: 10px;
    padding-top: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    min-width: 80vw;
    background-color: ${props => (props.isDark ? '0f0f0f' : 'f9f9f9')};
    /* ( if we in lightTheme: #f9f9f9, darkTheme:#0f0f0f*/
    
    `
