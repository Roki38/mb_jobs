const axiosBase = require('axios');
export const axios = axiosBase.create({
    baseURL: 'http://localhost:8099',
    headers: {
      'Content-Type': 'application/json'
    }
});

// リクエスト開始
const startRequest = (id,year,month) => ({
    type: 'START_REQUEST',
    payload: {id, year, month},
});

// レスポンス受信
const receiveData = (id,year,month,error,response) => ({
    type: 'RECEIVE_DATA',
    payload :{id,year,month,error,response,}
});

// 一覧取得
export const fetchJobs = (id, year, month) => {
    return dispatch => {
        dispatch(startRequest(id,year,month));
        return axios.get('/demo/jobs/' + id + '/' + year + '/' + month)
            .then(response => {
                dispatch(receiveData(id,year,month,null,response.data));
            })
            .catch(() => {
                dispatch(receiveData(id,year,month,true,null));
            });
    };
};