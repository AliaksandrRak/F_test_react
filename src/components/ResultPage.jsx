import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies'

import './ResultPage.scss'

function getTime(minuend, subtrahend, gmtOffset) {

  let result = (minuend - subtrahend) / 3600000;

  if (gmtOffset) {
    result -= gmtOffset;
  }

  let hours = Math.floor(result);
  let minutes = Math.floor((result - hours) * 60);

  return { hours, minutes }
}

function saveResult(beforeDeparture, flightWillBe, props) {
  let cookiesName = new Date().toUTCString();
  let fligth = { ...props.storeState.fligth };
  fligth.beforeDeparture = beforeDeparture;
  fligth.flightWillBe = flightWillBe;

  cookie.save(cookiesName, fligth, { path: '/' });
  props.history.push('/history');
}

function ResultPageFunction(props) {

  const gmtOffset = props.match.params.gmtOffset;
  const today = new Date();
  const departData = new Date(+props.match.params.departData);
  const arrivalDate = new Date(+props.match.params.arrivalDate);
  const beforeDeparture = getTime(departData, today);
  const flightWillBe = getTime(arrivalDate, departData, gmtOffset);


  return (
    <div className="result">

      {props.match.params.departData || props.match.params.gmtOffset || props.match.params.arrivalDate ?
        <>
          <span className="result-text">{`До вылета осталось ${beforeDeparture.hours} часов ${beforeDeparture.minutes} минут`}</span>
          <span className="result-text">{`Ваш перелет составит ${+flightWillBe.hours} часов ${flightWillBe.minutes} минут`}</span>
          <span className="result-btn" onClick={() => saveResult(beforeDeparture, flightWillBe, props)}>Сохранить</span>
        </>
        :
        <>
          <span className="result-text"> Похоже вы не заполнили данные :(</span>
          <span className="result-btn" onClick={() => props.history.push('/')}>Ввести данные</span>
        </>
      }
    </div>
  );
}

const ResultPage = connect(
  (state) => ({
    storeState: state.AppReduser,
  }),
)(ResultPageFunction);

export default ResultPage;
