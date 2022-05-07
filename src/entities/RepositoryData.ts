// Clase que representa los datos de un repositorio
export class RepositoryData {
  id: number;
  full_name: string;
  forks: number;
  created_at: string;
  updated_at: string;
  visibility: string;
  url: string;
  open_issues: number;

  constructor(
    id: number,
    full_name: string,
    forks: number,
    created_at: string,
    updated_at: string,
    visibility: string,
    url: string,
    open_issues: number
  ) {
    this.id = id;
    this.full_name = full_name;
    this.forks = forks;
    this.created_at = new Date(created_at).toLocaleDateString("es-ES");
    this.updated_at = new Date(updated_at).toLocaleDateString("es-ES");
    this.visibility = visibility;
    this.url = url;
    this.open_issues = open_issues;
  }
}
