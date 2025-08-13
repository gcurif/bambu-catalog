// bcrypt.util.ts
import bcrypt from "bcryptjs";

export function hashPassword(password: string, rounds = 6): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) return reject(err);
      if (typeof salt === "undefined") return reject(new Error("Salt is undefined"));
      bcrypt.hash(password, salt, (err2, hash) => {
        if (err2) return reject(err2);
        if (typeof hash === "undefined") return reject(new Error("Hash is undefined"));
        resolve(hash);
      });
    });
  });
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, same) => {
      if (err) return reject(err);
      if (typeof same === "undefined") return reject(new Error("Comparison result is undefined"));
      resolve(same);
    });
  });
}
