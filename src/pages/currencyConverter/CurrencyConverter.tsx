import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./currencyConverter.css";
import CustomSelect from "../../components/customSelect/CustomSelect";
import CustomButton from "../../components/CustomButton/CustomButton";

interface FormValues {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});
  const [conversionText, setConversionText] = useState<string>("");

  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://openexchangerates.org/api/currencies.json"
        );
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  const initialValues: FormValues = {
    amount: 0,
    fromCurrency: "",
    toCurrency: "",
  };

  const validateCurrency = (values: FormValues) => {
    const errors: { [key: string]: string } = {};
    if (!values.amount || values.amount === 0) {
      errors.amount = "Amount cannot be empty";
    } else if (values.amount < 0) {
      errors.amount = "Amount cannot be negative";
    } else if (!/^\d+(\.\d+)?$/.test(values.amount.toString())) {
      errors.amount = `${values.amount} is not a valid number`;
    }
    if (!values.fromCurrency) {
      errors.fromCurrency = "Please select a source currency";
    }
    if (!values.toCurrency) {
      errors.toCurrency = "Please select a target currency";
    }
    return errors;
  };

  const handleConvert = async (values: FormValues) => {
    try {
      const { amount, fromCurrency, toCurrency } = values;
      if (fromCurrency === toCurrency) {
        alert("Please select two different currencies.");
        return;
      }
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      if (!rate) {
        alert("Conversion rate not available for selected currencies.");
        return;
      }
      const convertedAmount = amount * rate;
      setConversionText(
        `${amount} ${fromCurrency} is equivalent to ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`
      );

      setTimer(600);

      if (intervalId) clearInterval(intervalId);

      const newIntervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(newIntervalId);
            setConversionText("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setIntervalId(newIntervalId);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  const options = Object.entries(currencies).map(([code, name]) => {
    console.log("codes", code);
    const countryCode = code.slice(0, 2).toLowerCase();
    const flagUrl = `https://flagcdn.com/16x12/${countryCode}.png`;
    return {
      value: code,
      label: (
        <div className="countryList">
          {countryCode && (
            <img src={flagUrl} alt={code} className="countryFlag" />
          )}
          {code}/{name}
        </div>
      ),
    };
  });

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="currencyCard">
      <Formik
        initialValues={initialValues}
        validate={validateCurrency}
        onSubmit={handleConvert}
      >
        {(formikProps) => (
          <Form>
            <div>
              <label htmlFor="amount" className="currencyLabel">
                Amount
              </label>
            </div>
            <div className="currencyInput">
              <Field
                id="amount"
                name="amount"
                type="number"
                className="inputField"
              />
            </div>
            <ErrorMessage name="amount" component="div" className="error" />

            <div className="countryInput">
              <CustomSelect
                options={options}
                value={
                  options.find(
                    (opt) => opt.value === formikProps.values.fromCurrency
                  ) || null
                }
                onChange={(selectedOption: any) =>
                  formikProps.setFieldValue(
                    "fromCurrency",
                    selectedOption.value
                  )
                }
                placeholder="Search Currency"
              />
            </div>
            <ErrorMessage
              name="fromCurrency"
              component="div"
              className="error"
            />

            <div className="countryInput">
              <CustomSelect
                options={options}
                value={
                  options.find(
                    (opt) => opt.value === formikProps.values.toCurrency
                  ) || null
                }
                onChange={(selectedOption: any) =>
                  formikProps.setFieldValue("toCurrency", selectedOption.value)
                }
                placeholder="Search Currency"
              />
            </div>
            <ErrorMessage name="toCurrency" component="div" className="error" />

            {conversionText && (
              <div className="result">
                <h3>{conversionText}</h3>
                <div className="timer">
                  {timer > 0 && <p>Expires in: {formatTime(timer)}</p>}
                </div>
              </div>
            )}

            <div>
              <CustomButton
                type="submit"
                className="convertbtn"
                disabled={formikProps.isSubmitting}
                title="Convert"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CurrencyConverter;
