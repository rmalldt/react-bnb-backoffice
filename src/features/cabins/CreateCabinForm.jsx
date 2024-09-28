import StyledInput from '../../ui/StyledInput';
import StyledForm from '../../ui/StyledForm';
import StyledButton from '../../ui/StyledButton';
import StyledFileInput from '../../ui/StyledFileInput';
import StyledTextarea from '../../ui/StyledTextarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message),
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <StyledInput
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <StyledInput
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <StyledInput
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <StyledInput
          type="number"
          id="discount"
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              value < getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <StyledTextarea
          type="text"
          id="description"
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <StyledFileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <StyledButton variation="secondary" type="reset">
          Cancel
        </StyledButton>
        <StyledButton disabled={isCreating}>Add cabin</StyledButton>
      </FormRow>
    </StyledForm>
  );
}

export default CreateCabinForm;
