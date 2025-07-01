"use client";

import { Button as Btn } from "flowbite-react";

export const Button = ({
  children,
  ...rest
}: React.ComponentProps<typeof Btn>) => {
  return (
    <Btn color="blue" size={"xl"} {...rest}>
      {children}
    </Btn>
  );
};
