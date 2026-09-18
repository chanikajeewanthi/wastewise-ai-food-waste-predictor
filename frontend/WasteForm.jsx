// import { useState } from "react";

// const DAYS = [
//   { value: 0, label: "Mon" },
//   { value: 1, label: "Tue" },
//   { value: 2, label: "Wed" },
//   { value: 3, label: "Thu" },
//   { value: 4, label: "Fri" },
//   { value: 5, label: "Sat" },
//   { value: 6, label: "Sun" },
// ];

// const EXPERIENCE_LEVELS = ["beginner", "intermediate", "expert"];

// const WASTE_CATEGORIES = ["meat", "vegetables", "dairy", "grains"];

// const DEFAULT_FORM = {
//   meals_served: "220",
//   kitchen_staff: "12",
//   temperature_C: "26.5",
//   humidity_percent: "55",
//   day_of_week: 4,
//   special_event: 0,
//   past_waste_kg: "38.2",
//   staff_experience: "intermediate",
//   waste_category: "meat",
// };

// // Mirrors backend/schemas.py so the person gets an inline message before
// // the request ever leaves the browser.
// const NUMERIC_RULES = {
//   meals_served: { min: 1, max: 2000, label: "Meals served" },
//   kitchen_staff: { min: 1, max: 100, label: "Kitchen staff" },
//   temperature_C: { min: -10, max: 55, label: "Temperature" },
//   humidity_percent: { min: 0, max: 100, label: "Humidity" },
//   past_waste_kg: { min: 0, max: 500, label: "Past waste" },
// };

// function validate(form) {
//   const errors = {};
//   for (const [key, rule] of Object.entries(NUMERIC_RULES)) {
//     const value = Number(form[key]);
//     if (form[key] === "" || Number.isNaN(value)) {
//       errors[key] = `${rule.label} is required.`;
//     } else if (value < rule.min || value > rule.max) {
//       errors[key] = `${rule.label} must be between ${rule.min} and ${rule.max}.`;
//     }
//   }
//   return errors;
// }

// export default function WasteForm({ onSubmit, isLoading }) {
//   const [form, setForm] = useState(DEFAULT_FORM);
//   const [errors, setErrors] = useState({});

//   function update(key, value) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     if (errors[key]) {
//       setErrors((prev) => ({ ...prev, [key]: undefined }));
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const nextErrors = validate(form);
//     setErrors(nextErrors);
//     if (Object.keys(nextErrors).length > 0) return;

//     onSubmit({
//       meals_served: Number(form.meals_served),
//       kitchen_staff: Number(form.kitchen_staff),
//       temperature_C: Number(form.temperature_C),
//       humidity_percent: Number(form.humidity_percent),
//       day_of_week: Number(form.day_of_week),
//       special_event: Number(form.special_event),
//       past_waste_kg: Number(form.past_waste_kg),
//       staff_experience: form.staff_experience,
//       waste_category: form.waste_category,
//     });
//   }

//   return (
//     <form className="form-card" onSubmit={handleSubmit}>
//       <div className="field-group">
//         <h2 className="field-group-title">Today's service</h2>
//         <p className="field-group-hint">
//           Meal volume and staffing for the shift you're forecasting.
//         </p>

//         <div className="field-row">
//           <div className="field">
//             <label htmlFor="meals_served">
//               Meals served <span className="unit">(count)</span>
//             </label>
//             <input
//               id="meals_served"
//               type="number"
//               value={form.meals_served}
//               onChange={(e) => update("meals_served", e.target.value)}
//               className={errors.meals_served ? "field-error" : ""}
//             />
//             {errors.meals_served && (
//               <span className="field-error-text">{errors.meals_served}</span>
//             )}
//           </div>

//           <div className="field">
//             <label htmlFor="kitchen_staff">
//               Kitchen staff <span className="unit">(on duty)</span>
//             </label>
//             <input
//               id="kitchen_staff"
//               type="number"
//               value={form.kitchen_staff}
//               onChange={(e) => update("kitchen_staff", e.target.value)}
//               className={errors.kitchen_staff ? "field-error" : ""}
//             />
//             {errors.kitchen_staff && (
//               <span className="field-error-text">{errors.kitchen_staff}</span>
//             )}
//           </div>
//         </div>

//         <div className="field full">
//           <label>Day of week</label>
//           <div className="day-grid">
//             {DAYS.map((d) => (
//               <button
//                 type="button"
//                 key={d.value}
//                 className={`day-btn ${form.day_of_week === d.value ? "active" : ""}`}
//                 onClick={() => update("day_of_week", d.value)}
//               >
//                 {d.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="field-group">
//         <h2 className="field-group-title">Conditions</h2>
//         <p className="field-group-hint">
//           Kitchen environment and any scheduled event.
//         </p>

//         <div className="field-row">
//           <div className="field">
//             <label htmlFor="temperature_C">
//               Temperature <span className="unit">(°C)</span>
//             </label>
//             <input
//               id="temperature_C"
//               type="number"
//               step="0.1"
//               value={form.temperature_C}
//               onChange={(e) => update("temperature_C", e.target.value)}
//               className={errors.temperature_C ? "field-error" : ""}
//             />
//             {errors.temperature_C && (
//               <span className="field-error-text">{errors.temperature_C}</span>
//             )}
//           </div>

//           <div className="field">
//             <label htmlFor="humidity_percent">
//               Humidity <span className="unit">(%)</span>
//             </label>
//             <input
//               id="humidity_percent"
//               type="number"
//               step="0.1"
//               value={form.humidity_percent}
//               onChange={(e) => update("humidity_percent", e.target.value)}
//               className={errors.humidity_percent ? "field-error" : ""}
//             />
//             {errors.humidity_percent && (
//               <span className="field-error-text">{errors.humidity_percent}</span>
//             )}
//           </div>
//         </div>

//         <div className="field full">
//           <label>Special event today</label>
//           <div className="toggle-row">
//             <button
//               type="button"
//               className={`toggle-btn ${form.special_event === 0 ? "active" : ""}`}
//               onClick={() => update("special_event", 0)}
//             >
//               No — regular service
//             </button>
//             <button
//               type="button"
//               className={`toggle-btn ${form.special_event === 1 ? "active" : ""}`}
//               onClick={() => update("special_event", 1)}
//             >
//               Yes — special event
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="field-group">
//         <h2 className="field-group-title">History &amp; menu</h2>
//         <p className="field-group-hint">
//           Recent waste trend and what's being served.
//         </p>

//         <div className="field-row">
//           <div className="field">
//             <label htmlFor="past_waste_kg">
//               Past waste <span className="unit">(kg, last comparable day)</span>
//             </label>
//             <input
//               id="past_waste_kg"
//               type="number"
//               step="0.1"
//               value={form.past_waste_kg}
//               onChange={(e) => update("past_waste_kg", e.target.value)}
//               className={errors.past_waste_kg ? "field-error" : ""}
//             />
//             {errors.past_waste_kg && (
//               <span className="field-error-text">{errors.past_waste_kg}</span>
//             )}
//           </div>

//           <div className="field">
//             <label htmlFor="waste_category">Primary waste category</label>
//             <select
//               id="waste_category"
//               value={form.waste_category}
//               onChange={(e) => update("waste_category", e.target.value)}
//             >
//               {WASTE_CATEGORIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c.charAt(0).toUpperCase() + c.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="field full">
//           <label>Staff experience level</label>
//           <div className="toggle-row">
//             {EXPERIENCE_LEVELS.map((level) => (
//               <button
//                 type="button"
//                 key={level}
//                 className={`toggle-btn ${form.staff_experience === level ? "active" : ""}`}
//                 onClick={() => update("staff_experience", level)}
//               >
//                 {level.charAt(0).toUpperCase() + level.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="submit-row">
//         <button type="submit" className="submit-btn" disabled={isLoading}>
//           {isLoading ? "Forecasting…" : "Forecast waste"}
//         </button>
//         <span className="submit-note">Sends to the backend at :8000/predict</span>
//       </div>
//     </form>
//   );
// }


import { useState } from "react";

const DAYS = [
  { value: 0, label: "Mon" },
  { value: 1, label: "Tue" },
  { value: 2, label: "Wed" },
  { value: 3, label: "Thu" },
  { value: 4, label: "Fri" },
  { value: 5, label: "Sat" },
  { value: 6, label: "Sun" },
];

const EXPERIENCE_LEVELS = [
  "beginner",
  "intermediate",
  "expert",
];

const WASTE_CATEGORIES = [
  "meat",
  "vegetables",
  "dairy",
  "grains",
];

const DEFAULT_FORM = {
  meals_served: "220",
  kitchen_staff: "12",
  temperature_C: "26.5",
  humidity_percent: "55",
  day_of_week: 4,
  special_event: 0,
  past_waste_kg: "38.2",
  staff_experience: "intermediate",
  waste_category: "meat",
};

const NUMERIC_RULES = {
  meals_served: {
    min: 1,
    max: 2000,
    label: "Meals served",
  },
  kitchen_staff: {
    min: 1,
    max: 100,
    label: "Kitchen staff",
  },
  temperature_C: {
    min: -10,
    max: 55,
    label: "Temperature",
  },
  humidity_percent: {
    min: 0,
    max: 100,
    label: "Humidity",
  },
  past_waste_kg: {
    min: 0,
    max: 500,
    label: "Past waste",
  },
};

function validate(form) {
  const errors = {};

  for (const [key, rule] of Object.entries(NUMERIC_RULES)) {
    const value = Number(form[key]);

    if (form[key] === "" || Number.isNaN(value)) {
      errors[key] = `${rule.label} is required.`;
    } else if (value < rule.min || value > rule.max) {
      errors[key] =
        `${rule.label} must be between ${rule.min} and ${rule.max}.`;
    }
  }

  return errors;
}

function FieldIcon({ type }) {
  const icons = {
    meals: "▦",
    staff: "♙",
    temperature: "°",
    humidity: "◌",
    waste: "♻",
    menu: "◈",
  };

  return <span className="field-icon">{icons[type]}</span>;
}

export default function WasteForm({
  onSubmit,
  isLoading,
}) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  function update(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      meals_served: Number(form.meals_served),
      kitchen_staff: Number(form.kitchen_staff),
      temperature_C: Number(form.temperature_C),
      humidity_percent: Number(form.humidity_percent),
      day_of_week: Number(form.day_of_week),
      special_event: Number(form.special_event),
      past_waste_kg: Number(form.past_waste_kg),
      staff_experience: form.staff_experience,
      waste_category: form.waste_category,
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-card-heading">
        <div>
          <span className="panel-kicker">INPUT DATA</span>
          <h2>Service details</h2>
        </div>

        <div className="step-badge">01</div>
      </div>

      <div className="form-section">
        <div className="field-group-heading">
          <span className="section-number">01</span>
          <div>
            <h3>Today's service</h3>
            <p>
              Tell us about your expected cafeteria activity.
            </p>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="meals_served">
              Meals served
            </label>

            <div className="input-wrapper">
              <FieldIcon type="meals" />
              <input
                id="meals_served"
                type="number"
                value={form.meals_served}
                onChange={(e) =>
                  update("meals_served", e.target.value)
                }
              />
              <span className="input-unit">meals</span>
            </div>

            {errors.meals_served && (
              <span className="field-error-text">
                {errors.meals_served}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="kitchen_staff">
              Kitchen staff
            </label>

            <div className="input-wrapper">
              <FieldIcon type="staff" />
              <input
                id="kitchen_staff"
                type="number"
                value={form.kitchen_staff}
                onChange={(e) =>
                  update("kitchen_staff", e.target.value)
                }
              />
              <span className="input-unit">staff</span>
            </div>

            {errors.kitchen_staff && (
              <span className="field-error-text">
                {errors.kitchen_staff}
              </span>
            )}
          </div>
        </div>

        <div className="field full">
          <label>Day of week</label>

          <div className="day-grid">
            {DAYS.map((day) => (
              <button
                type="button"
                key={day.value}
                className={`day-btn ${
                  form.day_of_week === day.value
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  update("day_of_week", day.value)
                }
              >
                <span>{day.label.charAt(0)}</span>
                <small>{day.label.slice(1)}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="field-group-heading">
          <span className="section-number">02</span>
          <div>
            <h3>Environment</h3>
            <p>
              Current kitchen conditions can affect waste.
            </p>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="temperature_C">
              Temperature
            </label>

            <div className="input-wrapper">
              <FieldIcon type="temperature" />
              <input
                id="temperature_C"
                type="number"
                step="0.1"
                value={form.temperature_C}
                onChange={(e) =>
                  update("temperature_C", e.target.value)
                }
              />
              <span className="input-unit">°C</span>
            </div>

            {errors.temperature_C && (
              <span className="field-error-text">
                {errors.temperature_C}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="humidity_percent">
              Humidity
            </label>

            <div className="input-wrapper">
              <FieldIcon type="humidity" />
              <input
                id="humidity_percent"
                type="number"
                step="0.1"
                value={form.humidity_percent}
                onChange={(e) =>
                  update(
                    "humidity_percent",
                    e.target.value
                  )
                }
              />
              <span className="input-unit">%</span>
            </div>

            {errors.humidity_percent && (
              <span className="field-error-text">
                {errors.humidity_percent}
              </span>
            )}
          </div>
        </div>

        <div className="field full">
          <label>Special event today</label>

          <div className="segmented-control">
            <button
              type="button"
              className={
                form.special_event === 0 ? "active" : ""
              }
              onClick={() => update("special_event", 0)}
            >
              <span>○</span>
              Regular service
            </button>

            <button
              type="button"
              className={
                form.special_event === 1 ? "active" : ""
              }
              onClick={() => update("special_event", 1)}
            >
              <span>✦</span>
              Special event
            </button>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="field-group-heading">
          <span className="section-number">03</span>
          <div>
            <h3>History & menu</h3>
            <p>
              Add context from previous service and today's menu.
            </p>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="past_waste_kg">
              Past waste
            </label>

            <div className="input-wrapper">
              <FieldIcon type="waste" />
              <input
                id="past_waste_kg"
                type="number"
                step="0.1"
                value={form.past_waste_kg}
                onChange={(e) =>
                  update("past_waste_kg", e.target.value)
                }
              />
              <span className="input-unit">kg</span>
            </div>

            {errors.past_waste_kg && (
              <span className="field-error-text">
                {errors.past_waste_kg}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="waste_category">
              Main food category
            </label>

            <div className="select-wrapper">
              <FieldIcon type="menu" />

              <select
                id="waste_category"
                value={form.waste_category}
                onChange={(e) =>
                  update("waste_category", e.target.value)
                }
              >
                {WASTE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field full">
          <label>Staff experience</label>

          <div className="experience-grid">
            {EXPERIENCE_LEVELS.map((level, index) => (
              <button
                type="button"
                key={level}
                className={
                  form.staff_experience === level
                    ? "active"
                    : ""
                }
                onClick={() =>
                  update("staff_experience", level)
                }
              >
                <span>0{index + 1}</span>
                {level.charAt(0).toUpperCase() +
                  level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="submit-area">
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="button-spinner" />
              Analyzing...
            </>
          ) : (
            <>
              <span>Generate AI forecast</span>
              <strong>→</strong>
            </>
          )}
        </button>

        <div className="secure-note">
          <span>✓</span>
          Your data is processed securely
        </div>
      </div>
    </form>
  );
}