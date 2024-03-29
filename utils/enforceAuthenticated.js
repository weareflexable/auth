import supabase from "./supabaseClient";

const enforceAuthenticated = (inner) => {
  return async (context) => {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
      return { props: {}, redirect: { destination: "/sign-in" } };
    }

    if (inner) {
      return inner(context);
    }

    return { props: {} };
  };
};
