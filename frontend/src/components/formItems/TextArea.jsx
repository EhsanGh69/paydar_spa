export default function TextArea({name, value, handler, holder, error}) {
    return (
      <div className="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">{holder}</span>
        </div>
        <textarea name={name} onChange={handler} value={value}
           rows="5" className="form-control"></textarea>
          {error && (
              <small className="form-text text-danger">{error}</small>
          )}
      </div>
    )
  }