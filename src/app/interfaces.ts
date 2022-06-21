export interface Noticia{
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    fechaCaducidad: string; 
}

export interface Noticia_cantidad{
    list: Noticia[],
    size: number;
}

export interface Documento{
    id: number;
    titulo: string;
    tipo: string;
    documentoPDF: string;
    activo: boolean;
}

export interface Materia{
    id: number;
    nombre: string;
    descripcion: string;
    creditosMinimos: number;
}

export interface Previa{
    unidadCurricular: number;
    previa: number;
    tipo: string;
}

export interface UnidadCurricular{
    id: number;
    nombre: string;
    descripcion: string;
    creditos: number;
    documento: string;
    semestre: number;
    materia: Materia;
    previas: Previa[];
}