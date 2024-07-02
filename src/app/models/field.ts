export class Field {
  constructor(
    public label: string,
    public dbType: string = 'varchar',
    public len: number,
    public required: boolean = false
  ) {}
}
