import { runSaga } from "redux-saga";

export async function assertSaga(saga, expectedActions, args = null) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    saga,
    args
  ).toPromise();

  expect(dispatched).toEqual(expectedActions);
}
