const partners = [
  { name: "European Union", src: "/partners/eu-removebg-preview.png" },
  { name: "German Cooperation", src: "/partners/german-removebg-preview.png" },
  { name: "GIZ", src: "/partners/giz-removebg-preview.png" },
  { name: "NITDA", src: "/partners/nitda-removebg-preview.png" },
  { name: "ISN Hubs", src: "/partners/isn-hubs-removebg-preview.png" },
  { name: "Techmybiz", src: "/partners/techmybiz-removebg-preview.png" },
  { name: "Development Bank of Nigeria (DBN)", src: "/partners/dbn-removebg-preview.png" },
  { name: "BITs", src: "/partners/BITs%20Logo.png" },
];

export function TrustedPartnersStrip() {
  return (
    <section
      className="relative py-20 lg:py-24 overflow-hidden transition-colors bg-gradient-to-b from-slate-50 via-slate-100/80 to-slate-50 dark:from-slate-900/50 dark:via-slate-800/60 dark:to-slate-900/50"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Heading with decorative line */}
        <div className="flex flex-col items-center mb-14">
          <div className="h-px w-12 bg-[#0b3574]/30 dark:bg-[#0b3574]/50 rounded-full mb-5" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-400 mb-1">
            Trusted by
          </h3>
          <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 tracking-tight">
            Supported by leading partners
          </p>
        </div>

        {/* Grid layout - first row of 4 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
          {partners.slice(0, 4).map((partner) => (
            <div
              key={partner.name}
              className="group flex items-center justify-center p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-[#0b3574]/20 dark:hover:border-[#0b3574]/30 transition-all duration-300"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-16 md:h-20 w-full max-w-[140px] md:max-w-[180px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        {/* Second row - 3 items centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {partners.slice(4, 8).map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center justify-center p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-[#0b3574]/20 dark:hover:border-[#0b3574]/30 transition-all duration-300"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-16 md:h-20 w-full max-w-[140px] md:max-w-[180px] object-contain object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="mt-12 flex justify-center">
          <div
            className="h-0.5 w-24 rounded-full"
            style={{ backgroundColor: "rgba(11,53,116,0.15)" }}
          />
        </div>
      </div>
    </section>
  );
}
