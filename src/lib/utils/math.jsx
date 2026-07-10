/**
 * Parses a mathematical string (e.g. "x = x^2 / 2^2 + 1/2 + 14")
 * and formats it into HTML/JSX vertical fractions and superscripts.
 *
 * @param {string} equationStr - Raw equation string
 * @param {boolean} isSmall - True if rendering in a compact panel like solutions list
 */
export const parseMathEquation = (equationStr, isSmall = false) => {
  if (!equationStr) return null;

  // 1. Normalize spaces around division `/`
  let normalized = equationStr.replace(/\s*\/\s*/g, "/");

  // 2. Split into tokens by spaces
  const tokens = normalized.split(/\s+/);

  // Helper to format superscripts (e.g. x^2 or x² -> x<sup>2</sup>)
  const formatPower = (str) => {
    return str
      .replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, "$1<sup>$2</sup>")
      .replace(/([a-zA-Z0-9]+)²/g, "$1<sup>2</sup>");
  };

  return (
    <div
      className={`flex items-center flex-wrap gap-1.5 text-black font-serif italic select-none ${
        isSmall
          ? "justify-start text-sm sm:text-base my-0.5"
          : "justify-center text-2xl sm:text-2xl my-6"
      }`}
    >
      {tokens.map((token, index) => {
        // If token contains a division slash, it's a fraction
        if (token.includes("/") && token !== "/") {
          const [num, den] = token.split("/");
          return (
            <div key={index} className="flex flex-col items-center mx-1">
              <span
                className="border-b border-slate-400 px-1 pb-0.5 text-center leading-none"
                dangerouslySetInnerHTML={{ __html: formatPower(num) }}
              />
              <span
                className="pt-0.5 text-center leading-none"
                dangerouslySetInnerHTML={{ __html: formatPower(den) }}
              />
            </div>
          );
        }

        // Render operators with more space
        if (["=", "+", "-", "*", "=="].includes(token)) {
          return (
            <span
              key={index}
              className="mx-1 font-sans not-italic text-slate-400 font-light"
            >
              {token}
            </span>
          );
        }

        // Standard token (e.g. variables or numbers)
        return (
          <span
            key={index}
            className="leading-none"
            dangerouslySetInnerHTML={{ __html: formatPower(token) }}
          />
        );
      })}
    </div>
  );
};
