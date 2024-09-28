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

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      {
        name: newCabin.name,
        max_capacity: newCabin.maxCapacity,
        regular_price: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: newCabin.image,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error(`Could not create a cabin`);
  }

  return data;
}
