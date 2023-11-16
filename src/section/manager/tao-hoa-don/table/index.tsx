import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";

interface TabsOrderProps {
  data: any;
  setCurrentOrder: any;
}

const TabsOrder = ({ data, setCurrentOrder }: TabsOrderProps) => {
  return (
    <Tabs id="custom-animation">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab onClick={() => setCurrentOrder(value)} key={value} value={value}>
            <div className="flex items-center gap-2">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default TabsOrder;
