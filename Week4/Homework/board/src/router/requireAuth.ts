import { redirect } from "react-router";
import { getDefaultStore } from "jotai";
import { authAtom } from "../stores/auth";

export const requireAuth = () => {
     if (getDefaultStore().get(authAtom)) return null;

      alert("인증 코드가 필요해요. 코드를 먼저 발급받아 주세요.");
  return redirect("/");
};