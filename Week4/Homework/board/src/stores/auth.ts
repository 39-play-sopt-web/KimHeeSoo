import { atom } from "jotai";
import { atomWithStorage} from "jotai/utils";
import type { Part } from "../types/api";

export interface AuthState {
    authorizationCode: string;
    part: Part;
}

export const authAtom = atomWithStorage<AuthState | null>("auth", null, undefined, {
    getOnInit:  true,
});

export const isLoggedInAtom = atom((get) => get(authAtom) !== null);