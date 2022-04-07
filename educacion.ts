export class Educacion{ //export permite usar la clase desde otro archivo
    public titulo: String
    public institucion: String
    public periodo: String

    constructor(titulo: String, institucion: String, periodo:String){
        this.titulo = titulo
        this.institucion = institucion
        this.periodo = periodo
    }
    
}