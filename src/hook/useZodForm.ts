import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormProps } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { TypeOf, ZodSchema } from 'zod';

type UseZodFormProps<Z extends ZodSchema> = Exclude<
  UseFormProps<TypeOf<Z>>,
  'resolver'
> & {
  schema: Z;
};

export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });
