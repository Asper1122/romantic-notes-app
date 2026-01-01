export class Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;

  constructor(id: string, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.updatedAt = Date.now();
  }

  public get getId() {
    return this.id;
  }

  public get getTitle() {
    return this.title;
  }

  public get getContent() {
    return this.content;
  }

  public get getUpdatedAt() {
    return this.updatedAt;
  }

  public set setTitle(title: string) {
    this.title = title;
  }

  public set setContent(content: string) {
    this.content = content;
  }
}
