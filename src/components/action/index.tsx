import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

interface ActionProps {}

const Action = ({}: ActionProps) => {
  return (
    <Menu placement="left-start">
      <MenuHandler>
        <IconButton size="sm" variant="text" color="blue-gray">
          <EllipsisVerticalIcon strokeWidth={3} fill="currenColor" className="h-6 w-6" />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem>Action</MenuItem>
        <MenuItem>Another Action</MenuItem>
        <MenuItem>Something else here</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Action;
