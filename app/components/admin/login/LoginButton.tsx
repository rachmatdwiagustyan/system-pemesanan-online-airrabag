type Props = {
  loading: boolean;
};

export default function LoginButton({ loading }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      {loading ? "Loading..." : "Login"}
    </button>
  );
}