function isVNode(node) {
  /* eslint-disable no-prototype-builtins */
  return (
    node !== null &&
    typeof node === "object" &&
    node.hasOwnProperty("componentOptions")
  );
}

function Defered() {
  const defer = {};
  const p = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  defer.then = p.then.bind(p);
  defer.catch = p.catch.bind(p);
  return defer;
}

export { isVNode, Defered };
