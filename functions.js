import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

export function getParsedDate(dateString) {
    var date = new Date(dateString)
    var dd = date.getDate()
    var mm = date.getMonth() + 1
    var yyyy = date.getFullYear()
    if (dd < 10) {
      dd = '0'+ dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    date = dd + "-" + mm + "-" + yyyy
    return date.toString()
}

export function waitForLongPress(delay) {
    return new Promise( res => setTimeout(res, delay))
}

export function isToday(date) {
    let today = new Date()
    return moment(date).isSame(today, 'day')
}

export function isOverdue(date) {
    let today = new Date()
    if (moment(date).isBefore(today)) {
        if (moment(date).isSame(today, 'day')) {
            return false
        } else {
            return true
        }
    }
    return false
}

export function getDateToString(date) {
    moment.locale('en')
    return moment(date).format("dddd MMM Do, YYYY")
}

export function isWithinDays(date, days) {
    let today = new Date(Date.now() - 1*24*60*60*1000)
    var dateAhead = new Date()
    dateAhead.setDate(dateAhead.getDate() + (days + 1))
    console.log("Date ahead: ", dateAhead)
    return moment(date).isBetween(today, dateAhead, 'day')

}

export function createSectionList(tasksList) {
    let returnList = []
    for (const taskList of tasksList) {
        
    }
}