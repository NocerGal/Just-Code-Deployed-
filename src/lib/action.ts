import { createSafeActionClient } from 'next-safe-action';
import { getAuthSession } from './auth';

export const action = createSafeActionClient();

export class ServerError extends Error {}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const authenticatedAction = createSafeActionClient({
  handleReturnedServerError: (e) => {
    if (e instanceof ActionError) {
      return e.message;
    }

    return 'An unexpected error occurred.';
  },

  middleware: async () => {
    const session = await getAuthSession();

    const user = session?.user;
    const userId = user?.id;

    if (!userId) {
      throw new ServerError('You must be logged in to perform this action');
    }

    return {
      userId,
      user,
    };
  },
});
