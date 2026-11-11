import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import {
BREEDS,
MESTIZO,
breedBySlug,
type Breed,
type Cola,
type Hocico,
type Orejas,
type Pelaje,
type Tamano,
} from "./breeds";
import tinyFoto from "./assets/tiny.jpg";
import codiQr from "./assets/codi-qr.jpg";

/* ---------- icons (inline SVG, no emoji) ---------- */

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 13.2c2.9 0 5.8 2.3 5.8 4.9 0 1.6-1.2 2.7-2.9 2.7-1 0-1.7-.4-2.9-.4s-1.9.4-2.9.4c-1.7 0-2.9-1.1-2.9-2.7 0-2.6 2.9-4.9 5.8-4.9ZM6.2 8.4c1 .3 1.5 1.6 1.1 2.9-.4 1.3-1.5 2.1-2.5 1.8-1-.3-1.5-1.6-1.1-2.9.4-1.3 1.5-2.1 2.5-1.8Zm11.6 0c1-.3 2.1.5 2.5 1.8.4 1.3-.1 2.6-1.1 2.9-1 .3-2.1-.5-2.5-1.8-.4-1.3.1-2.6 1.1-2.9ZM9.3 4.6c1.1.2 1.8 1.5 1.6 2.9-.2 1.4-1.2 2.4-2.3 2.2-1.1-.2-1.8-1.5-1.6-2.9.2-1.4 1.2-2.4 2.3-2.2Zm5.4 0c1.1-.2 2.1.8 2.3 2.2.2 1.4-.5 2.7-1.6 2.9-1.1.2-2.1-.8-2.3-2.2-.2-1.4.5-2.7 1.6-2.9Z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.8-4.8" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8.5 6 3.5-6 3.5z" />
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function NavButton({
  active,
  onClick,
  onPressStart,
  label,
  home,
  children,
}: {
  active: boolean;
  onClick: () => void;
  // El botón de Inicio (Home) va un poco más grande que los demás y
  // sobresale un poco por arriba del menú (margen superior negativo),
  // sin recorrer a los demás botones, para que se note cuál es el Home.
  home?: boolean;
  // Se dispara en cuanto el dedo toca el botón, sin esperar al click,
  // para que la acción responda desde el primer instante del toque.
  // El menú vive fuera del contenedor que se desplaza, así que el
  // toque llega aunque la lista se esté corriendo sola por inercia.
  onPressStart?: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
      onPointerDown={onPressStart}
      onTouchStart={onPressStart}
      className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-full px-0.5 transition-colors ${home ? "-mt-4 min-h-[64px] flex-[1.25] py-2" : "min-h-[52px] flex-1 py-1.5"}`}
      style={{
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--accent-ink)" : "var(--dim)",
      }}
    >
      {children}
      <span className={`leading-none font-extrabold whitespace-nowrap ${home ? "text-[clamp(10px,3vw,11.5px)]" : "text-[clamp(8px,2.5vw,9.5px)]"}`}>{label}</span>
    </button>
  );
}

/* ---------- theme ---------- */

const THEME_COLORS = [
  { key: "rojo", label: "Rojo", value: "#d92b2b" },
  { key: "azul", label: "Azul", value: "#2563eb" },
  { key: "verde", label: "Verde", value: "#1e9e6a" },
  { key: "morado", label: "Morado", value: "#7c4dbe" },
  { key: "naranja", label: "Naranja", value: "#e8710a" },
] as const;

type ThemeMode = "claro" | "oscuro" | "sistema";
type ThemeState = { color: string; mode: ThemeMode };

function loadTheme(): ThemeState {
  try {
    const raw = localStorage.getItem("mi-wuawua-tema");
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ThemeState>;
      return {
        color: typeof parsed.color === "string" ? parsed.color : "#d92b2b",
        mode: parsed.mode === "oscuro" || parsed.mode === "claro" ? parsed.mode : "sistema",
      };
    }
  } catch {
    /* tema por defecto */
  }
  return { color: "#d92b2b", mode: "sistema" };
}

/* ---------- shared bits ---------- */

const TAMANO_LABEL: Record<Tamano, string> = {
  pequeno: "Pequeños",
  mediano: "Medianos",
  grande: "Grandes",
};
const TAMANO_RANGO: Record<Tamano, string> = {
  pequeno: "hasta 40 cm de estatura",
  mediano: "de 40 a 60 cm de estatura",
  grande: "más de 60 cm de estatura",
};

function rango(min: number, max: number, unidad: string): string {
  return min === max ? `${min} ${unidad}` : `${min}–${max} ${unidad}`;
}

function BreedBack({ breed }: { breed: Breed }) {
  const esMestizo = breed.slug === "mestizo";
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4" style={{ background: "var(--surface-alt)", color: "var(--text)" }}>
      <h4 className="font-[family-name:var(--font-display)] text-lg leading-tight font-bold">{breed.nombre}</h4>
      {esMestizo ? (
        <p className="text-justify text-sm leading-snug">{breed.cuidados}</p>
      ) : (
        <>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-justify text-sm">
            <div>
              <dt className="font-bold" style={{ color: "var(--dim)" }}>Estatura</dt>
              <dd>{rango(breed.estaturaMin, breed.estaturaMax, "cm")}</dd>
            </div>
            <div className="pl-4">
              <dt className="font-bold" style={{ color: "var(--dim)" }}>Peso</dt>
              <dd>{rango(breed.pesoMin, breed.pesoMax, "kg")}</dd>
            </div>
            <div>
              <dt className="font-bold" style={{ color: "var(--dim)" }}>Origen</dt>
              <dd>{breed.origen}</dd>
            </div>
            <div className="pl-4">
              <dt className="font-bold" style={{ color: "var(--dim)" }}>Vida aprox.</dt>
              <dd>{rango(breed.vidaMin, breed.vidaMax, "años")}</dd>
            </div>
          </dl>
          <p className="text-justify text-sm">
            <span className="font-bold" style={{ color: "var(--dim)" }}>Colores: </span>
            {breed.coloresTexto}
          </p>
          {breed.nota ? <p className="text-justify text-sm leading-snug">{breed.nota}</p> : null}
          <p className="text-justify text-sm leading-snug">
            <span className="font-bold" style={{ color: "var(--dim)" }}>Cuidados: </span>
            {breed.cuidados}
          </p>
        </>
      )}
      <p className="mt-auto flex items-center justify-center gap-1.5 pt-3 text-center text-sm font-bold" style={{ color: "var(--accent)" }}>
        <PawIcon className="h-4 w-4" /> Dale mucho amor, ya que es un familiar más.
      </p>
    </div>
  );
}

interface FlipCardProps {
  breed: Breed;
  fotoOverride?: string | null;
  esElMio?: boolean;
  onMark?: (breed: Breed) => void;
  // Volteo controlado (opcional): la lista por ventana lo guarda fuera
  // de la tarjeta, por raza, para que una tarjeta volteada siga
  // volteada cuando se desmonta y se vuelve a montar al deslizar.
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
}

// El frente de la tarjeta reparte foto (76) y nombre (24) con flex, no con
// alturas en porcentaje: en algunos navegadores el % se resuelve contra una
// altura "indefinida" (la tarjeta se dimensiona por aspect-ratio) y la foto
// caía a su altura natural, tapando la franja del nombre en las fotos
// verticales (p. ej. el Maltés se quedaba sin nombre). Con flex-basis 0 el
// reparto siempre se cumple y ninguna tarjeta pierde su nombre.
type PawParticle = {
  id: number;
  drift: number;
  rise: number;
  rot: number;
  scale: number;
  size: number;
  delay: number;
  duration: number;
};

function FlipCard({
  breed,
  fotoOverride,
  esElMio,
  onMark,
  flipped: flippedControlado,
  onFlipChange,
}: FlipCardProps) {
  const [flippedLocal, setFlippedLocal] = useState(false);
  const flipped = flippedControlado ?? flippedLocal;
  const toggleFlip = () => {
    if (onFlipChange) onFlipChange(!flipped);
    else setFlippedLocal((f) => !f);
  };
  const [pawBurst, setPawBurst] = useState<PawParticle[]>([]);
  const burstTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (burstTimeoutRef.current !== null) {
        window.clearTimeout(burstTimeoutRef.current);
      }
    };
  }, []);

  const handleMark = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced && onMark) {
      const now = Date.now();
      const particles: PawParticle[] = Array.from({ length: 16 }, (_, i) => ({
        id: now + i,
        drift: Math.round(Math.random() * 84 - 42),
        rise: Math.round(-(110 + Math.random() * 90)),
        rot: Math.round(Math.random() * 56 - 28),
        scale: 0.7 + Math.random() * 0.7,
        size: Math.round(14 + Math.random() * 14),
        delay: Math.random() * 0.25,
        duration: 0.95 + Math.random() * 0.45,
      }));
      setPawBurst(particles);
      if (burstTimeoutRef.current !== null) {
        window.clearTimeout(burstTimeoutRef.current);
      }
      burstTimeoutRef.current = window.setTimeout(() => setPawBurst([]), 1800);
    }
    onMark?.(breed);
  };
  return (
    <div
      className="flip mx-auto aspect-[3/4] w-full max-w-md"
      data-flipped={flipped}
      role="button"
      tabIndex={0}
      aria-label={`Tarjeta de ${breed.nombre}.`}
      onClick={toggleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
    >
      <div className="flip-inner">
        {/* Solo la cara que se está viendo recibe los toques: la cara
            oculta lleva su propio desplazamiento interno (el reverso)
            y en el teléfono podía quedarse con los gestos de deslizar
            aunque no se viera, moviendo la app y trabando la lista. */}
        <div className="flip-face flex flex-col shadow-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)", pointerEvents: flipped ? "none" : "auto" }}>
          <img
            src={fotoOverride ?? breed.foto}
            alt={`Foto de un Wuawua ${breed.nombre}`}
            className="min-h-0 w-full object-cover"
            style={{ flex: "76 1 0%" }}
            loading="lazy"
          />
          <div className="relative min-h-0" style={{ flex: "24 1 0%" }}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ paddingLeft: 52, paddingRight: 52 }}
            >
              <p className="text-center font-[family-name:var(--font-display)] text-xl leading-tight font-bold">{breed.nombre}</p>
            </div>
          </div>
          {esElMio ? (
            <span
              className="absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-xs font-extrabold shadow-md"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              ¡Mi Wuawua!
            </span>
          ) : null}
          {!flipped && pawBurst.length > 0 ? (
            <div className="paw-burst" aria-hidden="true">
              {pawBurst.map((p) => (
                <span
                  key={p.id}
                  className="paw-burst-particle"
                  style={
                    {
                      width: p.size,
                      height: p.size,
                      animationDelay: `${p.delay}s`,
                      animationDuration: `${p.duration}s`,
                      "--paw-drift": `${p.drift}px`,
                      "--paw-rise": `${p.rise}px`,
                      "--paw-rot": `${p.rot}deg`,
                      "--paw-scale": String(p.scale),
                    } as React.CSSProperties
                  }
                >
                  <PawIcon className="h-full w-full" />
                </span>
              ))}
            </div>
          ) : null}
          {onMark && !flipped ? (
            <button
              type="button"
              aria-label={
                esElMio
                  ? `${breed.nombre} ya es tu Wuawua`
                  : `Marcar ${breed.nombre} como Mi Wuawua`
              }
              title={esElMio ? "¡Es tu Wuawua!" : "Marcar como Mi Wuawua"}
              onClick={(e) => {
                e.stopPropagation();
                handleMark();
              }}
              className="absolute bottom-2 left-2 z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-md transition-transform active:scale-90"
              style={{
                background: esElMio ? "var(--accent)" : "var(--surface)",
                color: esElMio ? "var(--accent-ink)" : "var(--accent)",
                border: "2px solid var(--accent)",
              }}
            >
              <PawIcon className="h-6 w-6" />
            </button>
          ) : null}
        </div>
        <div className="flip-face flip-back shadow-lg" style={{ border: "1px solid var(--border)", pointerEvents: flipped ? "auto" : "none" }}>
          <BreedBack breed={breed} />
        </div>
      </div>
    </div>
  );
}

/* ---------- lista de tarjetas por ventana ---------- */

// Solo se montan las tarjetas cercanas a lo que se está viendo, con
// huecos que ocupan la altura exacta de las filas no montadas
// (corrección 2026-11-11, "cuando sigo deslizando las tarjetas me
// regresa al home"). La versión anterior montaba las tarjetas por
// tandas de 30 y NUNCA desmontaba ninguna: al seguir deslizando,
// las tarjetas montadas solo crecían (30, 60, 90… hasta las 366),
// cada una una tarjeta 3D con preserve-3d, dos caras en capas
// propias, sombra grande y su foto ya abierta en memoria. En el
// iPhone eso agota la memoria de la vista web: el sistema la cierra
// y la app se recarga desde cero, y como la app siempre arranca en
// Inicio, el dueño veía que al deslizar "se regresaba al home" —
// entre más deslizaba, más cerca estaba el reinicio. En escritorio
// nunca se reprodujo porque ahí la memoria sobra.
//
// Ahora la lista va por ventana: la altura total es la real desde el
// principio (los huecos llevan la altura medida de las filas que no
// están montadas), así que se llega hasta la última tarjeta,
// Mestizo, en un solo deslizamiento continuo; solo se montan las
// filas visibles más un margen de ~1500px por arriba y por abajo, y
// las filas se desmontan al alejarse, así la memoria se queda plana
// se deslice lo que se deslice. El estado de volteo de cada tarjeta
// se guarda aquí, por raza, para que una tarjeta volteada siga
// volteada cuando se vuelve a montar al regresar a ella.
const FILA_SEPARACION = 20; // gap-5: separación entre filas y entre tarjetas
const VENTANA_EXTRA_PX = 1500; // margen montado por encima y por debajo de lo visible

function columnasSegunAncho(anchoVentana: number): number {
  // Las mismas columnas que declara el grid en CSS: 1 columna,
  // 2 desde 560px, 3 desde 1024px (lg) y 4 desde 1280px (xl).
  if (anchoVentana >= 1280) return 4;
  if (anchoVentana >= 1024) return 3;
  if (anchoVentana >= 560) return 2;
  return 1;
}

function CardGrid({
  breeds,
  resetKey,
  fotoFor,
  miSlug,
  onMark,
}: {
  breeds: Breed[];
  resetKey: string;
  fotoFor?: (b: Breed) => string | null | undefined;
  miSlug: string | null;
  onMark: (breed: Breed) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const filaRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [anchoVentana, setAnchoVentana] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 390,
  );
  const [alturaFila, setAlturaFila] = useState(0);
  const [ventana, setVentana] = useState<{ inicio: number; fin: number }>({
    inicio: 0,
    fin: 12,
  });
  const [volteadas, setVolteadas] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const columnas = columnasSegunAncho(anchoVentana);
  const totalFilas = Math.max(1, Math.ceil(breeds.length / columnas));
  const pasoFila = alturaFila > 0 ? alturaFila + FILA_SEPARACION : 0;

  // Al cambiar la lista (otra sección, otra búsqueda, otro tamaño) la
  // ventana vuelve arriba; el efecto de desplazamiento la recoloca
  // enseguida según dónde esté el contenedor.
  useEffect(() => {
    setVentana({ inicio: 0, fin: 12 });
  }, [resetKey]);

  // Las columnas dependen del ancho de la ventana, como los cortes de
  // Tailwind: se sigue el tamaño de la pantalla y la rotación.
  useEffect(() => {
    const alCambiar = () => setAnchoVentana(window.innerWidth);
    window.addEventListener("resize", alCambiar);
    window.addEventListener("orientationchange", alCambiar);
    return () => {
      window.removeEventListener("resize", alCambiar);
      window.removeEventListener("orientationchange", alCambiar);
    };
  }, []);

  // La altura de fila se mide de una fila de verdad ya pintada (todas
  // las tarjetas miden lo mismo: mismo ancho de columna y proporción
  // 3/4), así los huecos de las filas no montadas ocupan exactamente
  // lo que ocuparían sus tarjetas y la lista ni brinca ni se acorta.
  useLayoutEffect(() => {
    const el = filaRef.current;
    if (el) {
      const h = el.offsetHeight;
      if (h > 0 && Math.abs(h - alturaFila) > 0.5) setAlturaFila(h);
    }
  });

  // Qué filas tocan estar montadas según la posición del contenedor
  // que se desplaza: las que se ven, más el margen por arriba y por
  // abajo. Se recalcula al deslizar (con un cuadro de espera para no
  // saturar) y al montar o cambiar la lista o las columnas.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || pasoFila <= 0) return;
    const sc = wrap.closest("[data-mw-scroll]") as HTMLElement | null;
    if (!sc) return;
    const aplicar = () => {
      const inicioLista =
        wrap.getBoundingClientRect().top -
        sc.getBoundingClientRect().top +
        sc.scrollTop;
      const extra = Math.ceil(VENTANA_EXTRA_PX / pasoFila);
      const inicio = Math.max(
        0,
        Math.floor((sc.scrollTop - inicioLista) / pasoFila) - extra,
      );
      const fin = Math.min(
        totalFilas,
        Math.ceil((sc.scrollTop + sc.clientHeight - inicioLista) / pasoFila) +
          extra,
      );
      const nueva = {
        inicio,
        fin: Math.max(fin, Math.min(totalFilas, inicio + 1)),
      };
      setVentana((prev) =>
        prev.inicio === nueva.inicio && prev.fin === nueva.fin ? prev : nueva,
      );
    };
    const alDeslizar = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        aplicar();
      });
    };
    sc.addEventListener("scroll", alDeslizar, { passive: true });
    aplicar();
    return () => {
      sc.removeEventListener("scroll", alDeslizar);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [pasoFila, totalFilas, resetKey, columnas]);

  const filaInicio = Math.min(ventana.inicio, totalFilas - 1);
  const filaFin = Math.min(totalFilas, Math.max(ventana.fin, filaInicio + 1));
  const filas: Breed[][] = [];
  for (let r = filaInicio; r < filaFin; r++) {
    filas.push(breeds.slice(r * columnas, r * columnas + columnas));
  }

  return (
    <div ref={wrapRef}>
      {pasoFila > 0 && filaInicio > 0 ? (
        <div aria-hidden="true" style={{ height: filaInicio * pasoFila }} />
      ) : null}
      <div className="flex flex-col" style={{ gap: FILA_SEPARACION }}>
        {filas.map((fila, i) => (
          <div
            key={fila[0]?.slug ?? `fila-${i}`}
            ref={
              i === 0
                ? (el: HTMLDivElement | null) => {
                    filaRef.current = el;
                  }
                : undefined
            }
            className="grid gap-5 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {fila.map((b) => (
              <FlipCard
                key={b.slug}
                breed={b}
                fotoOverride={fotoFor?.(b)}
                esElMio={miSlug === b.slug}
                onMark={onMark}
                flipped={volteadas.has(b.slug)}
                onFlipChange={(f) =>
                  setVolteadas((prev) => {
                    const siguientes = new Set(prev);
                    if (f) siguientes.add(b.slug);
                    else siguientes.delete(b.slug);
                    return siguientes;
                  })
                }
              />
            ))}
          </div>
        ))}
      </div>
      {pasoFila > 0 && filaFin < totalFilas ? (
        <div
          aria-hidden="true"
          style={{ height: (totalFilas - filaFin) * pasoFila }}
        />
      ) : null}
    </div>
  );
}

/* ---------- photo upload helper ---------- */

function readFileAsBase64(file: File): Promise<{ base64: string; mime: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const comma = result.indexOf(",");
      resolve({
        base64: comma >= 0 ? result.slice(comma + 1) : result,
        mime: file.type || "image/jpeg",
      });
    };
    reader.onerror = () => reject(new Error("No se pudo leer la foto"));
    reader.readAsDataURL(file);
  });
}

/* ---------- personal card ---------- */

type Profile = {
  breed_slug: string | null;
  dog_name: string;
  notes: string;
  is_example: boolean;
  photo_url: string | null;
  breed_photo_url: string | null;
};

function PersonalCard({ profile }: { profile: Profile | null }) {
  const [flipped, setFlipped] = useState(false);
  const breed = breedBySlug(profile?.breed_slug);
  const esEjemplo = profile?.is_example ?? false;
  const foto =
    profile?.photo_url ?? (esEjemplo ? tinyFoto : null) ?? breed?.foto ?? null;
  const nombre = profile?.dog_name?.trim() ? profile.dog_name : esEjemplo ? "Tiny" : "Tu Wuawua";

  return (
    <div
      className="flip mx-auto aspect-[3/4] w-full max-w-md"
      data-flipped={flipped}
      role="button"
      tabIndex={0}
      aria-label="Tu tarjeta personal."
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div className="flip-inner">
        <div
          className="flip-face flex flex-col shadow-xl"
          style={{ background: "var(--surface)", border: "2px solid var(--accent)", pointerEvents: flipped ? "none" : "auto" }}
        >
          {foto ? (
            <img
              src={foto}
              alt={`Foto de ${nombre}`}
              className="min-h-0 w-full object-cover"
              style={{ flex: "76 1 0%" }}
            />
          ) : (
            <div
              className="flex min-h-0 w-full flex-col items-center justify-center gap-2"
              style={{ flex: "76 1 0%", background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <PawIcon className="h-20 w-20" />
              <p className="px-6 text-center font-bold">
                Sube la foto de tu Wuawua con el botón de abajo
              </p>
            </div>
          )}
          <div className="flex min-h-0 flex-col justify-center px-4" style={{ flex: "24 1 0%" }}>
            <p className="truncate text-center font-[family-name:var(--font-display)] text-2xl leading-tight font-bold" style={{ color: "var(--accent)" }}>
              {nombre}
            </p>
            <p className="truncate text-center text-sm font-bold" style={{ color: "var(--accent)" }}>
              {breed ? breed.nombre : "Marca la patita en su raza para llenar tu tarjeta"}
            </p>
          </div>
        </div>
        <div className="flip-face flip-back shadow-xl" style={{ border: "2px solid var(--accent)", pointerEvents: flipped ? "auto" : "none" }}>
          {breed ? (
            <BreedBack breed={breed} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center" style={{ background: "var(--surface-alt)" }}>
              <PawIcon className="h-12 w-12" />
              <p className="font-bold">Todavía no marcas la raza de tu Wuawua.</p>
              <p className="text-sm" style={{ color: "var(--dim)" }}>
                Busca su tarjeta en la enciclopedia y toca la patita de la esquina
                inferior izquierda: tu tarjeta personal se llena sola.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- questionnaire ---------- */

const COLOR_OPTIONS = [
  { key: "blanco", label: "Blanco" },
  { key: "negro", label: "Negro" },
  { key: "cafe", label: "Café" },
  { key: "dorado", label: "Dorado" },
  { key: "gris", label: "Gris" },
  { key: "rojo", label: "Rojo / cobrizo" },
  { key: "crema", label: "Crema" },
  { key: "atigrado", label: "Atigrado (con rayas)" },
];

type QuizStep = "tamano" | "orejas" | "pelaje" | "numColores" | "colores" | "cola" | "hocico";

interface QuizAnswers {
  tamano?: Tamano;
  orejas?: Orejas;
  pelaje?: Pelaje;
  numColores?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  cola?: Cola;
  hocico?: Hocico;
}

function scoreBreeds(a: QuizAnswers): Breed[] {
  const pool = a.tamano ? BREEDS.filter((b) => b.tamano === a.tamano) : [...BREEDS];
  // Puntuación máxima alcanzable con las respuestas que sí se dieron.
  let max = 0;
  if (a.orejas) max += 2;
  if (a.pelaje) max += 2;
  if (a.cola) max += 2;
  if (a.hocico) max += 2;
  if (a.numColores) max += 1;
  if (a.color1) max += 3;
  if (a.color2) max += 1;
  if (a.color3) max += 1;
  // Solo se muestran las razas que de verdad se parecen: tienen que
  // alcanzar al menos el 60 % de la puntuación posible. Antes se devolvían
  // siempre las 6 mejores aunque apenas coincidieran en un par de
  // respuestas; si ninguna llega al mínimo, el resultado es solo Mestizo.
  const minimo = Math.max(4, Math.ceil(max * 0.6));
  const scored = pool.map((b) => {
    let s = 0;
    if (a.orejas && b.orejas === a.orejas) s += 2;
    if (a.pelaje && b.pelaje === a.pelaje) s += 2;
    if (a.cola && b.cola === a.cola) s += 2;
    if (a.hocico && b.hocico === a.hocico) s += 2;
    if (a.numColores && b.numColores === a.numColores) s += 1;
    if (a.color1 && b.colores.includes(a.color1)) s += 3;
    if (a.color2 && b.colores.includes(a.color2)) s += 1;
    if (a.color3 && b.colores.includes(a.color3)) s += 1;
    return { b, s };
  });
  scored.sort((x, y) => y.s - x.s);
  return scored
    .filter((x) => x.s >= minimo)
    .slice(0, 6)
    .map((x) => x.b);
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="rounded-2xl px-4 py-3 text-left font-bold transition-transform active:scale-[0.98]"
      style={{
        background: selected ? "var(--accent)" : "var(--surface)",
        color: selected ? "var(--accent-ink)" : "var(--text)",
        border: "2px solid var(--accent)",
      }}
    >
      {children}
    </button>
  );
}

function Quiz({
  presetTamano,
  onDone,
  onCancel,
}: {
  presetTamano: Tamano | null;
  onDone: (results: Breed[]) => void;
  onCancel: () => void;
}) {
  const steps: QuizStep[] = useMemo(() => {
    const base: QuizStep[] = ["orejas", "pelaje", "numColores", "colores", "cola", "hocico"];
    return presetTamano ? base : ["tamano", ...base];
  }, [presetTamano]);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(
    presetTamano ? { tamano: presetTamano } : {},
  );
  const step = steps[stepIdx] ?? "hocico";
  const isLast = stepIdx === steps.length - 1;

  const next = (patch: QuizAnswers) => {
    const merged = { ...answers, ...patch };
    setAnswers(merged);
    if (isLast) {
      onDone(scoreBreeds(merged));
    } else {
      setStepIdx((i) => i + 1);
    }
  };
  const back = () => {
    if (stepIdx === 0) onCancel();
    else setStepIdx((i) => i - 1);
  };

  return (
    <section aria-label="Cuestionario para identificar a tu Wuawua" className="mx-auto w-full max-w-xl">
      <p className="mb-1 text-sm font-bold" style={{ color: "var(--dim)" }}>
        Pregunta {stepIdx + 1} de {steps.length}
        {presetTamano ? ` · Tamaño: ${TAMANO_LABEL[presetTamano]} (ya estás en esa sección)` : ""}
      </p>
      <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-alt)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${((stepIdx + 1) / steps.length) * 100}%`, background: "var(--accent)" }}
        />
      </div>

      {step === "tamano" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">¿Qué tamaño tiene tu Wuawua?</h3>
          <p className="mb-3 text-sm" style={{ color: "var(--dim)" }}>El tamaño se mide por su estatura, no por su peso. Esta es la pregunta principal: descarta dos tercios de las razas.</p>
          <div className="grid gap-2">
            {(Object.keys(TAMANO_LABEL) as Tamano[]).map((t) => (
              <OptionButton key={t} onClick={() => next({ tamano: t })}>
                {TAMANO_LABEL[t]} — {TAMANO_RANGO[t]}
              </OptionButton>
            ))}
          </div>
        </>
      ) : null}

      {step === "orejas" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">¿Cómo son sus orejitas?</h3>
          <div className="grid gap-2">
            <OptionButton onClick={() => next({ orejas: "puntiagudas" })}>Paraditas y puntiagudas</OptionButton>
            <OptionButton onClick={() => next({ orejas: "caidas" })}>Caídas, suaves a los lados</OptionButton>
            <OptionButton onClick={() => next({ orejas: "dobladas" })}>Dobladitas o semiparadas</OptionButton>
          </div>
        </>
      ) : null}

      {step === "pelaje" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">¿Cómo es su pelaje?</h3>
          <div className="grid gap-2">
            <OptionButton onClick={() => next({ pelaje: "corto" })}>Corto y pegadito</OptionButton>
            <OptionButton onClick={() => next({ pelaje: "largo" })}>Largo</OptionButton>
            <OptionButton onClick={() => next({ pelaje: "rizado" })}>Rizado</OptionButton>
            <OptionButton onClick={() => next({ pelaje: "doble" })}>Doble y esponjoso</OptionButton>
          </div>
        </>
      ) : null}

      {step === "numColores" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">¿Cuántos colores tiene su pelaje?</h3>
          <div className="grid gap-2">
            <OptionButton onClick={() => next({ numColores: 1 })}>Un solo color</OptionButton>
            <OptionButton onClick={() => next({ numColores: 2 })}>Dos colores</OptionButton>
            <OptionButton onClick={() => next({ numColores: 3 })}>Tres colores o más</OptionButton>
          </div>
        </>
      ) : null}

      {step === "colores" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">Platícame sus colores</h3>
          <ColorPicker
            label="El color predominante es"
            value={answers.color1}
            onPick={(c) => setAnswers((a) => ({ ...a, color1: c }))}
          />
          {(answers.numColores ?? 1) >= 2 ? (
            <ColorPicker
              label="El color secundario es"
              value={answers.color2}
              onPick={(c) => setAnswers((a) => ({ ...a, color2: c }))}
            />
          ) : null}
          {(answers.numColores ?? 1) >= 3 ? (
            <ColorPicker
              label="El color terciario es"
              value={answers.color3}
              onPick={(c) => setAnswers((a) => ({ ...a, color3: c }))}
            />
          ) : null}
          <button
            type="button"
            disabled={!answers.color1}
            onClick={() => next({})}
            className="mt-4 w-full rounded-2xl px-4 py-3 font-extrabold disabled:opacity-40"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Seguir
          </button>
        </>
      ) : null}

      {step === "cola" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">¿Cómo es su colita?</h3>
          <div className="grid gap-2">
            <OptionButton onClick={() => next({ cola: "larga" })}>Larga</OptionButton>
            <OptionButton onClick={() => next({ cola: "corta" })}>Corta o rabito</OptionButton>
            <OptionButton onClick={() => next({ cola: "enroscada" })}>Enroscada sobre su lomito</OptionButton>
          </div>
        </>
      ) : null}

      {step === "hocico" ? (
        <>
          <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl font-bold">¿Qué forma tiene su boquita (hocico)?</h3>
          <div className="grid gap-2">
            <OptionButton onClick={() => next({ hocico: "corto" })}>Corta, chatita</OptionButton>
            <OptionButton onClick={() => next({ hocico: "mediano" })}>Mediana</OptionButton>
            <OptionButton onClick={() => next({ hocico: "largo" })}>Larga y puntiaguda</OptionButton>
          </div>
        </>
      ) : null}

      <button
        type="button"
        onClick={back}
        className="mt-5 font-bold underline"
        style={{ color: "var(--dim)" }}
      >
        {stepIdx === 0 ? "Cancelar" : "Atrás"}
      </button>
    </section>
  );
}

function ColorPicker({
  label,
  value,
  onPick,
}: {
  label: string;
  value?: string;
  onPick: (c: string) => void;
}) {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 font-bold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={value === c.key}
            onClick={() => onPick(c.key)}
            className="rounded-full px-3.5 py-2 text-sm font-bold"
            style={{
              background: value === c.key ? "var(--accent)" : "var(--surface)",
              color: value === c.key ? "var(--accent-ink)" : "var(--text)",
              border: "2px solid var(--accent)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- main app ---------- */

// La búsqueda por nombre no distingue mayúsculas ni acentos:
// "dalmata" encuentra "Dálmata" y "LABRADOR" encuentra "Labrador Retriever".
function normalizarBusqueda(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

type Seccion = "enciclopedia" | "identificar" | "inicio" | "demo" | "ajustes";
type FaseQuiz = "intro" | "quiz" | "resultados";

export function App() {
  const queryClient = useQueryClient();
  const [theme, setTheme] = useState<ThemeState>(loadTheme);
  const [seccion, setSeccion] = useState<Seccion>("inicio");
  const [faseQuiz, setFaseQuiz] = useState<FaseQuiz>("intro");
  const [quizPreset, setQuizPreset] = useState<Tamano | null>(null);
  const [quizNonce, setQuizNonce] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [tamanoSel, setTamanoSel] = useState<Tamano | null>(null);
  const [resultados, setResultados] = useState<Breed[]>([]);
  const [aviso, setAviso] = useState<string | null>(null);

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.getProfile({}),
  });
  const profile: Profile | null = profileQuery.data?.profile ?? null;
  const miBreed = breedBySlug(profile?.breed_slug);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["profile"] });
  const markMutation = useMutation({
    mutationFn: (slug: string) => api.markBreed({ breed_slug: slug }),
    onSuccess: (_d, slug) => {
      invalidate();
      setSeccion("inicio");
      const b = breedBySlug(slug);
      setAviso(
        b
          ? `¡Listo! ${b.nombre} quedó marcado como tu Wuawua. Tu tarjeta personal ya se llenó con su raza: sube su foto y escribe su nombre.`
          : "¡Listo! Tu tarjeta personal ya se llenó.",
      );
    },
  });
  const detailsMutation = useMutation({
    mutationFn: (args: { dog_name?: string; notes?: string }) =>
      api.saveProfileDetails(args),
    onSuccess: () => {
      invalidate();
      setAviso("Guardado en tu tarjeta personal.");
    },
  });
  const photoMutation = useMutation({
    mutationFn: (args: { data_base64: string; mime_type: string }) =>
      api.setPersonalPhoto(args),
    onSuccess: () => {
      invalidate();
      setAviso("Foto guardada en tu tarjeta personal.");
    },
  });
  const breedPhotoMutation = useMutation({
    mutationFn: (args: { data_base64: string; mime_type: string }) =>
      api.setBreedPhoto(args),
    onSuccess: () => {
      invalidate();
      setAviso("Foto de la tarjeta de raza guardada.");
    },
  });

  useEffect(() => {
    try {
      localStorage.setItem("mi-wuawua-tema", JSON.stringify(theme));
    } catch {
      /* sin almacenamiento local */
    }
  }, [theme]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 6000);
    return () => clearTimeout(t);
  }, [aviso]);

  // Contenedor que desplaza el contenido de la app (ver el comentario
  // junto al JSX): la ventana/documento ya NO se desplaza, así que
  // regresar al inicio es mover este contenedor a scrollTop = 0.
  const scrollRef = useRef<HTMLDivElement>(null);

  // La altura de .mw NO se mide ni se corrige aquí: está declarada
  // en theme.css con la medida que la propia plataforma declara
  // para su barra flotante (--bottom-padding, recuperada como
  // --hatch-space-bottom-padding menos la zona segura), para que el
  // menú quede fijo justo encima de esa barra, sin hueco y sin
  // empalme, adaptándose sola a cualquier pantalla. El dueño lo
  // ordenó así: si es responsive, no va calculado por código, va
  // bien programado en el CSS. No volver a poner mediciones aquí.

  const topAnimRef = useRef<number | null>(null);

  // Detiene cualquier regreso programado al inicio si estaba en curso
  // y le devuelve al contenedor su desplazamiento normal (durante el
  // regreso deslizando lleva overflow-y: hidden en línea; ver
  // slidePageToTop). También se llama en cuanto el usuario toca la
  // lista: en ese instante el control del desplazamiento vuelve a
  // ser suyo.
  const stopTopAnim = () => {
    if (topAnimRef.current !== null) {
      cancelAnimationFrame(topAnimRef.current);
      topAnimRef.current = null;
    }
    const el = scrollRef.current;
    if (el && el.style.overflowY === "hidden") {
      el.style.overflowY = "";
    }
  };

  // Al cambiar de sección la lista empieza arriba, SIN tocar jamás el
  // overflow del contenedor (corrección 2026-11-11, "no deja llegar
  // al final y se regresa al inicio"): la versión anterior apagaba y
  // encendía el desplazamiento del contenedor (overflow-y: hidden y
  // de vuelta, dentro de la misma tarea) en cada cambio de sección y
  // en cada toque del menú, y en el iPhone del dueño eso dejaba la
  // capa de desplazamiento del contenedor mal armada: la lista ya no
  // se desplazaba de verdad, el arrastre rebotaba elásticamente y la
  // vista se regresaba al inicio sin dejar llegar hasta la última
  // tarjeta. Ahora el overflow del contenedor NO se toca nunca fuera
  // del regreso deslizando de la Enciclopedia: aquí solo se escribe
  // scrollTop = 0 y se reintenta por unos cuadros (~350 ms), porque
  // si la lista traía inercia el sistema ignora la primera escritura
  // mientras el impulso vive, pero el impulso se acaba en ese lapso
  // y una de las escrituras deja la sección nueva arriba y quieta.
  // Si el usuario agarra la lista en ese lapso, stopTopAnim (en el
  // onTouchStart/onPointerDown del contenedor) cancela el reintento
  // al instante y el desplazamiento queda suyo.
  const scrollPageToTop = () => {
    const el = scrollRef.current;
    if (!el) return;
    stopTopAnim();
    el.scrollTop = 0;
    const t0 = performance.now();
    const pin = () => {
      if (el.scrollTop !== 0) el.scrollTop = 0;
      if (performance.now() - t0 < 350) {
        topAnimRef.current = requestAnimationFrame(pin);
      } else {
        el.scrollTop = 0;
        topAnimRef.current = null;
      }
    };
    topAnimRef.current = requestAnimationFrame(pin);
  };

  useEffect(() => {
    return () => {
      if (topAnimRef.current !== null) {
        cancelAnimationFrame(topAnimRef.current);
        topAnimRef.current = null;
      }
    };
  }, []);

  // Regreso DESLIZANDO al inicio con un solo toque, aunque la lista se
  // esté corriendo sola por inercia, y al llegar a la primera tarjeta
  // la lista se queda quieta, sin seguirse corriendo.
  //
  // La versión anterior reasignaba el scrollTop del contenedor para
  // "tomar el control" y animaba con requestAnimationFrame, pero en
  // iOS eso no basta: mientras la inercia nativa vive, el sistema
  // IGNORA los scrollTop que asigna el código, así que el regreso no
  // se veía deslizar (al final la lista saltaba de trancazo a donde
  // alcanzaba) y, peor, la inercia nunca se cancelaba de verdad: al
  // terminar la animación volvía a empujar la lista y esta se seguía
  // corriendo después de llegar arriba.
  //
  // La forma de quitarle el control a la inercia en iOS es poner el
  // contenedor en overflow-y: hidden: eso desarma su capa de
  // desplazamiento con impulso y congela la lista en el punto exacto
  // donde va. Con un reflow forzado (`void el.offsetHeight`) el
  // cambio queda confirmado y el scrollTop que se lee ya es la
  // posición real. El contenedor se queda en hidden durante TODO el
  // regreso: así cada cuadro de la animación sí se aplica (el regreso
  // se VE deslizar) y no queda ningún residuo de inercia que pueda
  // reactivarse al llegar: la primera tarjeta llega y ahí se queda.
  // Al terminar se restaura el overflow y el desplazamiento normal.
  // Si el usuario toca la lista a media subida, stopTopAnim (en el
  // onTouchStart/onPointerDown del contenedor) cancela el regreso y
  // le devuelve el control al instante.
  //
  // La duración crece mucho más despacio que la distancia (raíz
  // cuadrada, con mínimo y tope corto): la velocidad efectiva sube
  // entre más lejos esté el inicio, para que cuando la Enciclopedia
  // tenga más de 300 tarjetas el regreso no se haga tedioso, pero
  // sin llegar a ser tan instantáneo que se perciba como un salto:
  // el deslizamiento se sigue notando en todo el recorrido.
  const slidePageToTop = () => {
    const el = scrollRef.current;
    if (!el) return;
    stopTopAnim();
    // Paso 1: matar la inercia nativa y congelar la lista donde va.
    el.style.overflowY = "hidden";
    void el.offsetHeight;
    const start = el.scrollTop;
    if (start <= 0) {
      el.scrollTop = 0;
      el.style.overflowY = "";
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.scrollTop = 0;
      el.style.overflowY = "";
      return;
    }
    // Paso 2: deslizar hasta arriba y quedarse ahí.
    // Duración a la mitad de la anterior (doble de rápido en cualquier
    // distancia): 60 + 87.5·√(distancia/1000) ms, entre 120 y 400 ms.
    const duration = Math.min(400, Math.max(120, 60 + 87.5 * Math.sqrt(start / 1000)));
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.scrollTop = Math.round(start * (1 - eased));
      if (p < 1) {
        topAnimRef.current = requestAnimationFrame(step);
      } else {
        el.scrollTop = 0;
        el.style.overflowY = "";
        topAnimRef.current = null;
      }
    };
    topAnimRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    scrollPageToTop();
  }, [seccion]);

  const [nombreDraft, setNombreDraft] = useState<string | null>(null);
  const [notasDraft, setNotasDraft] = useState<string | null>(null);
  const personalPhotoRef = useRef<HTMLInputElement>(null);
  const breedPhotoRef = useRef<HTMLInputElement>(null);

  const onFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    which: "personal" | "breed",
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const { base64, mime } = await readFileAsBase64(file);
    if (which === "personal") {
      photoMutation.mutate({ data_base64: base64, mime_type: mime });
    } else {
      breedPhotoMutation.mutate({ data_base64: base64, mime_type: mime });
    }
  };

  const startQuiz = (preset: Tamano | null) => {
    setQuizPreset(preset);
    setQuizNonce((n) => n + 1);
    setFaseQuiz("quiz");
    setSeccion("identificar");
  };
  const redNose = BREEDS.find((b) => b.slug === "red-nose-pitbull");

  // Resultados de la lupa de Identificar: filtra las tarjetas por nombre
  // (sin distinguir mayúsculas ni acentos) y, si hay una sección por tamaño
  // elegida, solo dentro de ese tamaño. También busca en los alias, que
  // incluyen el nombre de la familia de cada raza: por ejemplo "pitbull"
  // encuentra al Red Nose Pitbull y al American Staffordshire Terrier,
  // "pastor" a los pastores y al Border Collie, "retriever" al Labrador
  // y al Golden, "spaniel" al Cocker y al Cavalier, "sabueso" al Beagle,
  // al Basset y al Dachshund, y así con todas las razas del prototipo.
  const textoBusqueda = normalizarBusqueda(busqueda.trim());
  const buscando = textoBusqueda.length > 0;
  const resultadosBusqueda = buscando
    ? [...BREEDS, MESTIZO].filter((b) => {
        if (tamanoSel && b.tamano !== tamanoSel) return false;
        if (normalizarBusqueda(b.nombre).includes(textoBusqueda)) return true;
        return (b.alias ?? []).some((a) =>
          normalizarBusqueda(a).includes(textoBusqueda),
        );
      })
    : [];

  return (
    // La altura de .mw está declarada en theme.css: el 100% del
    // marco más la medida exacta de la barra flotante de la
    // plataforma (su --bottom-padding), para que el menú — último
    // elemento de la columna flex — quede fijo justo encima de esa
    // barra, sin empalmarse y sin hueco, en cualquier pantalla y
    // sin que ningún código tenga que medir nada. theme.css además
    // cierra el contenedor raíz de la plataforma para que la página
    // nunca se desplace: la lista se desliza dentro de su
    // contenedor, como debe ser, y el menú se queda fijo abajo.
    <div
      className="mw flex flex-col overflow-hidden"
      data-mode={theme.mode}
      style={{ ["--accent" as string]: theme.color }}
    >
      {/* Estructura de app: la ventana NO se desplaza; el contenido
          vive en este contenedor con su propio desplazamiento y el
          menú inferior queda fuera de él. Así, aunque las tarjetas se
          estén corriendo solas por inercia dentro del contenedor, un
          toque en el menú se entrega al botón a la primera (antes el
          documento entero se desplazaba con el menú fijo encima, e
          iOS consumía ese primer toque solo para frenar la lista). */}
      <div
        ref={scrollRef}
        data-mw-scroll=""
        onTouchStart={stopTopAnim}
        onPointerDown={stopTopAnim}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-5 pb-8 sm:px-6 lg:px-10"
      >
      <div className="mx-auto w-full max-w-5xl xl:max-w-7xl">
        {/* ---- Inicio: tarjeta personal ---- */}
        {seccion === "inicio" ? (
        <section aria-label="Tu tarjeta personal">
          <div className="mb-3 flex items-center justify-center gap-2 text-center">
            <PawIcon className="h-6 w-6" />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold min-[380px]:text-3xl">Tu Wuawua</h2>
            <PawIcon className="h-6 w-6" />
          </div>
          {profile?.is_example ? (
            <p className="mx-auto mb-3 max-w-md rounded-2xl px-4 py-2 text-center text-sm font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
              Ejemplo destacado: Tiny, un Red Nose Pitbull. Así se ve tu tarjeta cuando marcas la patita en la raza de tu Wuawua.
            </p>
          ) : null}
          <PersonalCard profile={profile} />

          <div className="mx-auto mt-4 grid w-full max-w-md grid-cols-[minmax(0,1fr)] gap-3">
            <input
              ref={personalPhotoRef}
              type="file"
              accept="image/*"
              className="hidden"
              aria-label="Subir la foto de tu Wuawua"
              onChange={(e) => void onFile(e, "personal")}
            />
            <button
              type="button"
              onClick={() => personalPhotoRef.current?.click()}
              className="rounded-2xl px-4 py-3 font-extrabold"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              {profile?.photo_url ? "Cambiar la foto de Mi Wuawua" : "Subir la foto de Mi Wuawua"}
            </button>

            <label className="grid min-w-0 gap-1">
              <span className="text-sm font-bold" style={{ color: "var(--dim)" }}>Su nombre</span>
              <input
                type="text"
                value={nombreDraft ?? profile?.dog_name ?? ""}
                placeholder="Escribe el nombre de tu Wuawua"
                onChange={(e) => setNombreDraft(e.target.value)}
                className="w-full min-w-0 rounded-xl px-3 py-2.5 text-center font-display text-3xl font-extrabold tracking-wide"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--accent)", fontWeight: 800 }}
              />
            </label>
            <label className="grid min-w-0 gap-1">
              <span className="text-sm font-bold" style={{ color: "var(--dim)" }}>Notas de tu Wuawua</span>
              <textarea
                value={notasDraft ?? profile?.notes ?? ""}
                placeholder="Lo que quieras recordar de él: su comida favorita, sus juegos, sus travesuras…"
                rows={3}
                onChange={(e) => setNotasDraft(e.target.value)}
                className="w-full min-w-0 rounded-xl px-3 py-2.5 font-semibold"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
              />
            </label>
            <button
              type="button"
              disabled={detailsMutation.isPending || (nombreDraft === null && notasDraft === null)}
              onClick={() =>
                detailsMutation.mutate({
                  ...(nombreDraft !== null ? { dog_name: nombreDraft } : {}),
                  ...(notasDraft !== null ? { notes: notasDraft } : {}),
                })
              }
              className="rounded-2xl px-4 py-3 font-extrabold disabled:opacity-40"
              style={{ background: "var(--surface)", color: "var(--accent)", border: "2px solid var(--accent)" }}
            >
              Guardar nombre y notas
            </button>
          </div>

          {profile?.is_example && redNose ? (
            <div className="mx-auto mt-8 w-full max-w-md">
              <h3 className="mb-2 text-center font-[family-name:var(--font-display)] text-2xl font-bold">
                La tarjeta de su raza
              </h3>
              <FlipCard
                breed={redNose}
                fotoOverride={profile.breed_photo_url ?? undefined}
                esElMio={miBreed?.slug === redNose.slug}
                onMark={(breed) => markMutation.mutate(breed.slug)}
              />
              <input
                ref={breedPhotoRef}
                type="file"
                accept="image/*"
                className="hidden"
                aria-label="Cambiar la foto de la tarjeta de la raza"
                onChange={(e) => void onFile(e, "breed")}
              />
              <button
                type="button"
                onClick={() => breedPhotoRef.current?.click()}
                className="mt-3 w-full rounded-2xl px-4 py-3 font-extrabold"
                style={{ background: "var(--surface)", color: "var(--accent)", border: "2px solid var(--accent)" }}
              >
                Cambiar la foto de esta tarjeta
              </button>
            </div>
          ) : null}
        </section>
        ) : null}

        {aviso ? (
          <p role="status" className="mx-auto mt-5 max-w-md rounded-2xl px-4 py-3 text-center font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
            {aviso}
          </p>
        ) : null}

        {/* ---- Identificar: cuestionario y sus resultados ---- */}
        {seccion === "identificar" ? (
          <section aria-label="Identifica qué Wuawua es" className="mt-2">
            {faseQuiz === "quiz" ? (
              <Quiz
                key={quizNonce}
                presetTamano={quizPreset}
                onDone={(r) => {
                  setResultados(r);
                  setFaseQuiz("resultados");
                }}
                onCancel={() => setFaseQuiz("intro")}
              />
            ) : faseQuiz === "resultados" ? (
          <section aria-label="Resultados del cuestionario">
            <h3 className="mb-1 text-center font-[family-name:var(--font-display)] text-2xl font-bold min-[380px]:text-3xl">
              {resultados.length > 0 ? "Tu Wuawua podría ser…" : "Ninguna raza se parece a eso"}
            </h3>
            <p className="mx-auto mb-5 max-w-lg text-center text-sm" style={{ color: "var(--dim)" }}>
              {resultados.length > 0
                ? "Estas son las tarjetas de las razas que más se parecen a lo que describiste."
                : "Con esas respuestas no se parece a ninguna raza de la colección. Puede que sea mestizo, o que alguna respuesta no haya quedado como es tu Wuawua: prueba el cuestionario otra vez."}
            </p>
            <div className="mx-auto grid w-full max-w-xl gap-5">
              {resultados.map((b) => (
                <FlipCard
                  key={b.slug}
                  breed={b}
                  fotoOverride={b.slug === "red-nose-pitbull" ? (profile?.breed_photo_url ?? undefined) : undefined}
                  esElMio={miBreed?.slug === b.slug}
                  onMark={(breed) => markMutation.mutate(breed.slug)}
                />
              ))}
              <FlipCard
                breed={MESTIZO}
                esElMio={miBreed?.slug === MESTIZO.slug}
                onMark={(breed) => markMutation.mutate(breed.slug)}
              />
            </div>
            <p className="mx-auto mt-5 max-w-lg rounded-2xl px-4 py-3 text-center font-semibold" style={{ background: "var(--surface-alt)" }}>
              ¿Y si no es ninguna? Puede que tu Wuawua sea mestizo, y eso no lo hace menos: es un ser vivo, con almita, y merece mucho amor, porque sí se lo merece. Es fiel y siempre te amó, te ama y te va a amar.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => startQuiz(quizPreset)}
                className="rounded-2xl px-4 py-3 font-extrabold"
                style={{ background: "var(--surface)", color: "var(--accent)", border: "2px solid var(--accent)" }}
              >
                Hacer el cuestionario otra vez
              </button>
              <button
                type="button"
                onClick={() => setSeccion("enciclopedia")}
                className="rounded-2xl px-4 py-3 font-extrabold"
                style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
              >
                Ver todas las tarjetas
              </button>
            </div>
          </section>
            ) : (
              <>
              <div className="mx-auto max-w-xl text-center">
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold min-[380px]:text-3xl">
                  ¿Qué Wuawua es?
                </h3>
                <p className="mx-auto mb-5 max-w-lg px-4 text-justify text-sm font-semibold" style={{ color: "var(--dim)" }}>
                  Responde el cuestionario: su tamaño, sus orejitas, su pelaje, sus colores, su colita y su boquita (hocico). Al terminar, aquí mismo te salen las tarjetas de las razas que podrían ser tu Wuawua.
                </p>
                <button
                  type="button"
                  onClick={() => startQuiz(tamanoSel)}
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-extrabold shadow-md"
                  style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                >
                  <SearchIcon className="h-5 w-5" />
                  Empezar el cuestionario
                </button>
                <p className="mx-auto mt-5 max-w-lg px-4 text-justify text-sm font-semibold" style={{ color: "var(--dim)" }}>
                  Si ya sabes qué raza es, búscala aquí abajo con la lupa o entra a su sección por tamaño. Y si elegiste una sección por tamaño, el cuestionario se queda solo en ese tamaño.
                </p>
              </div>

              <div className="mt-8">
                <div
                  className="mx-auto flex max-w-xl items-center gap-2 rounded-full px-4 py-2"
                  style={{ background: "var(--surface)", border: "2px solid var(--border)" }}
                >
                  <SearchIcon className="h-5 w-5 shrink-0" />
                  <input
                    type="search"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Busca por nombre: Pug, Labrador, Husky…"
                    aria-label="Buscar raza por nombre"
                    className="w-full bg-transparent font-semibold outline-none"
                    style={{ color: "var(--text)" }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Secciones por tamaño">
                  <button
                    type="button"
                    aria-pressed={false}
                    onClick={() => setSeccion("enciclopedia")}
                    className="rounded-full px-4 py-2 font-extrabold"
                    style={{
                      background: "var(--surface)",
                      color: "var(--text)",
                      border: "2px solid var(--accent)",
                    }}
                  >
                    Todos
                  </button>
                  {(["pequeno", "mediano", "grande"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={tamanoSel === t}
                      onClick={() => setTamanoSel(t)}
                      className="rounded-full px-4 py-2 font-extrabold"
                      style={{
                        background: tamanoSel === t ? "var(--accent)" : "var(--surface)",
                        color: tamanoSel === t ? "var(--accent-ink)" : "var(--text)",
                        border: "2px solid var(--accent)",
                      }}
                    >
                      {TAMANO_LABEL[t]}
                    </button>
                  ))}
                </div>
                {tamanoSel ? (
                  <p className="mt-2 text-center text-sm font-semibold" style={{ color: "var(--dim)" }}>
                    {TAMANO_LABEL[tamanoSel]}: {TAMANO_RANGO[tamanoSel]} (el tamaño es por estatura, no por peso)
                  </p>
                ) : null}
                {buscando ? (
                  resultadosBusqueda.length > 0 ? (
                    <>
                      <p className="mt-4 text-center text-sm font-semibold" style={{ color: "var(--dim)" }}>
                        {resultadosBusqueda.length === 1
                          ? `1 tarjeta para "${busqueda.trim()}"`
                          : `${resultadosBusqueda.length} tarjetas para "${busqueda.trim()}"`}
                      </p>
                      <div className="mt-6">
                        <CardGrid
                          breeds={resultadosBusqueda}
                          resetKey={`busqueda:${textoBusqueda}:${tamanoSel ?? "todos"}`}
                          fotoFor={(b) => (b.slug === "red-nose-pitbull" ? (profile?.breed_photo_url ?? undefined) : undefined)}
                          miSlug={miBreed?.slug ?? null}
                          onMark={(breed) => markMutation.mutate(breed.slug)}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="mx-auto mt-6 max-w-md rounded-2xl px-4 py-3 text-center font-semibold" style={{ background: "var(--surface-alt)" }}>
                      No se encontró ninguna raza con el nombre "{busqueda.trim()}". Revisa cómo lo escribiste o prueba con una parte del nombre, por ejemplo "Labrador".
                    </p>
                  )
                ) : tamanoSel ? (
                  <div className="mt-6">
                    <CardGrid
                      breeds={BREEDS.filter((b) => b.tamano === tamanoSel)}
                      resetKey={`tamano:${tamanoSel}`}
                      fotoFor={(b) => (b.slug === "red-nose-pitbull" ? (profile?.breed_photo_url ?? undefined) : undefined)}
                      miSlug={miBreed?.slug ?? null}
                      onMark={(breed) => markMutation.mutate(breed.slug)}
                    />
                  </div>
                ) : null}
              </div>
              </>
            )}
          </section>
        ) : null}

        {/* ---- Enciclopedia: solo las tarjetas ---- */}
        {seccion === "enciclopedia" ? (
          <section aria-label="Enciclopedia de razas" className="mt-2">
            <CardGrid
              breeds={[...BREEDS, MESTIZO]}
              resetKey="enciclopedia"
              fotoFor={(b) => (b.slug === "red-nose-pitbull" ? (profile?.breed_photo_url ?? undefined) : undefined)}
              miSlug={miBreed?.slug ?? null}
              onMark={(breed) => markMutation.mutate(breed.slug)}
            />
          </section>
        ) : null}

        {/* ---- Configuración: temas y colores ---- */}
        {seccion === "ajustes" ? (
        <>
        <section aria-label="Temas y colores" className="mx-auto mt-2 w-full max-w-xl">
          <h3 className="mb-3 text-center font-[family-name:var(--font-display)] text-2xl font-bold">Personaliza Mi Wuawua</h3>
          <p className="mb-3 text-center text-sm font-semibold" style={{ color: "var(--dim)" }}>
            Elige tu color y tu modo: claro, oscuro o el del sistema. El color que elijas se queda en los tres modos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Color del tema">
            {THEME_COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={theme.color === c.value}
                aria-label={`Color ${c.label}`}
                onClick={() => setTheme((t) => ({ ...t, color: c.value }))}
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  background: c.value,
                  border: theme.color === c.value ? "3px solid var(--text)" : "3px solid transparent",
                }}
              >
                {theme.color === c.value ? <PawIcon className="h-5 w-5 text-white" /> : null}
              </button>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-2" role="group" aria-label="Modo claro u oscuro">
            {(["claro", "oscuro", "sistema"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={theme.mode === m}
                onClick={() => setTheme((t) => ({ ...t, mode: m }))}
                className="rounded-full px-4 py-2 font-extrabold capitalize"
                style={{
                  background: theme.mode === m ? "var(--accent)" : "var(--surface)",
                  color: theme.mode === m ? "var(--accent-ink)" : "var(--text)",
                  border: "2px solid var(--accent)",
                }}
              >
                {m === "sistema" ? "Del sistema" : m}
              </button>
            ))}
          </div>
        </section>
        </>
        ) : null}

        {/* ---- Demo ---- */}
        {seccion === "demo" ? (
        <section aria-label="Cómo usar Mi Wuawua" className="mx-auto mt-2 w-full max-w-xl">
          <h3 className="mb-3 text-center font-[family-name:var(--font-display)] text-2xl font-bold">Cómo usar Mi Wuawua</h3>
          <ol className="grid gap-3">
            {[
              "Abajo está el menú de la app, con 5 secciones:\n1.- Enciclopedia (el librito).\n2.- Identificar (la lupa).\n3.- Inicio (la patita).\n4.- Demo (esta sección).\n5.- Configuración (el engrane).",
              "En la Enciclopedia, están las tarjetas de la mayoría de las razas, para que las disfrutes y además, ya tienes la colección completa de Wuawuas.",
              "Si ya sabes qué raza es tu Wuawua, ve a Identificar: búscala con la lupa o entra a su sección por tamaño: Pequeños, Medianos o Grandes. Y si no sabes o sospechas cuál es, ahí mismo haz el cuestionario: responde sobre su tamaño, orejitas, pelaje, colores, colita y boquita (hocico), y te salen solo las tarjetas que podrían ser tu Wuawua.",
              "Toca cualquier tarjeta para voltearla y checar su estatura, vida y peso aproximados, su origen y sus cuidados.",
              "En la tarjeta que elijas, si le das a la patita, automáticamente se llena la información de tu Wuawua con los datos de su raza. No te preocupes, si le das sin querer a una patita y no era, siempre puedes darle a la correcta.",
              "En Inicio, ya solo resta subir su foto a la tarjeta personal de tu Wuawua y si tienes datos que desees incluir, puedes escribirlo siempre en la parte de sus notas. Y listo la app Mi Wuawua queda personalizada.",
              "En Configuración, puedes cambiar el color y tema de la app a claro, oscuro o como está configurado el sistema de tu celular, a tu gusto. Además, también se encuentran los créditos y una opción por si me gustas apoyar, para que sigamos mejorando.",
            ].map((paso, i) => {
              const lineas = paso.split("\n");
              const intro = lineas[0] ?? paso;
              const lista = lineas.slice(1).join("\n");
              return (
              <li key={paso} className="flex gap-3 rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-lg font-bold"
                  style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  {i === 0 ? (
                    <>
                      <p className="font-semibold text-justify">{intro}</p>
                      <p className="font-semibold whitespace-pre-line">{lista}</p>
                    </>
                  ) : (
                    <p className="font-semibold text-justify whitespace-pre-line">{paso}</p>
                  )}
                </div>
              </li>
              );
            })}
          </ol>
        </section>
        ) : null}

        {/* ---- Configuración: donativo y créditos ---- */}
        {seccion === "ajustes" ? (
        <>
        <section aria-label="Donativo" className="mx-auto mt-10 w-full max-w-xl rounded-3xl p-6 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <PawIcon className="mx-auto mb-2 h-8 w-8 text-[var(--accent)]" />
          <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold">La app Mi Wuawua, es gratis por amor a ellos</h3>
          <p className="px-4 font-semibold text-justify sm:px-6">
            Si gustas apoyar el esfuerzo y dedicación de esta app, tú como amante de los Wuawuas, puedes dar un donativo mediante CoDi, solo escanéalo desde tu app bancaria, ya que con la cámara normal no sirve. Solo entra a CoDi, elige pagar con CoDi, escanear QR y listo, tú eliges la cantidad 🐶. <strong>SIGAMOS AMANDO Y CUIDANDO A LOS WUAWUAS.</strong>
          </p>
          <div className="mt-4 flex justify-center rounded-2xl bg-white p-4">
            <img
              src={codiQr}
              alt="Código QR CoDi para dar un donativo a Mi Wuawua"
              className="w-full max-w-sm"
              style={{ aspectRatio: "1 / 1", objectFit: "contain" }}
            />
          </div>
        </section>

        {/* ---- Créditos ---- */}
        <footer className="mx-auto mt-10 w-full max-w-xl text-center" style={{ color: "var(--dim)" }}>
          <p className="text-sm font-semibold">© 2026 Ing. Emmanuel Salomón Santiago Bustamante. Hecho en México.</p>
          <p className="mt-3 text-sm font-semibold">
            Aviso: Mi Wuawua es una enciclopedia para identificar la raza de tu Wuawua. Si tu Wuawua se siente algo raro, consúltalo con el veterinario. Y no te olvides, ámalo siempre y mucho.
          </p>
          <p className="mt-3 text-xs">
            Esta app está diseñada para personas que consideran a su Wuawua como un familiar más y lo aman mucho.
          </p>
        </footer>
        </>
        ) : null}
      </div>
      </div>

      {/* ---- Menú inferior: las cinco secciones. Vive fuera del
           contenedor que se desplaza, como la barra de pestañas de
           una app: por eso sus botones reciben el toque aunque la
           lista se esté corriendo sola por inercia. ---- */}
      <nav
        aria-label="Menú de secciones de Mi Wuawua"
        className="relative z-50 shrink-0 px-2 pt-2 min-[380px]:px-3"
        style={{ paddingBottom: "0.6rem" }}
      >
        <div
          className="mx-auto flex w-full max-w-xl items-center gap-1 rounded-full p-1.5 shadow-2xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <NavButton active={seccion === "enciclopedia"} onPressStart={() => { if (seccion === "enciclopedia") { slidePageToTop(); } }} onClick={() => { if (seccion === "enciclopedia") { slidePageToTop(); } else { setSeccion("enciclopedia"); } }} label="Enciclopedia">
            <BookIcon className="h-6 w-6" />
          </NavButton>
          <NavButton active={seccion === "identificar"} onClick={() => { setTamanoSel(null); setSeccion("identificar"); }} label="Identificar">
            <SearchIcon className="h-6 w-6" />
          </NavButton>
          <NavButton home active={seccion === "inicio"} onClick={() => setSeccion("inicio")} label="Inicio">
            <PawIcon className="h-9 w-9" />
          </NavButton>
          <NavButton active={seccion === "demo"} onClick={() => setSeccion("demo")} label="Demo">
            <PlayIcon className="h-6 w-6" />
          </NavButton>
          <NavButton active={seccion === "ajustes"} onClick={() => setSeccion("ajustes")} label="Configuración">
            <GearIcon className="h-6 w-6" />
          </NavButton>
        </div>
      </nav>
    </div>
  );
}
