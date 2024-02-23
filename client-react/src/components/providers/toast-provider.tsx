import { FC } from "react";
import { Toaster } from "react-hot-toast";
interface TostProviderProps {}

const TostProvider: FC<TostProviderProps> = () => {
  return <Toaster position="bottom-center" gutter={5} />;
};

export default TostProvider;
