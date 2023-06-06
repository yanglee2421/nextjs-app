type Args = ConstructorParameters<typeof Date>;

export function toLocaleDate(...args: Args) {
  return new Date(...args).toLocaleString();
}
