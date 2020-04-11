import React from 'react';
import Select from '../Select';

const SelectCities = React.forwardRef(
  ({ cities, defaultValue, name, isFilter = false }, ref) => {
    return (
      <Select name={name} ref={ref} defaultValue={defaultValue}>
        {isFilter && (
          <option key="Todas" value="">
            Todas
          </option>
        )}
        {cities &&
          cities.map(({ provincia, iso_31662 }) => (
            <option key={iso_31662} value={provincia}>
              {provincia}
            </option>
          ))}
      </Select>
    );
  }
);

export default SelectCities;
