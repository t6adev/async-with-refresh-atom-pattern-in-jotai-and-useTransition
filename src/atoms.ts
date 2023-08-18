import { atom } from "jotai";

let likes = 10;
const fetchLikes = async () => {
  await new Promise((r) =>
    setTimeout(() => {
      r(true);
    }, 500)
  );
  return likes;
};
const countUpLike = async () => {
  await new Promise((r) =>
    setTimeout(() => {
      r(true);
    }, 500)
  );
  likes++;
};

const baseRefreshAtom = atom<number | Promise<unknown>>(0);
const refreshAtom = atom(null, (get, set, promise?: Promise<unknown>) => {
  if (promise) {
    set(baseRefreshAtom, promise);
  } else {
    const baseRefresh = get(baseRefreshAtom);
    if (typeof baseRefresh === "number") {
      set(baseRefreshAtom, baseRefresh + 1);
    } else {
      set(baseRefreshAtom, 0);
    }
  }
});

export const likesAtom = atom(async (get) => {
  await get(baseRefreshAtom);
  const result = await fetchLikes();
  return result;
});

export const countUpLikeAtom = atom(null, (get, set) => {
  const promise = countUpLike();
  set(refreshAtom, promise);
});
