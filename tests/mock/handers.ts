import { HttpResponse, http } from 'msw';
export const user = {
  name: 'Luc',
  email: 'luc.schenherr@gmail.com',
  image: 'https://image.com',
  id: '1234',
};

export const restHandlers = [
  http.get('/user', () => {
    return HttpResponse.json(user);
  }),
];
