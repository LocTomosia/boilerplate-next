# hooks

This is a place for customized hooks. We assume the following hooks placement:

- Hooks that use React's built-in `useState`, `useEffect`, etc. internally

- Hooks that wrap other hooks provided by libraries

Consider alternative methods if any of the following applies to you:

- Pure functions that do not use React's built-in hooks internally (have no
  state or side effects)

→ Use [utils](../utils) without making it a hook using the use prefix.

## Directory name

snake_case

## File name

useXXX (camelCase)
