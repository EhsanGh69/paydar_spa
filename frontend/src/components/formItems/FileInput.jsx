export default function FileInput({ name, handler, formats, label, error }) {
    // formats for image: "image/jpeg,image/png,image/gif,image/jpg"

    return (
        <>
            <div className="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">{label}</span>
                </div>
                <input
                    type="file" name={name}
                    accept={formats}
                    onChange={handler}
                    className="form-control"
                />
            </div>
            <p className="text-muted mt-2">
                حداکثر حجم : 200kb ,
                فرمت های مجاز : jpeg | jpg | png | gif
            </p>
            <p>
                {error && (
                    <strong className="form-text text-danger">{error}</strong>
                )}
            </p>

        </>
    )
}
