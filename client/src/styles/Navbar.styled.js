import styled from 'styled-components'


export const StyledNavBar = styled.div`
  width: 100%;
  background-color: rgb(35, 35, 47);
  position: sticky;
  top: 0rem;
  margin-bottom: 1rem;
  z-index: 500;
  
  nav.main{
    display: flex;
    align-items: center;
  
    a:hover{
      opacity: .6;
    }
  
    .App-logo{
      padding: .1rem;
      width: 50px;
  
      &:hover{
        opacity: .6;
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
        background-color: var(--color-highlight);
        a{
          color: var(--color-alt);
        }
      }
    }
  }

  nav.sub{
    background-color: #1a1a22;
    box-shadow: #0000008a 3px 3px 5px;

    width: 100%;
    // margin-bottom: .5rem;

    // position: fixed;
    top: 3.4rem;

    a{
      color: white;
    }

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

    .btnSearch{
      padding: .3rem;
    }

    .userCred{
      background-color: var(--color-highlight);
      border-radius: 40px;
      
      padding: 0 .7rem;
      margin-left: 1rem;
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
  }
`