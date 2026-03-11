export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const dark = (className: string) => `dark:${className}`;

export const transitions = {
  default: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
};

export const shadows = {
  card: 'shadow-[0_2px_1px_-1px_rgba(0,0,0,.2),_0_1px_1px_0_rgba(0,0,0,.14),_0_1px_3px_0_rgba(0,0,0,.12)]',
  cardHover: 'shadow-[0_8px_16px_rgba(0,0,0,0.15)]',
};
