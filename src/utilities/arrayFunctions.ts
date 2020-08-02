class ArrayFunctions {
  static partition = (array : any[], isValid : Function) : [any[], any[]] => { // [pass, fail]
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }
}

export default ArrayFunctions;