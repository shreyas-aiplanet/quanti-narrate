import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-card/80 p-8 shadow-2xl backdrop-blur-sm">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">Processing Data</p>
          <p className="text-sm text-muted-foreground">Analyzing sales trends...</p>
        </div>
      </div>
    </div>
  );
};
