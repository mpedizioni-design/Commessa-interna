Ecco un’applicazione completa per la gestione delle commesse in una sala stampa:

import { useState, useRef } from "react";

const initialForm = {
  cliente: "",
  azienda: "",
  email: "",
  telefono: "",
  titolo: "",
  tipo: "Offset",
  formato: "A4",
  quantita: "",
  carta: "Patinata lucida 130gr",
  colori: "4+4 (CMYK)",
  plastificatura: "Nessuna",
  finitura: "",
  consegna: "",
  note: "",
};

const tipiStampa = ["Offset", "Digitale", "Serigrafia", "Flexografia", "Tampografia", "Large Format"];
const formati = ["A3", "A4", "A5", "A6", "100x70", "50x70", "Personalizzato"];
const carte = [
  "Patinata lucida 130gr",
  "Patinata lucida 170gr",
  "Patinata lucida 250gr",
