export default function Select({name, value, options, title, handler, error}) {
  return (
    <>
      <div className="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">{title}</span>
        </div>
        <select name={name} className="custom-select" value={value}
        onChange={handler}>
            <option value="">انتخاب کنید</option>
            {options.map(option => (
                <option value={option.name}>{option.name}</option>
            ))}
        </select>
      </div>
      {error && (
          <small className="form-text text-danger">{error}</small>
      )}
    </>
  )
}
