import { MockState } from '../types';

export const PROJECTS_KEY = 'mockchat_projects';
export const CURRENT_KEY = 'mockchat_current_state';
export const MAX_PROJECTS = 5;

export interface StoredProject {
  state: MockState;
  savedAt: number; // timestamp
}

/**
 * Lee proyectos guardados (máx 10, LRU). Soporta formato legacy MockState[] y nuevo StoredProject[]
 */
export function getProjects(): StoredProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // migrar si es MockState[] puro
    if (parsed.length > 0 && (parsed[0] as any).state === undefined && (parsed[0] as any).platform !== undefined) {
      return (parsed as unknown as MockState[]).map((s, i) => ({
        state: s,
        savedAt: Date.now() - (parsed.length - i) * 1000,
      }));
    }
    return parsed as StoredProject[];
  } catch {
    return [];
  }
}

function persistProjects(projects: StoredProject[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

/**
 * Guarda/actualiza un proyecto. Si existe mismo id lo mueve al frente (más reciente).
 * Si supera MAX_PROJECTS elimina el más viejo (último).
 * Retorna lista actualizada.
 */
export function saveProject(state: MockState, opts?: { asNew?: boolean }): StoredProject[] {
  const now = Date.now();
  // clonar para evitar mutar
  const snapshot: MockState = JSON.parse(JSON.stringify(state));
  // asegurar id y title
  if (!snapshot.id || opts?.asNew) snapshot.id = `mock-${now}-${Math.random().toString(36).slice(2,6)}`;
  if (!snapshot.title) snapshot.title = snapshot.platform || 'Mock sin título';
  // si se guarda como nuevo, cambiar título para diferenciar
  if (opts?.asNew && !snapshot.title.includes('(copia')) {
    // mantener título original, se diferenciará por fecha
  }

  let projects = getProjects();
  if (opts?.asNew) {
    // crear nueva entrada sin borrar la anterior
    projects.unshift({ state: snapshot, savedAt: now });
  } else {
    // actualizar existente: quitar duplicado y poner al frente
    projects = projects.filter((p) => p.state.id !== snapshot.id);
    projects.unshift({ state: snapshot, savedAt: now });
  }
  // evicción LRU: mantener solo MAX_PROJECTS
  if (projects.length > MAX_PROJECTS) {
    projects = projects.slice(0, MAX_PROJECTS);
  }
  persistProjects(projects);
  // también sincronizar current
  localStorage.setItem(CURRENT_KEY, JSON.stringify(snapshot));
  return projects;
}

/** Guarda como nueva creación (fuerza nuevo id) para historial de 5 */
export function saveAsNewProject(state: MockState): StoredProject[] {
  return saveProject(state, { asNew: true });
}

export function deleteProject(id: string): StoredProject[] {
  let projects = getProjects();
  projects = projects.filter((p) => p.state.id !== id);
  persistProjects(projects);
  return projects;
}

export function clearProjects() {
  localStorage.removeItem(PROJECTS_KEY);
}

export function getCurrentStateFallback(defaultState: MockState): MockState {
  try {
    const saved = localStorage.getItem(CURRENT_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultState;
}
