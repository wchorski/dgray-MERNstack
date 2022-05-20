import styled from 'styled-components'


export const StyledPost = styled.div`
  background-color: #131d27;
  padding: 1rem;
  margin: .1rem;
  border-radius: .3rem;
  min-height: 30rem;
  position: relative;

  .title{
    color: white;
    border: none;
    text-decoration: underline; 
    background-color: transparent;
  }

  .author{
    color: grey;
    border: none;
    background-color: transparent;
  }

  .content{
    color: white;
    background-color: transparent;
    border: none;
    border-top: solid #162737 2px;
    max-width: 800px

    margin-top: 1rem;
    padding-top: 1rem;
    
  }

  .editBtns{
    // outline: solid yellow 3px;
    display: flex;
    justify-content: flex-end;

    position: block;
    right: 0;
    bottom: 0;
    margin-top: .1rem;
    
    button{
      cursor: pointer;
      margin-right: 1rem;
      transition: .2s;
      
      &:hover{
        color: yellow;
        background-color: blue;
      }

    }
    .deleteBtn{
      color: red;
      background-color: white;

      &:hover{
        color: white;
        background-color: red;
      }
    }
  }
`