export type LoadingType = "local" | "global" | "";

//per API need unit key loading
export type LoadingName = "";

export interface LoadingProps {
  type: LoadingType;
  name: LoadingName;
}

// eslint-disable-next-line no-unused-vars
export type LoadingKey = { [key in LoadingName]?: LoadingType };
