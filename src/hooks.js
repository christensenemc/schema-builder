import { useState, useRef, useEffect } from 'react';

export function useInputState(defaultValue) {
  const [state, setState] = useState(defaultValue);

  const inputProps = {
    value: state,
    onChange(e) {
      setState(e.target.value);
    }
  };

  return [state, setState, inputProps];
}

export function useUpdateEffect(effect, deps) {
  const isInitialMount = useRef(true);

  useEffect(
    isInitialMount.current
      ? () => {
          isInitialMount.current = false;
        }
      : effect,
    deps
  );
}
