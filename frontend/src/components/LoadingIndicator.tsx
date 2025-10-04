export const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-muted-foreground">Loading conversation...</p>
      </div>
    </div>
  );
};
