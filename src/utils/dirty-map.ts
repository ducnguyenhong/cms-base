export function toCamelCase(str: string) {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

// we may find the better solution
// do not use this function for copy cat
export function snakeToCamelCase(o: any): unknown {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== "function") {
    const n: Record<string, unknown> = {};

    Object.keys(o).forEach((k) => {
      const key = toCamelCase(k);
      n[key] = snakeToCamelCase(o[k]);
    });

    return n;
  }

  if (Array.isArray(o)) {
    return o.map((i) => {
      return snakeToCamelCase(i);
    });
  }

  return o;
}
