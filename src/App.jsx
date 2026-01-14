import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ============================================
// CONFIGURACIÓN SUPABASE
// ============================================
const SUPABASE_URL = 'https://edhyacacepvfvjuwfzrp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaHlhY2FjZXB2ZnZqdXdmenJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNzU4MTUsImV4cCI6MjA4Mzk1MTgxNX0.9M1Cs9OZi5FIzSKuzw5nT3H2Dq8PCoG1g2Xy6rlhQm0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// PALETA DE COLORES CORPORATIVOS YLIO
// ============================================
const COLOR_CORP_DARK = "#3B3B3B";
const COLOR_CORP = "#EB6221";
const COLOR_CORP_LIGHT = "#FFAC3E";
const COLOR_CORP_BG = "#FEF6EE";
const COLOR_BG = "#FFFFFF";
const COLOR_BG_SECONDARY = "#F5F5F5";
const COLOR_TEXT = "#3B3B3B";
const COLOR_TEXT_LIGHT = "#6C757D";
const COLOR_SUCCESS = "#28A745";
const COLOR_WARNING = "#FFAC3E";
const COLOR_DANGER = "#DC3545";

// ============================================
// PASOS DEL WIZARD
// ============================================
const PASOS = [
  { id: 1, nombre: 'Proyecto', icono: '📋' },
  { id: 2, nombre: 'Tarifa', icono: '💰' },
  { id: 3, nombre: 'Situación Actual', icono: '🏭' },
  { id: 4, nombre: 'Propuesta', icono: '☀️' },
];

// ============================================
// PROVINCIAS Y COMUNIDADES
// ============================================
const PROVINCIAS_COMUNIDADES = {
  'Álava': 'País Vasco', 'Albacete': 'Castilla-La Mancha', 'Alicante': 'Comunidad Valenciana',
  'Almería': 'Andalucía', 'Asturias': 'Principado de Asturias', 'Ávila': 'Castilla y León',
  'Badajoz': 'Extremadura', 'Barcelona': 'Cataluña', 'Burgos': 'Castilla y León',
  'Cáceres': 'Extremadura', 'Cádiz': 'Andalucía', 'Cantabria': 'Cantabria',
  'Castellón': 'Comunidad Valenciana', 'Ciudad Real': 'Castilla-La Mancha', 'Córdoba': 'Andalucía',
  'Cuenca': 'Castilla-La Mancha', 'Gerona': 'Cataluña', 'Granada': 'Andalucía',
  'Guadalajara': 'Castilla-La Mancha', 'Guipúzcoa': 'País Vasco', 'Huelva': 'Andalucía',
  'Huesca': 'Aragón', 'Islas Baleares': 'Islas Baleares', 'Jaén': 'Andalucía',
  'La Coruña': 'Galicia', 'La Rioja': 'La Rioja', 'Las Palmas': 'Canarias',
  'León': 'Castilla y León', 'Lérida': 'Cataluña', 'Lugo': 'Galicia',
  'Madrid': 'Comunidad de Madrid', 'Málaga': 'Andalucía', 'Murcia': 'Región de Murcia',
  'Navarra': 'Comunidad Foral de Navarra', 'Orense': 'Galicia', 'Palencia': 'Castilla y León',
  'Pontevedra': 'Galicia', 'Salamanca': 'Castilla y León', 'Santa Cruz de Tenerife': 'Canarias',
  'Segovia': 'Castilla y León', 'Sevilla': 'Andalucía', 'Soria': 'Castilla y León',
  'Tarragona': 'Cataluña', 'Teruel': 'Aragón', 'Toledo': 'Castilla-La Mancha',
  'Valencia': 'Comunidad Valenciana', 'Valladolid': 'Castilla y León', 'Vizcaya': 'País Vasco',
  'Zamora': 'Castilla y León', 'Zaragoza': 'Aragón', 'Ceuta': 'Ceuta', 'Melilla': 'Melilla'
};

const PROVINCIAS = Object.keys(PROVINCIAS_COMUNIDADES).sort();

// ============================================
// DATOS INICIALES OFERTA
// ============================================
const OFERTA_INICIAL = {
  // Paso 1 - Proyecto
  archivo_sips: '',
  fuente_datos_consumo: '',
  archivo_consumo: '',
  oferta_id: '',
  oferta_denominacion: '',
  oferta_version: 1,
  oferta_descripcion_version: 'Versión inicial',
  oferta_fecha_solicitud: new Date().toISOString().split('T')[0],
  oferta_fecha_inicio: '',
  cliente_denominacion: '',
  cliente_razon_social: '',
  cliente_cif: '',
  cliente_cnae: '',
  proyecto_direccion: '',
  proyecto_cp: '',
  proyecto_municipio: '',
  proyecto_provincia: '',
  proyecto_comunidad: '',
  proyecto_pais: 'España',
  proyecto_latitud: '',
  proyecto_longitud: '',
  proyecto_coordenada_x: '',
  proyecto_coordenada_y: '',
  proyecto_huso: '',
  proyecto_referencia_catastral: '',
  sips_cups: '',
  sips_distribuidora: '',
  sips_tarifa: '',
  sips_tension: '',
  sips_potencia_max_bie: '',
  sips_derechos_extension: '',
  sips_derechos_acceso: '',
  sips_potencia_p1: '', sips_potencia_p2: '', sips_potencia_p3: '',
  sips_potencia_p4: '', sips_potencia_p5: '', sips_potencia_p6: '',
  sips_consumo_anual: '',
  sips_consumo_p1: '', sips_consumo_p2: '', sips_consumo_p3: '',
  sips_consumo_p4: '', sips_consumo_p5: '', sips_consumo_p6: '',
  // Paso 2 - Tarifa
  cups: '',
  tarifa_acceso: '',
  distribuidora: '',
  comercializadora: '',
  tension: '',
  potencia_max_bie: '',
  derechos_extension: '',
  derechos_acceso: '',
  potencia_p1: '', potencia_p2: '', potencia_p3: '',
  potencia_p4: '', potencia_p5: '', potencia_p6: '',
  tipo_precios_potencia: '',
  precio_potencia_p1: '', precio_potencia_p2: '', precio_potencia_p3: '',
  precio_potencia_p4: '', precio_potencia_p5: '', precio_potencia_p6: '',
  tipo_contrato_elec: '',
  tipo_precios_energia: '',
  precio_energia_p1: '', precio_energia_p2: '', precio_energia_p3: '',
  precio_energia_p4: '', precio_energia_p5: '', precio_energia_p6: '',
  bonificacion_iee: 0,
  coste_alquiler_contador: '',
  // Paso 3 - Situación Actual
  fv_existente: 'no',
  fv_existente_modalidad_autoconsumo: '',
  fv_existente_potencia_max_vertido: '',
  almac_existente: 'no',
  fv_existente_potencia_pico: '',
  fv_existente_potencia_nominal: '',
  fv_existente_ratio_dcac: '',
  fv_existente_archivo_produccion_real: '',
  fv_existente_archivo_produccion_simulado: '',
  fv_existente_produccion_anual_estimada: '',
  fv_existente_produccion_anual_real: '',
  fv_existente_ratio_produccion: '',
  almac_existente_capacidad: '',
  almac_existente_potencia: '',
  // Paso 4 - Propuesta
  oferta_fv: true,
  oferta_bateria: false,
  base_oferta_num_mod: '',
  base_oferta_potencia_pico: '',
  base_oferta_potencia_nominal: '',
  base_oferta_ratio_dcac: '',
  base_oferta_prod_fv_fuente: '',
  base_oferta_prod_fv_tipo_fichero: '',
};

// ============================================
// LOGO YLIO SVG
// ============================================
const YlioLogo = ({ width = 200 }) => (
  <svg width={width} viewBox="0 0 672 253" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M118.109 144.238C106.881 144.238 97.0028 147.498 88.4878 153.995C79.9491 160.517 73.5765 169.914 69.3464 182.21L67.0753 189.331L62.8926 176.498C59.1373 165.015 53.0994 156.216 44.7506 150.045C36.426 143.897 26.6669 140.801 15.5089 140.801L0 140.825L48.8599 252.338H83.7294L108.333 189.331L132.914 252.338H167.807L216.667 140.825L201.158 140.801C190 140.801 180.241 143.897 171.916 150.045C163.568 156.216 157.529 165.015 153.774 176.498L149.592 189.331L147.32 182.21C143.09 169.914 136.718 160.517 128.179 153.995C119.664 147.498 109.786 144.238 98.5578 144.238" fill="#EB6221"/>
    <path d="M253.004 0L219.503 85.7878H256.495L290.043 0H253.004Z" fill="#FFAC3E"/>
    <path d="M406.661 188.047H342.886V252.291H406.661V188.047Z" fill="#EB6221"/>
    <path d="M342.886 0.493652V156.498H406.661V0.493652H342.886Z" fill="#3B3B3B"/>
    <path d="M476.498 64.2849C458.488 64.2849 443.358 70.2374 431.18 82.0715C418.978 93.9293 412.889 108.597 412.889 126.221V252.291H476.665V143.728C476.665 138.555 478.439 134.186 481.963 130.595C485.487 127.027 489.79 125.231 494.896 125.231C500.002 125.231 504.305 127.027 507.829 130.595C511.353 134.186 513.127 138.555 513.127 143.728V252.291H576.903V126.221C576.903 108.597 570.813 93.9293 558.611 82.0715C546.433 70.2374 531.303 64.2849 513.294 64.2849C500.216 64.2849 488.393 67.7806 477.754 74.7247C477.137 74.1329 476.783 73.8488 476.498 73.5765V64.2849Z" fill="#3B3B3B"/>
    <path d="M671.693 158.271C671.693 132.7 663.011 110.887 645.672 92.7634C628.309 74.6634 606.945 65.6016 581.507 65.6016V126.291C591.076 126.291 599.225 129.763 605.981 136.66C612.713 143.579 616.091 151.871 616.091 161.543C616.091 171.214 612.713 179.506 605.981 186.426C599.225 193.322 591.076 196.794 581.507 196.794V196.771V252.373C606.945 252.373 628.309 243.311 645.672 225.211C663.011 207.088 671.693 185.274 671.693 159.703V158.271Z" fill="#EB6221"/>
    <path d="M581.508 126.289V65.5996C555.856 65.5996 534.302 74.6614 516.963 92.7614C499.6 110.885 490.918 132.698 490.918 158.269V159.701C490.918 185.272 499.6 207.086 516.963 225.209C534.302 243.309 555.856 252.371 581.508 252.371V196.769C571.725 196.769 563.385 193.296 556.463 186.4C549.564 179.48 546.115 171.188 546.115 161.541C546.115 151.869 549.564 143.577 556.463 136.658C563.385 129.761 571.725 126.289 581.508 126.289Z" fill="#3B3B3B"/>
  </svg>
);

// ============================================
// COMPONENTES UI REUTILIZABLES
// ============================================

const Card = ({ children, title, icon, style = {} }) => (
  <div style={{
    backgroundColor: COLOR_BG,
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    ...style
  }}>
    {title && (
      <h3 style={{ 
        margin: '0 0 16px 0', 
        fontSize: '16px', 
        fontWeight: '600', 
        color: COLOR_CORP,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {icon && <span>{icon}</span>}
        {title}
      </h3>
    )}
    {children}
  </div>
);

const FormField = ({ label, children, required = false, hint = null }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ 
      display: 'block', 
      marginBottom: '6px', 
      fontSize: '13px', 
      fontWeight: '500', 
      color: COLOR_TEXT 
    }}>
      {label} {required && <span style={{ color: COLOR_DANGER }}>*</span>}
    </label>
    {children}
    {hint && (
      <span style={{ fontSize: '11px', color: COLOR_TEXT_LIGHT, marginTop: '4px', display: 'block' }}>
        {hint}
      </span>
    )}
  </div>
);

const Input = ({ type = 'text', value, onChange, placeholder, disabled = false, style = {} }) => (
  <input
    type={type}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #DEE2E6',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: disabled ? '#F8F9FA' : COLOR_BG,
      color: COLOR_TEXT,
      boxSizing: 'border-box',
      ...style
    }}
  />
);

const Select = ({ value, onChange, options, placeholder = 'Seleccionar...', disabled = false }) => (
  <select
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    style={{
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #DEE2E6',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: disabled ? '#F8F9FA' : COLOR_BG,
      color: COLOR_TEXT,
      cursor: 'pointer'
    }}
  >
    <option value="">{placeholder}</option>
    {options.map(opt => (
      <option key={opt.value || opt} value={opt.value || opt}>
        {opt.label || opt}
      </option>
    ))}
  </select>
);

const Button = ({ children, onClick, variant = 'primary', disabled = false, style = {} }) => {
  const variants = {
    primary: { bg: COLOR_CORP, color: 'white', border: 'none' },
    secondary: { bg: 'white', color: COLOR_TEXT, border: `1px solid #DEE2E6` },
    success: { bg: COLOR_SUCCESS, color: 'white', border: 'none' },
    danger: { bg: COLOR_DANGER, color: 'white', border: 'none' },
  };
  const v = variants[variant];
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        backgroundColor: disabled ? '#CCC' : v.bg,
        color: v.color,
        border: v.border,
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        ...style
      }}
    >
      {children}
    </button>
  );
};

const Grid = ({ children, cols = 2, gap = '16px' }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: gap
  }}>
    {children}
  </div>
);

// ============================================
// PASO 1: PROYECTO
// ============================================

const Paso1Proyecto = ({ datos, onChange }) => {
  
  const handleChange = (campo, valor) => {
    const nuevosDatos = { ...datos, [campo]: valor };
    
    // Auto-calcular comunidad según provincia
    if (campo === 'proyecto_provincia' && PROVINCIAS_COMUNIDADES[valor]) {
      nuevosDatos.proyecto_comunidad = PROVINCIAS_COMUNIDADES[valor];
    }
    
    onChange(nuevosDatos);
  };

  return (
    <div>
      {/* Identificación del Proyecto */}
      <Card title="Identificación del Proyecto" icon="📋">
        <Grid cols={3}>
          <FormField label="ID Oferta" required hint="Formato: 10xxx">
            <Input 
              value={datos.oferta_id} 
              onChange={(v) => handleChange('oferta_id', v)}
              placeholder="10001"
            />
          </FormField>
          <FormField label="Denominación Oferta">
            <Input 
              value={datos.oferta_denominacion} 
              onChange={(v) => handleChange('oferta_denominacion', v)}
              placeholder="Nombre del proyecto"
            />
          </FormField>
          <FormField label="Versión">
            <Input 
              type="number"
              value={datos.oferta_version} 
              onChange={(v) => handleChange('oferta_version', parseInt(v) || 1)}
            />
          </FormField>
        </Grid>
        <Grid cols={2}>
          <FormField label="Descripción Versión">
            <Input 
              value={datos.oferta_descripcion_version} 
              onChange={(v) => handleChange('oferta_descripcion_version', v)}
            />
          </FormField>
          <Grid cols={2}>
            <FormField label="Fecha Solicitud">
              <Input 
                type="date"
                value={datos.oferta_fecha_solicitud} 
                onChange={(v) => handleChange('oferta_fecha_solicitud', v)}
              />
            </FormField>
            <FormField label="Fecha Inicio">
              <Input 
                type="date"
                value={datos.oferta_fecha_inicio} 
                onChange={(v) => handleChange('oferta_fecha_inicio', v)}
              />
            </FormField>
          </Grid>
        </Grid>
      </Card>

      {/* Datos del Cliente */}
      <Card title="Datos del Cliente" icon="👤">
        <Grid cols={2}>
          <FormField label="Denominación" hint="Nombre interno YLIO">
            <Input 
              value={datos.cliente_denominacion} 
              onChange={(v) => handleChange('cliente_denominacion', v)}
              placeholder="Nombre comercial"
            />
          </FormField>
          <FormField label="Razón Social">
            <Input 
              value={datos.cliente_razon_social} 
              onChange={(v) => handleChange('cliente_razon_social', v)}
              placeholder="Razón social completa"
            />
          </FormField>
        </Grid>
        <Grid cols={2}>
          <FormField label="CIF">
            <Input 
              value={datos.cliente_cif} 
              onChange={(v) => handleChange('cliente_cif', v)}
              placeholder="B12345678"
            />
          </FormField>
          <FormField label="CNAE">
            <Input 
              value={datos.cliente_cnae} 
              onChange={(v) => handleChange('cliente_cnae', v)}
              placeholder="1234"
            />
          </FormField>
        </Grid>
      </Card>

      {/* Ubicación del Proyecto */}
      <Card title="Ubicación del Proyecto" icon="📍">
        <FormField label="Dirección">
          <Input 
            value={datos.proyecto_direccion} 
            onChange={(v) => handleChange('proyecto_direccion', v)}
            placeholder="Calle, número, etc."
          />
        </FormField>
        <Grid cols={4}>
          <FormField label="Código Postal">
            <Input 
              value={datos.proyecto_cp} 
              onChange={(v) => handleChange('proyecto_cp', v)}
              placeholder="41001"
            />
          </FormField>
          <FormField label="Municipio">
            <Input 
              value={datos.proyecto_municipio} 
              onChange={(v) => handleChange('proyecto_municipio', v)}
              placeholder="Sevilla"
            />
          </FormField>
          <FormField label="Provincia">
            <Select 
              value={datos.proyecto_provincia}
              onChange={(v) => handleChange('proyecto_provincia', v)}
              options={PROVINCIAS}
              placeholder="Seleccionar..."
            />
          </FormField>
          <FormField label="Comunidad Autónoma">
            <Input 
              value={datos.proyecto_comunidad} 
              disabled
              placeholder="Automático"
            />
          </FormField>
        </Grid>
        <Grid cols={4}>
          <FormField label="Latitud">
            <Input 
              type="number"
              value={datos.proyecto_latitud} 
              onChange={(v) => handleChange('proyecto_latitud', v)}
              placeholder="37.3891"
            />
          </FormField>
          <FormField label="Longitud">
            <Input 
              type="number"
              value={datos.proyecto_longitud} 
              onChange={(v) => handleChange('proyecto_longitud', v)}
              placeholder="-5.9845"
            />
          </FormField>
          <FormField label="Coordenada X (UTM)">
            <Input 
              type="number"
              value={datos.proyecto_coordenada_x} 
              onChange={(v) => handleChange('proyecto_coordenada_x', v)}
            />
          </FormField>
          <FormField label="Coordenada Y (UTM)">
            <Input 
              type="number"
              value={datos.proyecto_coordenada_y} 
              onChange={(v) => handleChange('proyecto_coordenada_y', v)}
            />
          </FormField>
        </Grid>
        <Grid cols={2}>
          <FormField label="Huso UTM">
            <Select 
              value={datos.proyecto_huso}
              onChange={(v) => handleChange('proyecto_huso', v)}
              options={[
                { value: '29', label: '29' },
                { value: '30', label: '30' },
                { value: '31', label: '31' },
              ]}
            />
          </FormField>
          <FormField label="Referencia Catastral" hint="20 caracteres">
            <Input 
              value={datos.proyecto_referencia_catastral} 
              onChange={(v) => handleChange('proyecto_referencia_catastral', v)}
              placeholder="1234567890123456789A"
            />
          </FormField>
        </Grid>
      </Card>

      {/* Datos SIPS */}
      <Card title="Datos SIPS (precargados)" icon="📄">
        <div style={{ 
          padding: '12px', 
          backgroundColor: COLOR_CORP_BG, 
          borderRadius: '8px', 
          marginBottom: '16px',
          fontSize: '13px',
          color: COLOR_TEXT_LIGHT
        }}>
          ℹ️ Estos datos se cargan automáticamente desde el archivo SIPS
        </div>
        <Grid cols={3}>
          <FormField label="CUPS">
            <Input 
              value={datos.sips_cups} 
              onChange={(v) => handleChange('sips_cups', v)}
              placeholder="ES00..."
            />
          </FormField>
          <FormField label="Distribuidora">
            <Input 
              value={datos.sips_distribuidora} 
              onChange={(v) => handleChange('sips_distribuidora', v)}
            />
          </FormField>
          <FormField label="Tarifa">
            <Input 
              value={datos.sips_tarifa} 
              onChange={(v) => handleChange('sips_tarifa', v)}
              placeholder="3.0TD"
            />
          </FormField>
        </Grid>
        <Grid cols={4}>
          <FormField label="Tensión">
            <Input 
              value={datos.sips_tension} 
              onChange={(v) => handleChange('sips_tension', v)}
            />
          </FormField>
          <FormField label="Potencia Máx BIE (kW)">
            <Input 
              type="number"
              value={datos.sips_potencia_max_bie} 
              onChange={(v) => handleChange('sips_potencia_max_bie', v)}
            />
          </FormField>
          <FormField label="Derechos Extensión (€)">
            <Input 
              type="number"
              value={datos.sips_derechos_extension} 
              onChange={(v) => handleChange('sips_derechos_extension', v)}
            />
          </FormField>
          <FormField label="Derechos Acceso (€)">
            <Input 
              type="number"
              value={datos.sips_derechos_acceso} 
              onChange={(v) => handleChange('sips_derechos_acceso', v)}
            />
          </FormField>
        </Grid>
        
        <h4 style={{ margin: '20px 0 12px', fontSize: '14px', color: COLOR_TEXT }}>Potencias Contratadas (kW)</h4>
        <Grid cols={6}>
          {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(p => (
            <FormField key={p} label={p}>
              <Input 
                type="number"
                value={datos[`sips_potencia_${p.toLowerCase()}`]} 
                onChange={(v) => handleChange(`sips_potencia_${p.toLowerCase()}`, v)}
              />
            </FormField>
          ))}
        </Grid>

        <h4 style={{ margin: '20px 0 12px', fontSize: '14px', color: COLOR_TEXT }}>Consumos por Periodo (kWh)</h4>
        <Grid cols={7}>
          <FormField label="Anual">
            <Input 
              type="number"
              value={datos.sips_consumo_anual} 
              onChange={(v) => handleChange('sips_consumo_anual', v)}
            />
          </FormField>
          {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(p => (
            <FormField key={p} label={p}>
              <Input 
                type="number"
                value={datos[`sips_consumo_${p.toLowerCase()}`]} 
                onChange={(v) => handleChange(`sips_consumo_${p.toLowerCase()}`, v)}
              />
            </FormField>
          ))}
        </Grid>
      </Card>

      {/* Carga de Archivos */}
      <Card title="Carga de Archivos" icon="📁">
        <Grid cols={3}>
          <FormField label="Archivo SIPS">
            <Input 
              value={datos.archivo_sips} 
              onChange={(v) => handleChange('archivo_sips', v)}
              placeholder="Nombre archivo..."
            />
          </FormField>
          <FormField label="Fuente Datos Consumo">
            <Select 
              value={datos.fuente_datos_consumo}
              onChange={(v) => handleChange('fuente_datos_consumo', v)}
              options={[
                { value: 'real_distribuidora', label: 'Real - Distribuidora' },
                { value: 'real_monitorizacion', label: 'Real - Monitorización' },
                { value: 'curva_perfilada', label: 'Curva Perfilada' },
                { value: 'simulado', label: 'Simulado' },
              ]}
            />
          </FormField>
          <FormField label="Archivo Consumo">
            <Input 
              value={datos.archivo_consumo} 
              onChange={(v) => handleChange('archivo_consumo', v)}
              placeholder="Nombre archivo..."
            />
          </FormField>
        </Grid>
      </Card>
    </div>
  );
};

// ============================================
// PASOS 2, 3, 4 - PLACEHOLDER
// ============================================

const Paso2Tarifa = ({ datos, onChange }) => (
  <Card title="Paso 2: Tarifa" icon="💰">
    <div style={{ padding: '60px', textAlign: 'center', color: COLOR_TEXT_LIGHT }}>
      <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🚧</span>
      <h3 style={{ color: COLOR_TEXT, marginBottom: '10px' }}>En desarrollo</h3>
      <p>Este paso se implementará próximamente</p>
    </div>
  </Card>
);

const Paso3SituacionActual = ({ datos, onChange }) => (
  <Card title="Paso 3: Situación Actual" icon="🏭">
    <div style={{ padding: '60px', textAlign: 'center', color: COLOR_TEXT_LIGHT }}>
      <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🚧</span>
      <h3 style={{ color: COLOR_TEXT, marginBottom: '10px' }}>En desarrollo</h3>
      <p>Este paso se implementará próximamente</p>
    </div>
  </Card>
);

const Paso4Propuesta = ({ datos, onChange }) => (
  <Card title="Paso 4: Propuesta" icon="☀️">
    <div style={{ padding: '60px', textAlign: 'center', color: COLOR_TEXT_LIGHT }}>
      <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🚧</span>
      <h3 style={{ color: COLOR_TEXT, marginBottom: '10px' }}>En desarrollo</h3>
      <p>Este paso se implementará próximamente</p>
    </div>
  </Card>
);

// ============================================
// PANTALLA DE INICIO
// ============================================

const PantallaInicio = ({ onNuevaOferta, onAbrirOferta, ofertas, cargando }) => (
  <div style={{ 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: COLOR_BG_SECONDARY
  }}>
    <YlioLogo width={300} />
    <h1 style={{ 
      marginTop: '30px', 
      fontSize: '28px', 
      fontWeight: '700', 
      color: COLOR_TEXT 
    }}>
      Sistema de Ofertas
    </h1>
    <p style={{ 
      marginTop: '10px', 
      fontSize: '16px', 
      color: COLOR_TEXT_LIGHT,
      marginBottom: '40px'
    }}>
      Gestión integral de proyectos fotovoltaicos
    </p>

    <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
      <Button onClick={onNuevaOferta} style={{ padding: '16px 32px', fontSize: '16px' }}>
        ➕ Nueva Oferta
      </Button>
    </div>

    {/* Lista de ofertas existentes */}
    <Card title="Ofertas Recientes" icon="📋" style={{ width: '100%', maxWidth: '800px' }}>
      {cargando ? (
        <div style={{ textAlign: 'center', padding: '20px', color: COLOR_TEXT_LIGHT }}>
          ⏳ Cargando ofertas...
        </div>
      ) : ofertas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: COLOR_TEXT_LIGHT }}>
          No hay ofertas todavía. ¡Crea la primera!
        </div>
      ) : (
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {ofertas.map(oferta => (
            <div 
              key={oferta.oferta_id}
              onClick={() => onAbrirOferta(oferta)}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #EEE',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLOR_CORP_BG}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div>
                <span style={{ fontWeight: '600', color: COLOR_CORP }}>{oferta.oferta_id}</span>
                <span style={{ marginLeft: '12px', color: COLOR_TEXT }}>
                  {oferta.oferta_denominacion || 'Sin nombre'}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: COLOR_TEXT_LIGHT }}>
                {oferta.cliente_denominacion || 'Sin cliente'}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  </div>
);

// ============================================
// APLICACIÓN PRINCIPAL
// ============================================

export default function App() {
  // Estado de la aplicación
  const [pantalla, setPantalla] = useState('inicio');
  const [pasoActual, setPasoActual] = useState(1);
  const [datos, setDatos] = useState({ ...OFERTA_INICIAL });
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [conexionOk, setConexionOk] = useState(false);

  // Cargar ofertas al iniciar
  useEffect(() => {
    cargarOfertas();
  }, []);

  // Mostrar mensaje temporal
  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 4000);
  };

  // ============================================
  // FUNCIONES SUPABASE
  // ============================================

  const cargarOfertas = async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('ofertas')
        .select('oferta_id, oferta_denominacion, cliente_denominacion, fecha_creacion')
        .order('fecha_creacion', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      setOfertas(data || []);
      setConexionOk(true);
    } catch (error) {
      console.error('Error cargando ofertas:', error);
      mostrarMensaje('Error al conectar con la base de datos: ' + error.message, 'error');
      setConexionOk(false);
    } finally {
      setCargando(false);
    }
  };

  const cargarOferta = async (ofertaId) => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('ofertas')
        .select('*')
        .eq('oferta_id', ofertaId)
        .single();
      
      if (error) throw error;
      
      // Merge con valores por defecto para campos nulos
      const datosCompletos = { ...OFERTA_INICIAL };
      Object.keys(data).forEach(key => {
        if (data[key] !== null) {
          datosCompletos[key] = data[key];
        }
      });
      
      setDatos(datosCompletos);
      setPantalla('wizard');
      setPasoActual(1);
      mostrarMensaje('Oferta cargada correctamente', 'success');
    } catch (error) {
      console.error('Error cargando oferta:', error);
      mostrarMensaje('Error al cargar la oferta: ' + error.message, 'error');
    } finally {
      setCargando(false);
    }
  };

  const obtenerSiguienteId = async () => {
    try {
      // Intentar usar la función de BD
      const { data, error } = await supabase.rpc('generar_siguiente_oferta_id');
      if (!error && data) return data;
    } catch (e) {
      console.log('Función RPC no disponible, generando localmente');
    }
    
    // Fallback: generar localmente
    const maxId = ofertas.reduce((max, o) => {
      const num = parseInt(o.oferta_id?.substring(2)) || 0;
      return Math.max(max, num);
    }, 0);
    return '10' + String(maxId + 1).padStart(3, '0');
  };

  const guardarOferta = async () => {
    if (!datos.oferta_id) {
      mostrarMensaje('El ID de oferta es obligatorio', 'error');
      return;
    }

    // Validar formato del ID
    if (!/^10\d{3}$/.test(datos.oferta_id)) {
      mostrarMensaje('El ID debe tener formato 10xxx (ej: 10001)', 'error');
      return;
    }

    setGuardando(true);
    try {
      // Preparar datos para guardar (convertir strings vacíos a null)
      const datosLimpios = {};
      Object.keys(datos).forEach(key => {
        const valor = datos[key];
        if (valor === '' || valor === undefined) {
          datosLimpios[key] = null;
        } else {
          datosLimpios[key] = valor;
        }
      });

      const { error } = await supabase
        .from('ofertas')
        .upsert(datosLimpios, { onConflict: 'oferta_id' });

      if (error) throw error;
      
      mostrarMensaje('✅ Oferta guardada correctamente', 'success');
      cargarOfertas(); // Refrescar lista
    } catch (error) {
      console.error('Error guardando oferta:', error);
      mostrarMensaje('Error al guardar: ' + error.message, 'error');
    } finally {
      setGuardando(false);
    }
  };

  const eliminarOferta = async (ofertaId) => {
    if (!confirm(`¿Eliminar la oferta ${ofertaId}?`)) return;
    
    try {
      const { error } = await supabase
        .from('ofertas')
        .delete()
        .eq('oferta_id', ofertaId);
      
      if (error) throw error;
      
      mostrarMensaje('Oferta eliminada', 'success');
      cargarOfertas();
      if (datos.oferta_id === ofertaId) {
        setPantalla('inicio');
      }
    } catch (error) {
      mostrarMensaje('Error al eliminar: ' + error.message, 'error');
    }
  };

  // ============================================
  // HANDLERS DE NAVEGACIÓN
  // ============================================

  const handleNuevaOferta = async () => {
    const nuevoId = await obtenerSiguienteId();
    setDatos({ 
      ...OFERTA_INICIAL, 
      oferta_id: nuevoId,
      oferta_fecha_solicitud: new Date().toISOString().split('T')[0]
    });
    setPasoActual(1);
    setPantalla('wizard');
  };

  const handleAbrirOferta = (oferta) => {
    cargarOferta(oferta.oferta_id);
  };

  const handleVolver = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    } else {
      setPantalla('inicio');
      cargarOfertas();
    }
  };

  const handleSiguiente = () => {
    if (pasoActual < PASOS.length) {
      setPasoActual(pasoActual + 1);
    }
  };

  // ============================================
  // RENDER PASO ACTUAL
  // ============================================

  const renderPaso = () => {
    switch (pasoActual) {
      case 1: return <Paso1Proyecto datos={datos} onChange={setDatos} />;
      case 2: return <Paso2Tarifa datos={datos} onChange={setDatos} />;
      case 3: return <Paso3SituacionActual datos={datos} onChange={setDatos} />;
      case 4: return <Paso4Propuesta datos={datos} onChange={setDatos} />;
      default: return null;
    }
  };

  // ============================================
  // RENDER PRINCIPAL
  // ============================================

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: COLOR_BG_SECONDARY,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: COLOR_BG,
        padding: '12px 24px',
        borderBottom: `4px solid ${COLOR_CORP}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <div 
          onClick={() => { setPantalla('inicio'); cargarOfertas(); }}
          style={{ cursor: 'pointer' }}
        >
          <YlioLogo width={160} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {pantalla === 'wizard' && (
            <span style={{ 
              backgroundColor: COLOR_CORP_BG, 
              padding: '8px 16px', 
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: COLOR_CORP,
              border: `1px solid ${COLOR_CORP}30`
            }}>
              📋 {datos.oferta_id}
            </span>
          )}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            backgroundColor: conexionOk ? '#E8F5E9' : '#FFEBEE',
            padding: '6px 12px',
            borderRadius: '20px'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: conexionOk ? COLOR_SUCCESS : COLOR_DANGER, 
              borderRadius: '50%',
              boxShadow: conexionOk ? '0 0 4px #28A745' : '0 0 4px #DC3545'
            }} />
            <span style={{ 
              fontSize: '12px', 
              color: conexionOk ? COLOR_SUCCESS : COLOR_DANGER, 
              fontWeight: '500' 
            }}>
              {conexionOk ? 'Conectado' : 'Sin conexión'}
            </span>
          </div>
        </div>
      </div>

      {/* Mensaje de notificación */}
      {mensaje && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          padding: '14px 24px',
          borderRadius: '8px',
          backgroundColor: mensaje.tipo === 'success' ? COLOR_SUCCESS : COLOR_DANGER,
          color: 'white',
          fontWeight: '500',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: '14px'
        }}>
          {mensaje.texto}
        </div>
      )}

      {/* Contenido */}
      {pantalla === 'inicio' ? (
        <PantallaInicio 
          onNuevaOferta={handleNuevaOferta}
          onAbrirOferta={handleAbrirOferta}
          ofertas={ofertas}
          cargando={cargando}
        />
      ) : (
        <>
          {/* Barra de pasos */}
          <div style={{ 
            display: 'flex', 
            backgroundColor: COLOR_BG, 
            padding: '12px 24px',
            gap: '8px',
            borderBottom: '1px solid #DEE2E6'
          }}>
            {PASOS.map((paso) => (
              <div 
                key={paso.id}
                onClick={() => setPasoActual(paso.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  backgroundColor: paso.id === pasoActual ? COLOR_CORP : 
                                   paso.id < pasoActual ? COLOR_CORP_LIGHT : 'transparent',
                  color: paso.id <= pasoActual ? 'white' : COLOR_TEXT_LIGHT,
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: paso.id === pasoActual ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <span>{paso.icono}</span>
                <span>{paso.nombre}</span>
                {paso.id < pasoActual && <span>✓</span>}
              </div>
            ))}
          </div>

          {/* Contenido del paso */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              {renderPaso()}
            </div>
          </div>

          {/* Footer con navegación */}
          <div style={{
            borderTop: '1px solid #DEE2E6',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: COLOR_BG
          }}>
            <Button variant="secondary" onClick={handleVolver}>
              ← {pasoActual === 1 ? 'Inicio' : 'Anterior'}
            </Button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '13px', color: COLOR_TEXT_LIGHT }}>
                Paso {pasoActual} de {PASOS.length}
              </span>
              <Button 
                variant="success" 
                onClick={guardarOferta}
                disabled={guardando}
              >
                {guardando ? '⏳ Guardando...' : '💾 Guardar'}
              </Button>
            </div>

            <Button 
              onClick={handleSiguiente}
              disabled={pasoActual === PASOS.length}
            >
              Siguiente →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
