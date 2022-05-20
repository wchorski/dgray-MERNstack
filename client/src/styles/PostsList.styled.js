import styled from 'styled-components'


export const StyledPostsList = styled.div`
  background-color: #130d271a;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  // align-content: flex-start;
  justify-content: flex-start;

  .excerpt{
    background-color: #131d27;
    box-shadow: black 2px 2px 6px;
    padding: 1rem;
    margin: .1rem;
    border-radius: .3rem;

    width: 10rem;
    height: 20rem;

    position: relative;


    h3{
      text-decoration: underline; 
    }

    .author{
      color: grey;
    }
    

    p{
      // background-color: green;
      margin-top: 1rem;
      
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      
    }

    .readmore{
      color: yellow;
      padding: 1rem;
      margin: .2rem;
      position: absolute;
      bottom: 0;
    }
  }
`