import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Could not load cabins');
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error(`Could not delete the cabin with id: ${id}`);
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );

  // Create unique cabin name and if it contains slashes remove it to avoid creating
  // new folder in the database
  const imageName = `${Math.random().toString().slice(11)}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  // Create/edit cabin
  const imagePath = hasImagePath
    ? newCabin.image
    : `${import.meta.env.VITE_SUPABASE_STORAGE_URL}/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  // Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error(`Could not create a cabin`);
  }

  // Only upload image if new image
  if (hasImagePath) return data;

  // If create cabin is success, upload image to storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // Delete the associated created cabin on error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(`Could upload cabin image and no cabin was created`);
  }
  return data;
}

/**
 * Image path sample URL:
 * "https://iwhwerbzmyehrzdrmikr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
 */
