import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../context/auth";

function Catch(props) {
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [bait, setBait] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [fish, setFish] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weathercondition, setWeatherCondition] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const { setAuthTokens } = useAuth();
  

  function postCatch() {
    axios.post('/catch', {
      location,
      weight,
      length,
      bait,
      time,
      date,
      fish,
      temperature,
      weathercondition
    }) 
    }
  


  return (
    <Card>
      <Form>
        <Input
          type="number"
          value={location}
          onChange={e => {
            setLocation(e.target.value);
          }}
          placeholder="coordinates"
        />
        <Input
          type="number"
          value={weight}
          onChange={e => {
            setWeight(e.target.value);
          }}
          placeholder="weight in ounces"
        />
        <Input
          type="number"
          value={length}
          onChange={e => {
            setLength(e.target.value);
          }}
          placeholder="length in inches"
        />
        <Input
          type="text"
          value={bait}
          onChange={e => {
            setBait(e.target.value);
            console.log(e.target.value)
          }}
          placeholder="type of bait"
        /><Input
        type="time"
        value={time}
        onChange={e => {
          setTime(e.target.value);
        }}
        placeholder="time"
      />
      <Input
        type="date"
        value={date}
        onChange={e => {
          setDate(e.target.value);
        }}
        placeholder="date"
      /><Input
      type="text"
      value={fish}
      onChange={e => {
        setFish(e.target.value);
      }}
      placeholder="what fish"
    />
    <Input
      type="number"
      value={temperature}
      onChange={e => {
        setTemperature(e.target.value);
      }}
      placeholder="in fahrenheit"
    />
    <Input
      type="text"
      value={weathercondition}
      onChange={e => {
        setWeatherCondition(e.target.value);
        console.log(e.target.value);
      }}
      placeholder="sunny? cloudy? rainy?"
    />

        <Button onClick={postCatch}>Post your catch</Button>
      </Form>
    </Card>
    
  
  );
}


    // return (
    //   <div className="Home">
    //     <div className="lander">
    //       <h1>Home page</h1>
    //       <p>A simple app showing react button click navigation</p>
    //       <form>
    //         {/* <Button onClick={() => history.push('/Signup')}>Back to the Dashboard</Button> */}
    //       </form>
    //     </div>
    //   </div>
    // );
  



export default Catch;