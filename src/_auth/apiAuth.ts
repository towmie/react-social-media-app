import supabase, { supabaseURL } from "./../lib/supabase/config";

type signUpProps = {
  name: string;
  email: string;
  password: string;
};

type loginProps = { email: string; password: string };

type updateCurrentUserProps = {
  password?: string;
  name?: string;
  avatar?: string;
};

export async function signUp({ name, email, password }: signUpProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: loginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  full_name,
  avatar,
}: updateCurrentUserProps) {
  // 1 update password or Fullname
  let updateData;
  if (password) updateData = { password };
  if (full_name) updateData = { data: { full_name } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // 2. upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(error.message);

  // 3. update avatar in user

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseURL}/storage/v1/object/sign/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error.message);
  return updatedUser;
}
