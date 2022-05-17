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


export const UserTable = () => {

  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  let isMounted = true;
  const controller = new AbortController();

  const getUsers = async () => {

    
    try {
      console.log('--- Users - getUsers.js');
      const response = await axiosPrivate.get('/users', {
        signal: controller.signal
      });
      console.log(response.data);

      isMounted && setUsers(response.data);

    } catch (err) {
      console.log('---getUsers failed');
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    console.log('---users.js -- useEffect');


    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


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
      Header: 'Password',
      Footer: 'Password',
      accessor: 'password'
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
    data: users //* this was using 'newData'

  }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance

  return (
    <>
      <h2>UserTable.jsx</h2>
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
                        {column.isSorted ? (column.isSortedDesc ? ' ↥' : ' ↧') : ''}
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
                    {/* <a href={`/api/v1/engagements/${row.values._id}`}>account</a>  */}
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
