export interface Column {
  id: "title" | "author" | "publication_date";
  label: string;
  align?: "right";
  format?: (value: any) => any;
}

export interface IBook {
  title: string;
  author: string;
  publication_date: Date;
  ISBN: string;
}
