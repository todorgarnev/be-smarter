import { writable } from "svelte/store";

export const userAnswers = writable<Record<string, string>>({});
