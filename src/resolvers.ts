import * as bcrypt from "bcrypt";
// can also set the Login Arguments as a type instead of interface. type allows you to see what is defined. interface doesn't.
// Interface declarations can exclusively represent the shape of an object-like data structures. Type alias declarations can create a name for all kind of types including primitives ( undefined , null , boolean , string and number ), union, and intersection types. In a way, this difference makes the type more flexible.
// An interface can have multiple merged declarations, but a type alias for an object type literal cannot.
interface LoginArguments {
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    login: async (_: any, { email, password }: LoginArguments) => {
      console.log(email, password);
      // login process of searching an email, then findng the password. if the password matches what the client sent, authentication is sent
      const fakeEmailFromDb = "test@test.com";
      const fakePasswordFromDb = await bcrypt.hash("test", 10);

      if (email !== fakeEmailFromDb) {
        throw new Error(`User with email: ${email} does not exist!`);
      }

      const valid = await bcrypt.compare(password, fakePasswordFromDb);

      if (!valid) {
        // don't give specific errors to client. this is giving too much information
        throw new Error("Email and Password do not match!");
      }

      return {
        email: fakeEmailFromDb,
        accessToken: "fdsaffdsa",
      };
    },
  },
};
