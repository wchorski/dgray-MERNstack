import styled from 'styled-components'


export const StyledNavSub = styled.nav`

  background-color: #1a1a22;
  box-shadow: #0000008a 3px 3px 5px;

  width: 100%;
  margin-bottom: .5rem;

  position: fixed;
  top: 3.4rem;

  button{
    margin: 0;
    padding: 0;
  }

  ul{
    list-style-type: none;
    display: flex;
    justify-content: flex-end;
    padding: 0;
    margin: 0;
  }

  .userCred{
    background-color: grey;
    border-radius: 40px;
    
    padding: 0 .7rem;
    display: flex;
    align-items: center;
    


    // svg{
    //   font-size: 40px;
    //   margin-right: 1rem;
    // }

    span{
      font-size: 15px
      color: grey;
      margin-right: 1rem;
    }
  }
`