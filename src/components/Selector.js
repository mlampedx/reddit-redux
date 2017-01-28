import React, { PropTypes } from 'react';

export default function Selector({value, onChange, options}) {
  return (
    <span>
      <select onChange = {e => onChange(e.target.value)}
              value = {value}>
        {options.map(option => <option value = {option} key = {option}>{option}</option>)}
      </select>
    </span>
  )
}

Selector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
