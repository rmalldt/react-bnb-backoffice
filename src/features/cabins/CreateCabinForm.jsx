import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import StyledInput from '../../ui/StyledInput';
import StyledForm from '../../ui/StyledForm';
import StyledButton from '../../ui/StyledButton';
import StyledFileInput from '../../ui/StyledFileInput';
import StyledTextarea from '../../ui/StyledTextarea';
import { useForm } from 'react-hook-form';
import { createEditCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
};

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabinData, id }) => createEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success('Cabin edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) editCabin({ cabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image });
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
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <StyledInput
          type="number"
          id="max_capacity"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <StyledInput
          type="number"
          id="discount"
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              (+value >= 0 && +value < +getValues().regularPrice) ||
              'Discount should be 0 or less than regular price',
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
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <StyledFileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <StyledButton variation="secondary" type="reset">
          Cancel
        </StyledButton>
        <StyledButton disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </StyledButton>
      </FormRow>
    </StyledForm>
  );
}

export default CreateCabinForm;
