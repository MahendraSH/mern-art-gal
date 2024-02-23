import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import { FC } from "react";

const LoaderSpinnerVariants = cva("text-muted-foreground animate-spin ", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      md: "h-6 w-6",
      lg: "h-8 w-8",

      icon: "h-12 w-12",
    },
    defaultVariants: {
      size: "default",
    },
  },
});

interface LoaderSpinnerProps
  extends VariantProps<typeof LoaderSpinnerVariants> {}
const LoaderSpinner: FC<LoaderSpinnerProps> = ({ size }) => {
  return (
    <>
      <LoaderIcon
        className={cn(LoaderSpinnerVariants({ size }), " text-primary ")}
      />
    </>
  );
};

export default LoaderSpinner;
