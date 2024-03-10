import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoggedInButton from '@/features/auth/LoggedInButton';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { afterEach } from 'node:test';

const queryClient = new QueryClient();

const handlers = [
  http.get('http://image/test', () => {
    return HttpResponse.json({
      name: 'Luc',
      email: 'luc.schenherr@gmail.com',
      image: 'https://image.com',
      id: '1234',
    });
  }),
];

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer(...handlers);

export const user = {
  name: 'Luc',
  email: 'luc.schenherr@gmail.com',
  image: 'https://avatars.githubusercontent.com/u/119907699?v=4',
  id: '1234',
};

describe('LoggedInButton', async () => {
  test('user button has an image', async () => {
    console.log('props', user);
    await waitFor(async () => {
      await render(
        <QueryClientProvider client={queryClient}>
          <LoggedInButton user={user} />
        </QueryClientProvider>
      );
      const userImage = screen.findByRole('img');

      console.log('image', await userImage);
      // expect(userImage).toHaveAttribute('src', user.image);
    });
  });
  // test('user button does have a first letter of his pseudo if there is no image', async () => {
  //   const firstLetterUserName = screen.getByText(user.name[0], {
  //     selector: 'span',
  //   }).textContent;
  //   expect(firstLetterUserName).toBe('L');
  // });
});
