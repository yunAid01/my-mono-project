import { z } from "zod";

/** create user request zod schema */
export const CreateUserSchema = z.object({
  email: z.email({ message: "유효한 이메일을 입력해주세요" }),
  nickname: z.string().min(3, { message: "닉네임은 3글자 이상이어야 합니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 6글자 이상이어야 합니다." }),
});
export type CreateUserDtoType = z.infer<typeof CreateUserSchema>;

/** login user request zod schema */
export const LoginUserSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "비밀번호는 6글자 이상이어야 합니다." }),
});
export type LoginUserDtoType = z.infer<typeof LoginUserSchema>;

/** user response schema */
export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.email(),
  nickname: z.string().min(3),
  createdAt: z.iso.datetime(),
  bio: z.string().nullish(), // string | undefined | null
});
export type CreateUserResponseType = z.infer<typeof UserResponseSchema>;

/** login user response zoe schema */
export const LoginResponseSchema = z.object({
  access_token: z.string(),
  user: UserResponseSchema,
});
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
