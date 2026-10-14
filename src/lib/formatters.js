// Format currency in Indian Lakhs/Crores convention
export function formatIndianCurrency(price, purpose = "BUY") {
  if (!price && price !== 0) return "₹0";
  const num = Number(price);

  if (purpose && purpose.toUpperCase() === "RENT") {
    if (num >= 100000) {
      const inLakhs = (num / 100000).toFixed(2).replace(/\.00$/, "");
      return `₹${inLakhs} Lakh / mo`;
    }
    return `₹${num.toLocaleString("en-IN")} / mo`;
  }

  // BUY format
  if (num >= 10000000) {
    const inCrores = (num / 10000000).toFixed(2).replace(/\.00$/, "");
    return `₹${inCrores} Cr`;
  }
  if (num >= 100000) {
    const inLakhs = (num / 100000).toFixed(2).replace(/\.00$/, "");
    return `₹${inLakhs} Lakh`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

export function formatArea(areaSqFt) {
  if (!areaSqFt) return "";
  return `${Number(areaSqFt).toLocaleString("en-IN")} sq.ft`;
}

export function formatPricePerSqFt(price, areaSqFt, purpose = "BUY") {
  if (!price || !areaSqFt || Number(areaSqFt) === 0) return "";
  const perSqFt = Math.round(Number(price) / Number(areaSqFt));
  if (purpose && purpose.toUpperCase() === "RENT") {
    return `₹${perSqFt} / sq.ft / mo`;
  }
  return `₹${perSqFt.toLocaleString("en-IN")} / sq.ft`;
}

export function normalizePropertyType(type) {
  if (!type) return "Property";
  const t = type.toUpperCase();
  if (t === "APARTMENT") return "Apartment";
  if (t === "VILLA") return "Villa";
  if (t === "COMMERCIAL") return "Commercial";
  if (t === "PLOT") return "Plot / Land";
  if (t === "PG") return "PG / Co-living";
  return type;
}
