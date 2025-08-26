import { Document } from "@/types/document";
import { DocumentCard } from "./DocumentCard";

interface DocumentGridProps {
  documents: Document[];
  onViewDocument: (id: string) => void;
  onEditDocument: () => void;
}

export const DocumentGrid = ({ documents, onViewDocument, onEditDocument }: DocumentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onView={onViewDocument}
          onEdit={onEditDocument}
        />
      ))}
    </div>
  );
};