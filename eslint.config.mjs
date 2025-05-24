import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["crawler/dist", "social/dist"],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended
);
