import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Name must be greater than 1 characters!' }),
    writer: z
      .string()
      .min(4, { message: 'Writer name must be greater than 4 characters!' }),
    cover_image: z
      .string()
      .min(4, { message: 'Cover image must be greater than 4 characters!' }),
    price: z
      .number()
      .min(1, { message: 'Price must be greater than 4 characters!' }),
    tags: z
      .array(z.string())
      .min(1, { message: 'Tags must have at least 1 element!' }),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      title: z
        .string()
        .min(1, { message: 'Name must be greater than 1 characters!' }),
      writer: z
        .string()
        .min(4, { message: 'Writer name must be greater than 4 characters!' }),
      cover_image: z
        .string()
        .min(4, { message: 'Cover image must be greater than 4 characters!' }),
      price: z
        .number()
        .min(1, { message: 'Price must be greater than 4 characters!' }),
      tags: z
        .array(z.string())
        .min(1, { message: 'Tags must have at least 1 element!' }),
    })
    .partial(),
});
