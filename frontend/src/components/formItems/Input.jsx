export default function Input({ type, name, value, holder, handler, error }) {
  return (
    <>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{holder}</span>
        </div>
        {name.includes('date')
          ? (
            <input
              type={type} name={name} value={value}
              onInput={handler}
              className="form-control" data-jdp
            />
          )
          : (
            <input
              min={0}
              placeholder={type === 'number' ? 0 : ''}
              type={type} name={name} value={value}
              onChange={handler}
              className="form-control"
            />
          )
        }
      </div>
      {error && (
        <strong className="form-text text-danger">
          {error}
        </strong>
      )}
    </>
  )
}
