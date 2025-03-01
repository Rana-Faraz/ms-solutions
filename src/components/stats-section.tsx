import { STATS } from "@/static/Constants";

export const StatsSection = () => {
  return (
    <section
      className="bg-primary py-8 text-white"
      aria-labelledby="our-impact"
    >
      <div className="container mx-auto px-4">
        <h2 id="our-impact" className="sr-only">
          Our Healthcare Impact
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="mx-auto mb-4 h-10 w-10 text-primary-foreground/80" />
              <div className="text-4xl font-bold">{stat.number}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
