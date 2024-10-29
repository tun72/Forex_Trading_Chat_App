export const RadioOption = ({ label, value, selectedValue, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        name="privacy"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        className="cursor-pointer"
        aria-label={label}
      />
      <label onClick={() => onChange(value)} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};
