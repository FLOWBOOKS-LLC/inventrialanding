const partners = [
  { name: "German Cooperation", src: "/partners/german-cooperation.png" },
  { name: "European Union", src: "/partners/eu.png" },
  { name: "GIZ", src: "/partners/giz.png" },
  { name: "NITDA", src: "/partners/nitda.png" },
  { name: "ISN Hubs", src: "/partners/isn-hubs.png" },
  { name: "Techmybiz", src: "/partners/techmybiz.png" },
  { name: "Development Bank of Nigeria (DBN)", src: "/partners/dbn.png" },
];

export function TrustedPartnersStrip() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="text-center">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Supported by leading partners
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-6 md:h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
