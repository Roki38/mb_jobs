import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { axios, fetchJobs } from './Jobs';
const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchJobs Action Creater', () => {
	const id = 123;
	const year = 2020;
	const month = 8;

	test('APIのCallに成功', () => {
		const response = {data: 'mock'};
		const expected = [
			{
				type: 'START_REQUEST',
				payload: {id, year, month},
			},
			{
				type: 'RECEIVE_DATA',
				payload : {id, year, month, error: null, response}
			}
		];
	
		mockAxios.onGet('/demo/jobs/' + id + '/' + year + '/' + month).reply(200, response);
		const store = mockStore();
		return store.dispatch(fetchJobs(id, year, month))
			.then(() => {
				expect(store.getActions()).toEqual(expected);
			});
	});

	test('APIのCallに失敗', () => {
		const expected = [
			{
				type: 'START_REQUEST',
				payload: {id, year, month},
			},
			{
				type: 'RECEIVE_DATA',
				payload : {id, year, month, error: true, response: null}
			}
		];
	
		mockAxios.onGet('/demo/jobs/' + id + '/' + year + '/' + month).reply(400, {});
		const store = mockStore();
		return store.dispatch(fetchJobs(id, year, month))
			.then(() => {
				expect(store.getActions()).toEqual(expected);
			});
	});
});