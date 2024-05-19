import styled from 'styled-components'

export const BgHome = styled.div`
    background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
    /* ( if we in lightTheme: #f9f9f9, darkTheme:#181818*/
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    min-width: 120vw;
    
    `
export const BgVideosBannerCont = styled.div`
    background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    min-width: 90vw;
    `
