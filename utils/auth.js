import { removePlatformPaseto, setPlatformPaseto } from "../src/storage";
import envUtils from "./envVars";
import supabase from "./supabaseClient";

// todo: signIn
export const signIn = async ({ email, password }) => {
  const { error, session, user } = await supabase.auth.signIn({
    email,
    password,
  });
  return { error, session, user };
};

// todo: sign out
export const signOut = async () => {
  removePlatformPaseto();
  const { error } = await supabase.auth.signOut();
  return { error };
};

// todo: single function to dynamically login using any provider
export const signInWithProvider = async (provider) => {

    const { session, error } = await supabase.auth.signIn(
      {
        provider,
      },
      // only redirects to a page in thesame domain
      { redirectTo: `${envUtils.NEXT_PUBLIC_ORIGIN}/dashboard` } // no way to pass the paceto using this option
      );
      return { session, error };

};

// todo: sign up
export const signUp = async ({ email, password }) => {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email,  
      password,
    },
    { redirectTo: `${envUtils.NEXT_PUBLIC_ORIGIN}/dashboard` }
  );
  return { user, session, error };
};

// todo: create Recovery for the forgotten password
export const createRecovery = async (email) => {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: `${envUtils.NEXT_PUBLIC_ORIGIN}/update-password`,
  });
  return { data, error };
};

// todo: update password
export const updatePassword = async (password) => {
  // updating new password
  const access_token = supabase.auth.session().access_token;
  const { error, data } = await supabase.auth.api.updateUser(access_token, {
    password,
  });
  return { data, error };
};

// todo: check auth/user
export const checkUser = () => {
  const user = supabase.auth.user();
  return user;
};
