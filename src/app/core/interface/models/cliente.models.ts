export class ClienteModel {
  constructor(
    // public readonly _id: string,
    public nombre: string,
    public telefono: number,
    public email: string,
    public tipoDocumento: string,
    public numeroDocumento: string,
    public estado?: boolean,
    public createAdt?: Date,
    public updateAdt?: Date,
    public direccion?: string
  ) {}
}
