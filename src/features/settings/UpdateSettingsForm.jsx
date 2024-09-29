import StyledForm from '../../ui/StyledForm';
import FormRow from '../../ui/FormRow';
import StyledInput from '../../ui/StyledInput';
import { useSettings } from './useSettings';
import StyledSpinner from '../../ui/StyledSpinner';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSettings();

  function handleUpdate(e, field) {
    const value = e.target.value;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <StyledSpinner />;

  return (
    <StyledForm>
      <FormRow label="Minimum nights/booking">
        <StyledInput
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <StyledInput
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <StyledInput
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <StyledInput
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </StyledForm>
  );
}

export default UpdateSettingsForm;
