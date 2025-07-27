import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';
import type { IModificarPregunta } from '$lib/core/preguntas/Domain/IModificarPregunta.js';
import axios from 'axios';
import { mostrarToast } from '../../../../store/ToastStore.js';

export default class CPregunta {
    private NroPregunta: number;
    private SeTermino: boolean;
    private Preguntas: TEntityMain[];
    private readonly Respuestas: Array<string> = [];
    private Respuesta: string;
    constructor(preguntas: TEntityMain[], seTermino: boolean, nroPregunta: number, respuesta: string) {
        this.Preguntas = preguntas;
        this.NroPregunta = nroPregunta;
        this.SeTermino = seTermino;
        this.Respuesta = respuesta;
    }
    public async validarRespuestas(): Promise<{ Correctas: number; Incorrectas: number }> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Cuestionario/Respuesta/validar`;
        const res = await axios.post(url, {
            Respuestas: this.Respuestas.join(':'),
        });
        return res.data;
    }
    public async obtenerPreguntas(props: IModificarPregunta): Promise<void> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Cuestionario/Pregunta/obtener`;
        const res = await axios.get(url);
        this.Preguntas = res.data;
        props.almacenarPreguntas(this.Preguntas);
    }
    public UsoCasoSolicitarPreguntas(props: IModificarPregunta, respuesta: string): void {
        this.Respuesta = respuesta;
        if (!this.validarRespuesta()) return;
        this.agregarRespuesta();
        this.siguientePregunta(props);
        props.limpiarRespuesta();
    }
    private siguientePregunta(props: IModificarPregunta) {
        if (this.Preguntas.length === this.NroPregunta + 1) {
            this.SeTermino = true;
            props.terminarCuestionario();
        } else {
            this.NroPregunta++;
            props.agregarPregunta();
        }
    }
    private validarRespuesta(): boolean {
        if (this.Respuesta === '') {
            mostrarToast({
                Mostrar: true,
                Texto: '¡Hey! No olvides elegir una respuesta.',
                Icono: 'carbon:warning',
                Tipo: 'warning',
            });
            return false;
        }
        return true;
    }
    private agregarRespuesta() {
        this.Respuestas.push(this.Respuesta);
    }
}
