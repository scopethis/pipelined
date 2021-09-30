export default (steps: any) => {
  return (initial?: Params) => {
    return steps.reduce(
      async (params: Params, nextStep: any) => {
        const x = await params;
        return nextStep(...[x]);
      },
      initial ? initial : {}
    );
  };
};

type Params = {
  readonly [key: string]: any;
};
