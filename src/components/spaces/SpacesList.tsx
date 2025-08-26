import { Space } from "@/types/document";
import { SpaceCard } from "./SpaceCard";

interface SpacesListProps {
  spaces: Space[];
  onSpaceClick: (spaceId: string) => void;
}

export const SpacesList = ({ spaces, onSpaceClick }: SpacesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map((space) => (
        <SpaceCard
          key={space.id}
          space={space}
          onClick={onSpaceClick}
        />
      ))}
    </div>
  );
};