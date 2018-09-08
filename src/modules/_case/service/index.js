import {SUCCESS_1000, ERROR_2000} from '../../../utils/status'

class caseService {
  static interfaceMergeCase ({dataPartOne, dataPartTwo}) {
    let status = dataPartOne.resultCode === '10000' && dataPartTwo.resultCode === '10000'
    let res = {}

    if (status) {
      res.basicInfo = dataPartOne.body.basicInfo
      res.productList = dataPartTwo.body.productList
    }
    switch (status) {
      case true:
        res = {
          code: SUCCESS_1000.code,
          result: SUCCESS_1000.result,
          msg: SUCCESS_1000.msg,
          body: {
            ...res
          }
        }
        break
      default:
        res = {
          code: ERROR_2000.code,
          result: ERROR_2000.result,
          msg: ERROR_2000.msg,
          body: {}
        }
    }
    return res
  }
  static postCase (data) {
    let status = data.resultCode === '10000'
    let res = {}

    switch (status) {
      case true:
        res = {
          code: SUCCESS_1000.code,
          result: SUCCESS_1000.result,
          msg: SUCCESS_1000.msg,
          body: data.body
        }
        break
      default:
        res = {
          code: ERROR_2000.code,
          result: ERROR_2000.result,
          msg: ERROR_2000.msg,
          body: {}
        }
    }
    return res
  }
}

export default caseService
