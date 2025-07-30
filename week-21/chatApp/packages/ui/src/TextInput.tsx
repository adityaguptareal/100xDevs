import React from "react";
interface TextInputProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ placeholder, onChange }: TextInputProps) {
    const baseStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 18px',
        borderRadius: '999px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    };

    return (
        <div style={{ width: '100%' }}>
            <input onChange={onChange}
                type="text"
                placeholder={placeholder}
                style={baseStyle}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#007BFF';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.25)';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#ccc';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                }}
            />
        </div>
    );
}
