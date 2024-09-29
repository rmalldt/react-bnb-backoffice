import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Could not load the settings');
  }
  return data;
}

export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1) // only one row in the settings table
    .single();

  if (error) {
    console.error(error);
    throw new Error('Could not be update the settings');
  }
  return data;
}
