export default function Input({type, name, value, holder, handler, error}) {
  return (
    <div className="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">{holder}</span>
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
            type={type} name={name} value={value}
            onChange={handler} 
            className="form-control"
        />
      )}
      
      {error && (
          <small className="form-text text-danger">{error}</small>
      )}
    </div>
  )
}
