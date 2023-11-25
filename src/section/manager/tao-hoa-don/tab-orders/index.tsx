import Checkout from "section/manager/tao-hoa-don/checkout";
import ListOrders from "section/manager/tao-hoa-don/orders";

import { GetProductOutput } from "@custom-types/manager";
import { ContentLeft, ContentOrder, ContentRight, TabsOrderWrapper } from "./styled";

interface TabsOrderProps {
  currentKeyOrder: string;
  handleRemoveItemCarts: any;
  dataCurrentOrder: GetProductOutput[];
  onReview: () => void;
  onSaveCart: (type: string) => void;
}

const TabsOrder = ({
  onSaveCart,
  currentKeyOrder,
  dataCurrentOrder,
  handleRemoveItemCarts,
  onReview,
}: TabsOrderProps) => {
  return (
    <TabsOrderWrapper>
      <ContentOrder className="mt-24">
        <ContentLeft>
          <ListOrders
            onSaveCart={onSaveCart}
            currentKeyOrder={currentKeyOrder}
            lists={dataCurrentOrder}
            onClose={handleRemoveItemCarts}
          />
        </ContentLeft>

        <ContentRight>
          <Checkout onReview={onReview} lists={dataCurrentOrder} />
        </ContentRight>
      </ContentOrder>
    </TabsOrderWrapper>
  );
};

export default TabsOrder;
