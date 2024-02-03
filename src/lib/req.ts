import ky from 'ky';
import { z } from 'zod';

const ErrorSchema = z.object({
  message: z.string(),
});

const fetcher = ky
  .create({
    prefixUrl: import.meta.env.VITE_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .extend({
    hooks: {
      beforeError: [
        async (err) => {
          const error = ErrorSchema.parse(await err.response.json());
          const errorMessage = error?.message ?? 'An error occurred, please try again.';

          return Promise.reject(errorMessage);
        },
      ],
    },
  });

export { fetcher };
