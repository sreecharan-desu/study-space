import React from 'react';

type InputBoxProps = {
    input_type: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'; // Restricting to common input types
    placeholder_text: string;
    OnchangeFn: (event: React.ChangeEvent<HTMLInputElement>) => void; // Specifying the exact event type and return type
};

export default function InputBox({ input_type, placeholder_text, OnchangeFn }: InputBoxProps) {
    return (
        <input
            type={input_type}
            placeholder={placeholder_text}
            className="p-2 border rounded"
            onChange={OnchangeFn}
        />
    );
}
