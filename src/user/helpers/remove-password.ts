import { User } from '../interfaces/user.interface';

export function removePassword(user: User) {
  const { password, ...data } = user.toObject();
  return data;
}
