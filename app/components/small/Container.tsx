import type { Children } from '~/types/components.types';

export const Container = ({ children }: Children) => (
  <section className="p-4 pt-[40px] md:px-10 lg:px-24 flex flex-col gap-8">{children}</section>
);
