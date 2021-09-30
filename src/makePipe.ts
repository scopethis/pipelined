export default (
  validates: undefined | Validator,
  func: Function
): Promise<Pipe> => {
  return new Promise((resolve, reject) => {
    try {
      if (validates !== undefined) {
        const errorKeys = Object.keys(validates);
        const detail: string = validates[errorKeys[0]][0].toUpperCase();
        throw new Error(`PIPELINE: ${detail}`);
      } else {
        const response = func();
        resolve(response);
      }
    } catch (error) {
      throw error;
    }
  });
};

type Validator = {
  [key: string]: Array<string>;
};

type Pipe = {};

export { Pipe };
