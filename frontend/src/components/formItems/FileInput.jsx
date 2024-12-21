export default function FileInput({ name, handler, formats, label, errors }) {
    // formats for image: "image/jpeg,image/png,image/gif,image/jpg"

    return (
        <div className="col-12 col-xl-6 mb-3">
            <div className="input-group border rounded p-2">
                <label htmlFor={name} className="btn btn-success">
                    <strong>{label}</strong>
                </label>
                <input type="file" onChange={handler}
                    accept={formats}
                    name={name} id={name} />
            </div>
            {errors && (
                <strong className="form-text text-danger">{errors}</strong>
            )}
        </div>
    )
}
