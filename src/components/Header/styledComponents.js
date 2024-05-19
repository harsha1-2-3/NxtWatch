import styled from 'styled-components'

export const BgHeader = styled.div`
    background-color: ${props => (props.isDark ? '#231f20' : 'white')};
    /* ( if we in lightTheme: white, darkTheme: #231f20*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    min-height: 8vh;
    
    `
