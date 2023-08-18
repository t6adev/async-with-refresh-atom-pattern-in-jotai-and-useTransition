import { Suspense, useTransition } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import "./styles.css";

import { likesAtom, countUpLikeAtom } from "./atoms";

const Like = () => {
  const likes = useAtomValue(likesAtom);
  const countUpLike = useSetAtom(countUpLikeAtom);
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <button
        onClick={() => {
          startTransition(() => {
            countUpLike();
          });
        }}
        style={{ fontSize: "2rem" }}
      >
        🧡
      </button>
      <div>{likes}</div>
      {isPending && <div>updating...</div>}
    </div>
  );
};

const App = () => (
  <Suspense fallback="Loading...">
    <div className="App">
      <h4>Async atom with refresh atom pattern in Jotai.</h4>
      <Like />
    </div>
  </Suspense>
);

export default App;
