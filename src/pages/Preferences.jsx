export default function Preferences() {
  return (
    <div className="p-5">
      <h1 className="text-seance-950">Préférences utilisateur</h1>
      <label className="block mb-2.5">
        <input
          type="checkbox"
          className="appearance-none w-5 h-5 border-seance-500 border-solid rounded-md cursor-pointer align-middle mr-2.5"
        />
        Mode Sombre
      </label>
    </div>
  );
}
