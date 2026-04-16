type Props = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

export default function LoginInput({
  label,
  type,
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        title={label}
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}