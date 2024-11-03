export interface Login{
    
    IDUsuario: number;
    Correo: string;
    Contrasena: string;
    Rol: string;
    
}

export interface Registro{
    IDUsuario: number
    Nombre: string
    Apellido: string
    Correo: string
    AreaEspecializacion: string
    Institucion: string
    Contrasena: string
}