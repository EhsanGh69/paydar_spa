export default function CardTitle({title}) {
    return (
        <div className="card-title">
            <div className="text-center">
                <img src="/logo192.png" alt="logo" width="130" />
            </div>
            <h1 className="text-center">{title}</h1>
        </div>
    )
}