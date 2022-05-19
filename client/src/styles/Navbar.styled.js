import styled from 'styled-components'


export const StyledNavBar = styled.nav`
  background-color: rgb(35, 35, 47);
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;

  a:hover{
    opacity: .2;
  }

  .App-logo{
    padding: .1rem;
    width: 50px;

    &:hover{
      opacity: .2;
    }
  }
  
  ul{
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;

    li{
      // height: 100%;
      display: flex;
      justify-content: center;
      align-items:center;

      a{
        font-size: 1rem;
        text-align: center;
        padding: 1rem .8rem;
        display: inline-block;
        // height: 200px;

        color: white;
      }
    }
    li:hover{
      background-color: rgb(62, 78, 112);
      a{
        color: rgb(156, 165, 183);
      }
    }
  }
`