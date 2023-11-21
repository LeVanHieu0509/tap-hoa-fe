import { Col, Row } from "styles/common";
import { FormContainer, FormWrapper } from "./styled";
import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import DropDown from "components/dropdown-fieldset";
import { formatCurrency } from "utils/format-value";

interface FormProps {
  listInput: any;
  modifiedData: any;
  onChange: (a: any, b: any) => void;
}

const FormInput = ({ listInput, modifiedData, onChange }: FormProps) => {
  return (
    <FormWrapper>
      <FormContainer>
        {listInput.map((row: any, key: number) => (
          <Row rowGap={24} rowGapMb={16} key={key}>
            {row.map((col: any, index: number) => (
              <Col key={index} md={row.length == 1 ? 12 : 6} sm={12}>
                {col.type == "input" ? (
                  <div>
                    <Input
                      label={col.label}
                      crossOrigin
                      size="lg"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: " ml-4 before:content-none after:content-none",
                      }}
                      value={modifiedData[col.name]}
                      onChange={(e) => onChange(col.name, e.target.value)}
                      type={col.subType}
                      placeholder={col.placeHolder}
                      containerProps={{ className: "min-w-[100px]" }}
                    />

                    {col.format == "money" ? (
                      <span style={{ fontSize: "10px", height: "8px" }}>{formatCurrency(modifiedData[col.name])}</span>
                    ) : null}
                  </div>
                ) : null}

                {col.type == "textarea" ? (
                  <Textarea
                    value={modifiedData[col.name]}
                    label={col.label}
                    variant="static"
                    onChange={(e) => onChange(col.name, e.target.value)}
                    rows={3}
                    resize={true}
                    placeholder={col.placeHolder}
                    containerProps={{
                      className: "grid h-full",
                    }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: " ml-4 mt-2 before:content-none after:content-none",
                    }}
                  />
                ) : null}

                {col.type == "select" ? (
                  <Select
                    labelProps={{
                      className: " ml-4  before:content-none after:content-none",
                    }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    value={col.listDropdown.find((item: any) => item.key === modifiedData[col.name])?.value}
                    onChange={(e) => onChange(col.name, e)}
                    variant="outlined"
                    label={col.label}
                  >
                    {col.listDropdown.map((item, key) => (
                      <Option key={key} value={item.value}>
                        {item.key}
                      </Option>
                    ))}
                  </Select>
                ) : null}

                {col.type == "dropdown" ? (
                  <DropDown
                    title={col.label}
                    onChange={(e) => onChange(col.name, e)}
                    list={col.listDropdown}
                    value={col.listDropdown.find((item: any) => item.key === modifiedData[col.name])?.value}
                  />
                ) : null}
              </Col>
            ))}
          </Row>
        ))}
      </FormContainer>
    </FormWrapper>
  );
};

export default FormInput;
