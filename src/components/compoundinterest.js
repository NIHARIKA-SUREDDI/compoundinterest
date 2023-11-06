import React, { useEffect, useState } from "react";
import "../styles/compoundinterest.css";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Chart } from "react-google-charts";



function CompoundInterest() {



  const [principal, setPrincipal] = useState(1000);
  const [Rateofinterest, setRateofinterest] = useState(1);
  const [Timeperiod, setTimeperiod] = useState(1);
  const [compoundFrequency, setCompoundFrequency] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Yearly');

  useEffect(() => {
    setCompoundFrequency(1); 
    setSelectedOption('Yearly'); 
  }, []);

  const CompoundInterest = principal * Math.pow((1 + (Rateofinterest / 100) / compoundFrequency), (compoundFrequency * Timeperiod));

  const interest = CompoundInterest - principal;
  const totalAmount = principal + interest;



  const data = [
    ["Task", "Compound Interest Calculator"],
    ["Principal", principal],
    ["Interest", interest],

  ]

  const options = {
    title: "compound Interest Piechart",
    is3D: true,
  };
  
  const handleOption = (compoundFrequency, selectedOption) => {
    setSelectedOption(selectedOption);
    setCompoundFrequency(compoundFrequency);
  };


  return (
    <div className="container">
      <h1>Compound Interest Calculator</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ border: '1px solid', borderRadius: '.5rem', padding: '10px' }}>
          <div className="container-form">
            <div className="circle">
              <span className="interest-fields">
                <p>Principal Amount</p>

                <div className="container-form-input">
                  <span>₹</span>
                  <input
                    value={principal}
                    onChange={(e) => {
                      console.log(typeof e.target.value)
                      if (e.target.value < 1000 || e.target.value > 10000000) {
                        return;
                      }
                      setPrincipal(Number(e.target.value))

                    }}


                  />
                </div>

              </span>
              <Slider
                min={1000}
                max={10000000}
                value={principal}
                onChange={(value) => {
                  setPrincipal(value);
                }}
              />

            </div>
            <div className="title">
              <span className="interest-fields">
                <p>Rate of Interest(p.a)</p>

                <div className="container-form-input">
                  <input
                    value={Rateofinterest}
                    onChange={(e) => {
                      if (e.target.value < 1 || e.target.value > 50) {
                        return;
                      }
                      setRateofinterest(e.target.value)
                    }}

                  />
                  <span>%</span>
                </div>
              </span>
              <Slider

                min={1}
                max={50}
                value={Rateofinterest}
                onChange={(value) => {
                  setRateofinterest(value);
                }}
              />
            </div>
            <div className="box">
              <span className="interest-fields">
                <p>Timeperiod</p>
                <div className="container-form-input">
                  <input
                    value={Timeperiod}
                    onChange={(e) => {
                      if (e.target.value < 1 || e.target.value > 30) {
                        return;
                      }
                      setTimeperiod(e.target.value)
                    }} />
                  <span>Yr</span>
                </div>
              </span>
              <Slider
                min={1}
                max={30}
                value={Timeperiod}
                onChange={(value) => {
                  setTimeperiod(value);
                }}
              />
            </div>

          </div>



          <div className="sample">
            <p><span>Compounding Frequency</span>



              <select style={{ border: 'none', padding: '.1rem' }} onChange={(e) => handleOption(Number(e.target.value),)}>
                <option value="1">Yearly</option>
                <option value="2">Half_Yearly</option>
                <option value="4">Quarterly</option>
              </select>
            </p>


            <p><span>Principal amount </span><span>₹{principal.toLocaleString("en-In")}</span></p>

            <p><span>Total Interest </span><span>₹{Math.round(interest).toLocaleString("en-IN")}</span></p>
            <p><span>Total amount </span><span>₹{Math.round(totalAmount).toLocaleString("en-IN")}</span></p>

          </div>

        </div>

        <div>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>

    </div>



  );
}

export default CompoundInterest;