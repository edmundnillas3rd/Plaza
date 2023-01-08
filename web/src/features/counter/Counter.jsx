import { increment, decrement, incrementByAmount } from "./counterSlice";

import { useDispatch, useSelector } from "react-redux";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <input
          type="text"
          onChange={(e) => dispatch(incrementByAmount(e.target.value))}
        />
      </div>
    </div>
  );
}
