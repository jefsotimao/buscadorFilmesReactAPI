function SearchInput({ value, onChange }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar Filmes..."
        className="px-4 py-2 w-1/2 border rounded-lg outline-none"
      />
    </div>
  );
}

export default SearchInput;