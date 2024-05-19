import styled from 'styled-components'

export const BgLogin = styled.div`
    background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
    /* ( if we in lightTheme: #f9f9f9, darkTheme:#0f0f0f*/
    background-size: cover;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    `
