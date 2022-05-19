// rafc snippit
import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useTable, useSortBy } from 'react-table'
import { Link } from 'react-router-dom'
import { FaSortAmountUp,  FaSortAmountDownAlt} from 'react-icons/fa'
import { GrRefresh } from 'react-icons/gr'

// import mock_data from './mock_data.json'
import { format } from 'date-fns'
import { StyledGigTable } from '../styles/GigTable.styled'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { faHelicopter } from '@fortawesome/free-solid-svg-icons';


export const UserTable = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();


  const [users, setUsers] = useState([]);

  let isMounted = true;


  const getUsers = async () => {
    try {
      console.log('--- Users - getUsers.js');
      const response = await axiosPrivate.get('/users', {
        signal: controller.signal
      });

      const newArr = destructArray(response.data)
      setUsers(newArr);

    } catch (err) {
      console.log('---getUsers failed');
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  const destructArray = (array) => {
    // TODO destruct array.push prettied objects back to array
    let prettyArr = []
    
    array.map(user => {
      let prettyUser = {
        username: user.username,
        roles: whatRole(user),
        _id: user._id
      }
      prettyArr.push(prettyUser)
    })

    return prettyArr
  }

  const whatRole = (obj) => {

    const {roles: { Admin, Editor, User }} = obj 
    if(Admin){
      return 'Admin';

    } else if(Editor){
      return 'Editor';

    } else if(User){
      return 'User';

    } else {
      return 'this user is a NOBODY';
    }  
  }


  useEffect(() => {
    // console.log('---users.js -- useEffect');


    getUsers()

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  //? TABLE #################################
  //? TABLE #################################
  //? TABLE #################################
  const usersColumns = [
    {
      Header: 'Username',
      Footer: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Role',
      Footer: 'Role',
      accessor: 'roles',
    },
    {
      Header: 'ID',
      Footer: 'ID',
      accessor: '_id'
    },
  ]

  const newColumns = useMemo(() => usersColumns, []) //* useMemo stops render on every refresh. performant
  // const newData    = useMemo( () => usersArray, [] ) //* idk skipping this for now

  const tableInstance = useTable({
    columns: newColumns,
    data: users

  }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance

  return (

    <>
      {/* <button onClick={() => getUsers}>Refresh User List</button> */}

      {/* {users.map((user, i) => {
        return(
          <ul key={i}>
            <li>{user.username}</li>
            <li>{user._id}</li>
            <li>{whatRole(user)}</li>
          </ul>
        )
      })} */}
      
      <StyledGigTable>
        <button onClick={getUsers}>refresh users <GrRefresh /></button>


        <div className="postTable">

          <table {...getTableProps()}>

            <thead>
              {headerGroups.map((headGrp, i) => (
                <tr {...headGrp.getHeaderGroupProps()} key={i}>
                  {headGrp.headers.map((column, i) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? <FaSortAmountUp />  : <FaSortAmountDownAlt />) : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map(cell => {

                      return (
                        <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                      )
                    })}

                    <td><Link to={`/users/${row.values._id}`}> account </Link> </td>
                  </tr>
                )
              })}
            </tbody>

            <tfoot>
              {footerGroups.map(footerGrp => (
                <tr {...footerGrp.getFooterGroupProps()}>
                  {footerGrp.headers.map((column, i) => (
                    <td {...column.getFooterProps} key={i}>
                      {column.render('Footer')}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>

          </table>

        </div>
      </StyledGigTable>
    </>
  )
}
