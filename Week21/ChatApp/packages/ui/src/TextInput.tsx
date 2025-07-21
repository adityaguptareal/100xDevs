interface propTypes {
    placeholder: string;


}
export function TextInput({ placeholder, }: propTypes) {
    return (
        <div>
            <input  type="text" style={{ borderRadius: "50px", padding: "10px 14px", outline: "none", }} placeholder={placeholder} />
        </div>
    )
}