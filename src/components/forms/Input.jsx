/**
 * 
 * @param {string} value
 * @param {(s: string) => void} onChange
 * @param {string} placeholder
 * @returns {JSX.Element}
 */

export function Input({onChange, placeholder, value }) {
    return <div>
        <input 
            type="text" 
            className="form-control"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}