import supabase from './supabase';
import { SUPABASE_URL } from './supabase';

const SUPABASE_STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/`;

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

export async function createCabin(newCabin) {
  // Create unique cabin name and if it contains slashes remove it to avoid creating
  // new folder in the database
  const imageName = `${(Math.random() * 10).toFixed(3)}-${
    newCabin.name
  }`.replaceAll(/[./]/g, '');

  const imagePath = `${SUPABASE_STORAGE_URL}${imageName}`;

  // Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      {
        name: newCabin.name,
        max_capacity: newCabin.maxCapacity,
        regular_price: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: imagePath,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error(`Could not create a cabin`);
  }

  // If create cabin is success, upload image to storage
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // Delete the associated created cabin if error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(error);
    throw new Error(`Could upload cabin image and no cabin was created`);
  }
}

/**
 * Image path sample URL:
 * "https://iwhwerbzmyehrzdrmikr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
 */
