
export default function SectionHeader({ 
  badge, 
  icon: Icon, 
  title, 
  description, 
  badgeClassName = "", 
  iconClassName = "" 
}) {
  const renderSegments = (content) => {
    if (Array.isArray(content)) {
      return content.map((segment, index) => {
        if (typeof segment === "object" && segment !== null) {
          return (
            <span
              key={index}
              className={segment.className || ""}
              style={segment.style || {}}
            >
              {segment.text}
            </span>
          );
        }
        return <span key={index}>{segment}</span>;
      });
    }
    return content;
  };

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-6 select-none">
      {badge && (
        <div className={`inline-flex items-center gap-1.5 bg-white text-[#082042] text-sm font-bold px-4 py-2 rounded-full border border-slate-200 tracking-wide mb-5 roboto ${badgeClassName}`}>
          {Icon && <Icon className={`w-4 h-4 text-[#082042] ${iconClassName}`} />}
          <span>{renderSegments(badge)}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#082042] leading-[1.15] mb-4 lora">
        {renderSegments(title)}
      </h2>
      {description && (
        <p className="text-[#47515E] text-sm md:text-base leading-relaxed roboto font-medium max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
