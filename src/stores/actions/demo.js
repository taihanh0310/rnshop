import { FETCH_DATA } from '../../configs/constants';
import getPeople from './api'

export function fetchData() {
  return {
    type: FETCH_DATA,
    payload: getPeople()
  }
}