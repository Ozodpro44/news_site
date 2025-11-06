import { Card } from "@/components/ui/card";

interface AdBlockProps {
  variant?: "horizontal" | "square";
}

export const AdBlock = ({ variant = "horizontal" }: AdBlockProps) => {
  return (
    <Card
      className={`bg-muted flex items-center justify-center text-muted-foreground ${
        variant === "horizontal" ? "h-32" : "h-64"
      }`}
    >
      <div className="text-center">
        <p className="text-sm font-medium">Reklama maydoni</p>
        <p className="text-xs">Sizning reklamangiz bu yerda</p>
      </div>
    </Card>
  );
};
