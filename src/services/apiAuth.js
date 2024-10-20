import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error('Signup error', { cause: error });
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error('Login error', { cause: error });
  return data;
}

export async function getCurrentUser() {
  // Check active session in local storage
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error('Login error', { cause: sessionError });
  if (!session.session) return null;

  // For added security, refetch the user from server
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error('Login error', { cause: userError });
  return user?.user;
}

export async function logout() {
  const { error: logoutError } = await supabase.auth.signOut();
  if (logoutError) throw new Error('Logout error', { cause: logoutError });
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update user name or password
  let dataToUpdate;
  if (password) dataToUpdate = { password };
  if (fullName) dataToUpdate = { data: { fullName } };

  const { data, error: updateError } = await supabase.auth.updateUser(
    dataToUpdate
  );
  if (updateError) throw new Error('Update user error', { cause: updateError });

  if (!avatar) return data; // if no image uploaded, return data

  // Upload user avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()
    .toString()
    .slice(11)}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError)
    throw new Error('Update user error', { cause: storageError });

  // Update avatar image url
  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${
          import.meta.env.VITE_SUPABASE_STORAGE_URL
        }/avatars/${fileName}`,
      },
    });

  if (updateAvatarError)
    throw new Error('Update user error', { cause: updateAvatarError });

  return updatedUser;
}
