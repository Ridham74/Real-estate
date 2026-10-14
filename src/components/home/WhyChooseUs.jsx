import { whyChooseBenefits } from "@/data/mockData";

export default function WhyChooseUs() {
  const getBenefitIcon = (icon) => {
    switch (icon) {
      case "shield-check":
        return (
          <svg className="w-7 h-7 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        );
      case "user-check":
        return (
          <svg className="w-7 h-7 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        );
      case "search-smart":
        return (
          <svg className="w-7 h-7 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
        );
      case "support-hand":
        return (
          <svg className="w-7 h-7 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.579-3.091c-.443-.016-.882-.038-1.317-.066-1.134-.075-1.98-.988-1.98-2.124v-4.36c0-.97.616-1.813 1.5-2.097m6.876 0a34.16 34.16 0 00-6.876 0m6.876 0c.247-.08.489-.165.727-.257a2.25 2.25 0 001.423-2.11V4.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 4.5v1.656a2.25 2.25 0 001.423 2.11c.238.092.48.177.727.257m0 0a34.16 34.16 0 016.876 0" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="why-choose-us" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 w-full">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
            The HomeConnect Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose HomeConnect
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm md:text-base">
            Engineered to remove friction from buying, selling, and renting properties throughout India.
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {whyChooseBenefits.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
                  {getBenefitIcon(item.icon)}
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-2">
                  {item.metric}
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <span>Verified Standards</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
