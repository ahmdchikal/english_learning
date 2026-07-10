const STATS = [
  { value: "6", label: "Level CEFR" },
  { value: "30+", label: "Unit Pembelajaran" },
  { value: "8", label: "Jenis Latihan" },
  { value: "100%", label: "Gratis Digunakan" },
];

export function ExampleStats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-3xl bg-indigo-600 px-6 py-12 text-white sm:px-12">
        <p className="text-center text-xs font-semibold tracking-wide text-indigo-200 uppercase">
          Contoh statistik (demo)
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-indigo-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
