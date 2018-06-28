export function spy<T>(x: T): T {
  console.log(x);
  return x;
}
