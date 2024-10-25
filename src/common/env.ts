require('dotenv').config();

export const ENV = new Proxy(process.env, {
  get(target, prop) {
    if (target[prop.toString()]) {
      return target[prop.toString()];
    }
    throw new Error(`environment ${prop.toString()} wasn't provided`);
  },
});
