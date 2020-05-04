import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies'
import './HistoryPage.scss'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    maxWidth: 1200,
  },
});

function HistoryPageFunction() {

  const classes = useStyles();

  let allCookies = cookie.loadAll();
  let keys = Object.keys(allCookies);
  
  return (
    <div className="history">
      <div className="history-block">
        {keys.length ?
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>History Calculation</TableCell>
                  <TableCell align="center">Дата вылета</TableCell>
                  <TableCell align="center">Время вылета</TableCell>
                  <TableCell align="center">Страна прибытия</TableCell>
                  <TableCell align="center">Дата прибытия</TableCell>
                  <TableCell align="center">Время прибытия</TableCell>
                  <TableCell align="center">До вылета осталось</TableCell>
                  <TableCell align="center">Продолжительность полёта</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keys.map((el) => {
                  let row = JSON.parse(allCookies[el]);
                  if (!row.departDateTime) {
                    return
                  }
                  let departDateTime = new Date(row.departDateTime)
                  let arrivalDateTime = new Date(row.arrivalDateTime)
                  return (
                    <TableRow key={el}>
                      <TableCell component="th" scope="row">
                        {el}
                      </TableCell>
                      <TableCell align="center">{`${departDateTime.getDate()}.${departDateTime.getMonth()}.${departDateTime.getFullYear()}`}</TableCell>
                      <TableCell align="center">{`${departDateTime.getHours()}:${departDateTime.getMinutes() === 0 ? "00" : departDateTime.getMinutes()}`}</TableCell>
                      <TableCell align="center">{row.countryName}</TableCell>
                      <TableCell align="center">{`${arrivalDateTime.getDate()}.${arrivalDateTime.getMonth()}.${arrivalDateTime.getFullYear()}`}</TableCell>
                      <TableCell align="center">{`${arrivalDateTime.getHours()}:${arrivalDateTime.getMinutes() === 0 ? "00" : arrivalDateTime.getMinutes()}`}</TableCell>
                      <TableCell align="center" style={{ whiteSpace: 'nowrap' }}>{`${row.beforeDeparture.hours} часов ${row.beforeDeparture.minutes} минут`}</TableCell>
                      <TableCell align="center" style={{ whiteSpace: 'nowrap' }}>{`${row.flightWillBe.hours} часов ${row.flightWillBe.minutes} минут`}</TableCell>
                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <span>Список пуст</span>
        }

      </div>
    </div >
  );
}

const HistoryPage = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(HistoryPageFunction);

export default HistoryPage;
