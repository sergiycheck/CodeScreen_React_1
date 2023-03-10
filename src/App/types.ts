import z from "zod";

export const tweetShema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime({ offset: true }),
  text: z.string(),
  user: z.object({
    id: z.string().uuid(),
    userName: z.string(),
  }),
});

export const tweetsArrSchema = z.array(tweetShema);

export type Tweet = z.infer<typeof tweetShema>;
