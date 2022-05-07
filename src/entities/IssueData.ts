// Tipo de las etiquetas de las issues.
export type DataLabel = {
  id: number;
  name: string;
  color: string;
  description: string | null;
};
// Clase que representa los datos de cada Issue. Se almacena en el campo 'isPull' si se trata de un Pull request.
export class IssueData {
  id: number;
  title: string;
  username: string;
  url: string;
  created_at: string;
  updated_at: string;
  open: boolean;
  labels: DataLabel[];
  commentsCount: number | undefined;
  comments_url: string;
  isPull: boolean;
  urlPullRequest: string | undefined

  constructor(
    id: number,
    title: string,
    url: string,
    username: string,
    created_at: string,
    updated_at: string,
    open: boolean,
    labels: DataLabel[],
    commentsCount: number | undefined,
    comments_url: string,
    isPull: boolean,
    urlPullRequest: string | undefined  
  ) {
    this.id = id;
    this.title = title;
    this.username = username;
    this.url = url;
    this.commentsCount = commentsCount;
    this.open = open;
    this.created_at = new Date(created_at).toLocaleDateString("es-ES");
    this.updated_at = new Date(updated_at).toLocaleDateString("es-ES");
    this.labels = labels;
    this.comments_url = comments_url;
    this.isPull = isPull;
    this.urlPullRequest = urlPullRequest
  }
}
