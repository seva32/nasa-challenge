export function withPayloadType<T>() {
  return (t: T) => ({payload: t});
}

export function isJson(str: string) {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === `object`) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
