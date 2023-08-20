import * as Popover from "@radix-ui/react-popover";
import { ReactNode } from "react";

const Index = ({
  trigger,
  children,
}: {
  trigger?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger>{trigger}</Popover.Trigger>
      <Popover.Content className="search-filter mr-[1px] mt-2 h-[calc(100vh_-_133px)] w-[99.5vw] overflow-y-scroll rounded-lg border-2 border-gray-300 bg-white p-2.5 px-5 shadow-sm drop-shadow-sm sm:px-10 lg:w-[29.75vw] lg:px-2.5">
        {children}
      </Popover.Content>
    </Popover.Root>
  );
};

export default Index;
