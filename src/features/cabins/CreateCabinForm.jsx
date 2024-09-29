import PropTypes from 'prop-types';
import StyledInput from '../../ui/StyledInput';
import StyledForm from '../../ui/StyledForm';
import StyledButton from '../../ui/StyledButton';
import StyledFileInput from '../../ui/StyledFileInput';
import StyledTextarea from '../../ui/StyledTextarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { cabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            // on finish editing close the Modal if the function exist
            // because the form may be used outside the model which
            // may not provide the onCloseModal functon
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledForm
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
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
        <StyledButton
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
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
