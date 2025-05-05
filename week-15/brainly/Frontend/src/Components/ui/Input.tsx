
function Input({ placeholder, onChange, type, className }: { className: String, placeholder: string, type: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <input type={type} placeholder={placeholder} className={`px-4 py-2 border rounded-md m-2 ${className}`} onChange={onChange} />
        </div>
    )
}

export default Input

