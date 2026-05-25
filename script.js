const formContent = document.getElementById("form-content");
const statusMessage = document.getElementById("status-message");
const form = document.getElementById("mvision-form");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const stepIndicator = document.getElementById("step-indicator");
const stepProgressBar = document.getElementById("step-progress-bar");

const frequencyOptions = ["Nunca", "Ocasionalmente", "A menudo o siempre"];
const intensityOptions = ["Nunca", "Baja", "Moderada", "Alta"];
let currentStep = 0;

const schema = [
  {
    title: "Datos personales",
    helper: "Campos basados en las preguntas iniciales del Excel.",
    fields: [
      { type: "text", label: "Indica tu nombre y apellidos", name: "nombre", className: "half" },
      { type: "number", label: "Indica tu edad en años", name: "edad", className: "third", min: 0, max: 120 },
      {
        type: "select",
        label: "Indica tu sexo biológico",
        name: "sexo",
        className: "third",
        options: ["", "Femenino", "Masculino", "Prefiero no indicarlo"],
      },
      {
        type: "email",
        label:
          "Indica tu correo electrónico, ya que los resultados de tu cuestionario se enviarán a este correo",
        name: "email",
      },
    ],
  },
  {
    title: "Medicamentos habituales",
    helper: "Puedes señalar varios medicamentos, como en el Excel original.",
    fields: [
      {
        type: "checkboxes",
        label: "Indica si tomas habitualmente alguno de los siguientes medicamentos (puedes señalar varios)",
        name: "medicamentos",
        options: [
          "Antihistamínicos",
          "Antidepresivos",
          "Ansiolíticos",
          "Medicamentos para el control de la tensión arterial",
          "Anticolinérgicos",
          "Anticonceptivos orales",
          "Anticonceptivos no orales",
          "No tomo ninguno",
          "Otros",
        ],
      },
      {
        type: "text",
        label: "Indica si tomas habitualmente alguno de los siguientes medicamentos (puedes señalar varios) Otros Obs:",
        name: "medicamentos_otros",
      },
    ],
  },
  {
    title: "Condiciones generales",
    helper: "Selecciona las condiciones que apliquen.",
    fields: [
      {
        type: "checkboxes",
        label: "¿Sufres alguna de las siguientes condiciones? (Puedes señalar varias)",
        name: "condiciones",
        options: [
          "Estrés",
          "Acné",
          "Alergia",
          "Ansiedad",
          "Migrañas",
          "Eczemas",
          "Asma",
          "Psoriasis",
          "Depresión",
          "Deficiencia de vitaminas",
          "Diabetes",
          "Problemas de tiroides",
          "Problemas de fertilidad",
          "Esclerosis",
          "No sufro ninguna de estas condiciones, ni otras",
          "Otros",
        ],
      },
      {
        type: "text",
        label: "¿Sufres alguna de las siguientes condiciones? (Puedes señalar varias) Otros Obs:",
        name: "condiciones_otros",
      },
    ],
  },
  {
    title: "Hábitos y estilo de vida",
    fields: [
      {
        type: "radio",
        label: "¿Eres fumador/a?",
        name: "fumador",
        options: ["Sí", "No", "Exfumador/a"],
        className: "half",
      },
      {
        type: "number",
        label: "¿Cuántas tazas de bebidas con cafeína (café u otras) tomas, de media, al día?",
        name: "tazas_cafeina",
        className: "half",
        min: 0,
      },
      {
        type: "number",
        label: "¿Cuántas tazas de bebidas con teína tomas, de media, al día?",
        name: "tazas_teina",
        className: "half",
        min: 0,
      },
      {
        type: "radio",
        label: "¿Sueles consumir alcohol, al menos, un día a la semana?",
        name: "alcohol",
        options: ["Sí", "No"],
        className: "half",
      },
      {
        type: "number",
        label: "¿Cuántas horas (de media) duermes cada noche?",
        name: "horas_sueno",
        className: "third",
        min: 0,
        max: 24,
        step: 0.5,
      },
      {
        type: "number",
        label: "¿Cuánto tiempo (de media) pasas al día al aire libre? (horas)",
        name: "horas_aire_libre",
        className: "third",
        min: 0,
        max: 24,
        step: 0.5,
      },
      {
        type: "number",
        label: "¿Cuántos días a la semana (de media) realizas actividad física?",
        name: "dias_actividad",
        className: "third",
        min: 0,
        max: 7,
      },
      {
        type: "number",
        label:
          "Teniendo en cuenta los días que realizas actividad física, ¿cuánto tiempo (de media diaria) dedicas a la realización de actividad física? (minutos)",
        name: "min_actividad",
        className: "half",
        min: 0,
      },
      {
        type: "radio",
        label: "¿Eres usuario habitual (al menos 4 días a la semana) de lentes de contacto?",
        name: "lentes_contacto",
        options: ["Sí", "No"],
        className: "half",
      },
    ],
  },
  {
    title: "Uso de dispositivos electrónicos",
    fields: [
      {
        type: "checkboxes",
        label:
          "¿Qué tipo de dispositivo electrónico (ordenador, tablet, smartphone,...) sueles utilizar? (Puedes señalar más de 1 opción)",
        name: "dispositivos",
        options: ["Ordenador de sobremesa", "Ordenador portátil", "Tablet", "Smartphone", "Otros"],
      },
      {
        type: "text",
        label:
          "¿Qué tipo de dispositivo electrónico (ordenador, tablet, smartphone,...) sueles utilizar? (Puedes señalar más de 1 opción) Otros Obs:",
        name: "dispositivos_otros",
      },
      {
        type: "number",
        label:
          "¿Cuántas horas (en total) utilizas dispositivos electrónicos (ordenador, tablet, smartphone,...) al día?",
        name: "horas_pantalla",
        className: "half",
        min: 0,
        max: 24,
        step: 0.5,
      },
      {
        type: "number",
        label:
          "¿Cuántos días utilizas dispositivos electrónicos (ordenador, tablet, smartphone,...) a la semana?",
        name: "dias_pantalla",
        className: "half",
        min: 0,
        max: 7,
      },
      {
        type: "select",
        label:
          "¿Con qué frecuencia haces pausas durante tu trabajo con dispositivos electrónicos? (Una pausa se define como un receso de al menos 5 minutos)",
        name: "frecuencia_pausas",
        className: "half",
        options: [
          "",
          "Nunca",
          "Casi nunca",
          "A veces",
          "Frecuentemente",
          "Siempre",
        ],
      },
      {
        type: "select",
        label: "¿Cuál es la duración media de estos descansos?",
        name: "duracion_descansos",
        className: "half",
        options: ["", "Menos de 5 minutos", "5-10 minutos", "11-20 minutos", "Más de 20 minutos"],
      },
      {
        type: "radio",
        label:
          "¿Utilizas alguna lágrima artificial cuando trabajas con dispositivos electrónicos (ordenador, tablet, smartphone,...)?",
        name: "lagrima_artificial",
        options: ["Sí", "No", "A veces"],
        className: "half",
      },
    ],
  },
  {
    title: "Alteraciones en la última semana",
    helper: "Marca la frecuencia con la que has notado cada situación.",
    fields: [
      {
        type: "matrixSingle",
        name: "alteraciones",
        rows: [
          "Sensibilidad a la luz",
          "Sensación de arenilla en los ojos",
          "Dolor de ojos",
          "Visión borrosa",
          "Mala visión",
          "Problemas al leer",
          "Problemas al conducir de noche",
          "Limitación al trabajar con ordenador o cajero",
          "Problemas al ver la televisión",
          "Incomodidad con viento",
          "Incomodidad en lugares con baja humedad",
          "Incomodidad en zonas con aire acondicionado",
        ],
        options: ["Nunca", "Rara vez", "A veces", "Frecuentemente", "Siempre"],
      },
    ],
  },
  {
    title: "Síntomas durante uso de dispositivos",
    helper:
      "Bloque tomado del Excel: para cada síntoma indica frecuencia e intensidad. Si eliges Nunca en frecuencia, usa Nunca en intensidad.",
    fields: [
      {
        type: "matrixDual",
        name: "sintomas_digitales",
        rows: [
          "Ardor",
          "Picor",
          "Sensación de cuerpo extraño",
          "Lagrimeo",
          "Parpadeo excesivo",
          "Enrojecimiento ocular",
          "Dolor ocular",
          "Pesadez de párpados",
          "Sequedad",
          "Visión borrosa",
          "Visión doble",
          "Dificultad al enfocar en visión de cerca",
          "Aumento de sensibilidad a la luz",
          "Halos de colores alrededor de los objetos",
          "Sensación de ver peor",
          "Dolores de cabeza",
          "¿Notas tus ojos cansados?",
          "¿Notas incomodidad en tus ojos?",
          "¿Te duele la cabeza?",
          "¿Te entra sueño?",
          "¿Pierdes la concentración?",
          "¿Te cuesta recordar lo que has leído?",
          "¿Ves doble?",
          "¿Te parece que las palabras se mueven, se mezclan o flotan sobre el texto?",
          "¿Te parece que lees lento?",
          "¿Te duelen los ojos?",
          "¿Se te irritan los ojos?",
          "¿Tienes sensación de tirantez alrededor de los ojos?",
          "¿Notas que las palabras se ponen borrosas o que se enfocan y desenfocan?",
          "¿Te pierdes de línea al leer?",
          "¿Tienes que releer la misma línea de texto?",
        ],
      },
    ],
  },
];

function createSection(section) {
  const container = document.createElement("section");
  container.className = "section";

  const title = document.createElement("h2");
  title.textContent = section.title;
  container.appendChild(title);

  if (section.helper) {
    const helper = document.createElement("p");
    helper.className = "helper";
    helper.textContent = section.helper;
    container.appendChild(helper);
  }

  const grid = document.createElement("div");
  grid.className = "grid";

  section.fields.forEach((field) => grid.appendChild(createField(field)));

  container.appendChild(grid);
  return container;
}

function createField(field) {
  const wrap = document.createElement("article");
  wrap.className = `field ${field.className || ""}`.trim();

  if (field.type === "text" || field.type === "email" || field.type === "number") {
    const label = document.createElement("label");
    label.textContent = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.name = field.name;
    input.required = true;
    if (field.min !== undefined) input.min = String(field.min);
    if (field.max !== undefined) input.max = String(field.max);
    if (field.step !== undefined) input.step = String(field.step);

    wrap.append(label, input);
    return wrap;
  }

  if (field.type === "select") {
    const label = document.createElement("label");
    label.textContent = field.label;

    const select = document.createElement("select");
    select.name = field.name;
    select.required = true;

    field.options.forEach((option) => {
      const item = document.createElement("option");
      item.value = option;
      item.textContent = option || "Selecciona una opción";
      if (!option) {
        item.disabled = true;
        item.selected = true;
      }
      select.appendChild(item);
    });

    wrap.append(label, select);
    return wrap;
  }

  if (field.type === "radio" || field.type === "checkboxes") {
    const legend = document.createElement("p");
    legend.className = "legend";
    legend.textContent = field.label;
    wrap.appendChild(legend);

    const choices = document.createElement("div");
    choices.className = "choice-group";

    field.options.forEach((option, index) => {
      const row = document.createElement("label");
      row.className = "choice-row";

      const input = document.createElement("input");
      input.type = field.type === "radio" ? "radio" : "checkbox";
      input.name = field.type === "radio" ? field.name : `${field.name}[]`;
      input.value = option;
      input.id = `${field.name}-${index}`;
      if (field.type === "radio" && index === 0) input.required = true;

      const text = document.createElement("span");
      text.textContent = option;

      row.append(input, text);
      choices.appendChild(row);
    });

    wrap.appendChild(choices);

    if (field.type === "checkboxes") {
      const items = choices.querySelectorAll('input[type="checkbox"]');
      items.forEach((item) => {
        item.addEventListener("change", () => {
          const checked = Array.from(items).some((checkbox) => checkbox.checked);
          items.forEach((checkbox) => {
            checkbox.setCustomValidity(checked ? "" : "Selecciona al menos una opción.");
          });
          wrap.classList.toggle("is-invalid", !checked);
        });
        item.setCustomValidity("Selecciona al menos una opción.");
      });
    }

    return wrap;
  }

  if (field.type === "matrixSingle") {
    const matrix = document.createElement("div");
    matrix.className = "matrix";

    field.rows.forEach((rowLabel) => {
      const row = document.createElement("article");
      row.className = "matrix-row";

      const symptom = document.createElement("p");
      symptom.className = "symptom";
      symptom.textContent = rowLabel;

      const select = document.createElement("select");
      select.name = `${field.name}[${rowLabel}]`;
      select.required = true;

      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Selecciona una opción";
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);

      field.options.forEach((option) => {
        const item = document.createElement("option");
        item.value = option;
        item.textContent = option;
        select.appendChild(item);
      });

      row.append(symptom, select);
      matrix.appendChild(row);
    });

    wrap.appendChild(matrix);
    return wrap;
  }

  if (field.type === "matrixDual") {
    const matrix = document.createElement("div");
    matrix.className = "matrix";

    field.rows.forEach((rowLabel) => {
      const row = document.createElement("article");
      row.className = "matrix-row";

      const symptom = document.createElement("p");
      symptom.className = "symptom";
      symptom.textContent = rowLabel;

      const freq = document.createElement("select");
      freq.name = `${field.name}[${rowLabel}][frecuencia]`;
      freq.required = true;

      const freqPlaceholder = document.createElement("option");
      freqPlaceholder.value = "";
      freqPlaceholder.textContent = "Frecuencia: selecciona";
      freqPlaceholder.disabled = true;
      freqPlaceholder.selected = true;
      freq.appendChild(freqPlaceholder);

      frequencyOptions.forEach((option) => {
        const item = document.createElement("option");
        item.value = option;
        item.textContent = `Frecuencia: ${option}`;
        freq.appendChild(item);
      });

      const intensity = document.createElement("select");
      intensity.name = `${field.name}[${rowLabel}][intensidad]`;
      intensity.required = true;

      const intensityPlaceholder = document.createElement("option");
      intensityPlaceholder.value = "";
      intensityPlaceholder.textContent = "Intensidad: selecciona";
      intensityPlaceholder.disabled = true;
      intensityPlaceholder.selected = true;
      intensity.appendChild(intensityPlaceholder);

      intensityOptions.forEach((option) => {
        const item = document.createElement("option");
        item.value = option;
        item.textContent = `Intensidad: ${option}`;
        intensity.appendChild(item);
      });

      row.append(symptom, freq, intensity);
      matrix.appendChild(row);
    });

    wrap.appendChild(matrix);
    return wrap;
  }

  return wrap;
}

schema.forEach((section) => formContent.appendChild(createSection(section)));

const sections = Array.from(formContent.querySelectorAll(".section"));

function updateStepUI() {
  sections.forEach((section, index) => {
    section.hidden = index !== currentStep;
  });

  const total = sections.length;
  stepIndicator.textContent = `Paso ${currentStep + 1} de ${total}`;
  stepProgressBar.style.width = `${((currentStep + 1) / total) * 100}%`;

  prevBtn.disabled = currentStep === 0;
  const isLastStep = currentStep === total - 1;
  nextBtn.hidden = isLastStep;
  submitBtn.hidden = !isLastStep;
}

function getStepFields(stepIndex) {
  const section = sections[stepIndex];
  if (!section) return [];
  return Array.from(section.querySelectorAll("input, select, textarea"));
}

function validateStep(stepIndex) {
  const fields = getStepFields(stepIndex);
  let firstInvalid = null;
  let valid = true;

  fields.forEach((field) => {
    if (!field.checkValidity()) {
      valid = false;
      if (!firstInvalid) firstInvalid = field;
      if (field.closest(".field")) field.closest(".field").classList.add("is-invalid");
    } else if (field.closest(".field")) {
      field.closest(".field").classList.remove("is-invalid");
    }
  });

  if (!valid && firstInvalid) {
    firstInvalid.reportValidity();
    firstInvalid.focus();
    statusMessage.textContent = "Completa todos los campos del paso actual para continuar.";
  } else {
    statusMessage.textContent = "";
  }

  return valid;
}

nextBtn.addEventListener("click", () => {
  if (!validateStep(currentStep)) return;
  currentStep += 1;
  updateStepUI();
});

prevBtn.addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  statusMessage.textContent = "";
  updateStepUI();
});

document.addEventListener("keydown", (event) => {
  const targetTag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : "";
  if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") return;

  if (event.key === "ArrowRight" && !nextBtn.hidden) {
    nextBtn.click();
  }

  if (event.key === "ArrowLeft" && !prevBtn.disabled) {
    prevBtn.click();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateStep(currentStep)) return;

  statusMessage.textContent =
    "Formulario validado. El envío real está desactivado por ahora, pero los resultados se asociarán al correo indicado cuando se conecte el backend.";
});

updateStepUI();
