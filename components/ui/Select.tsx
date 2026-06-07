"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

/* ============================================================================
   Select — combobox custom (WAI-ARIA listbox)
   ----------------------------------------------------------------------------
   Reemplaza al <select> nativo porque la lista desplegable del nativo es
   OS-controlled (hover azul, fuente del sistema, paddings del SO) y no se
   puede estilizar desde CSS aunque usemos appearance-none.
   ========================================================================== */

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type SelectProps<T extends string> = {
  id?: string;
  /** Valor actual. `""` o `undefined` = placeholder visible. */
  value: T | "" | undefined;
  /** Se llama con el nuevo valor cuando el usuario elige una opción. */
  onChange: (value: T) => void;
  /** Para integración con React Hook Form (Controller). */
  onBlur?: () => void;
  options: SelectOption<T>[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

export function Select<T extends string>({
  id,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Seleccioná una opción",
  invalid,
  describedBy,
  className,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const listboxId = id ? `${id}-listbox` : `${generatedId}-listbox`;

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  /* Cerrar al hacer click fuera del trigger o del panel */
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        listRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  /* Selecciona opción y devuelve foco al trigger (patrón ARIA) */
  const selectOption = useCallback(
    (idx: number) => {
      const opt = options[idx];
      if (!opt || opt.disabled) return;
      onChange(opt.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onChange, options],
  );

  /* Keyboard nav — estándar WAI-ARIA para listbox */
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        } else {
          setActiveIndex((i) =>
            i < 0 ? 0 : Math.min(i + 1, options.length - 1),
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActiveIndex(
            selectedIndex >= 0 ? selectedIndex : options.length - 1,
          );
        } else {
          setActiveIndex((i) =>
            i < 0 ? options.length - 1 : Math.max(i - 1, 0),
          );
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        } else if (activeIndex >= 0) {
          selectOption(activeIndex);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div className={cn("relative", className)}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "bg-transparent border-b text-left text-base",
          "py-2.5 pr-9 transition-colors duration-200",
          "focus:outline-none",
          invalid
            ? "border-red-500"
            : open
              ? "border-[var(--color-accent)]"
              : "border-[var(--color-border-medium)] hover:border-[var(--color-accent)]/40",
        )}
      >
        <span
          className={cn(
            "truncate",
            selectedOption
              ? "text-[var(--color-text-primary)]"
              : "text-[var(--color-text-tertiary)]",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "w-4 h-4 shrink-0 transition-transform duration-200",
            open ? "rotate-180" : "",
            invalid
              ? "text-red-500"
              : open
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-text-tertiary)]",
          )}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-activedescendant={
              activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined
            }
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute left-0 right-0 top-full mt-2 z-50",
              "bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)]",
              "rounded-sm shadow-lg overflow-hidden",
              "max-h-72 overflow-y-auto",
            )}
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === activeIndex;
              return (
                <li
                  key={opt.value}
                  id={`${listboxId}-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onClick={() => selectOption(i)}
                  className={cn(
                    "flex items-center justify-between gap-3",
                    "px-4 py-2.5 text-sm cursor-pointer",
                    "transition-colors duration-100",
                    "text-[var(--color-text-primary)]",
                    !opt.disabled && "hover:bg-[var(--color-bg-primary)]",
                    !opt.disabled &&
                      isActive &&
                      "bg-[var(--color-bg-primary)]",
                    opt.disabled && "opacity-40 cursor-not-allowed",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check
                      className="w-4 h-4 shrink-0 text-[var(--color-accent)]"
                      strokeWidth={2.5}
                    />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
