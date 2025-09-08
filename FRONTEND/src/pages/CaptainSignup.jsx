import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    vehicleColor: '',
    vehiclePlate: '',
    vehicleCapacity: '',
    vehicleType: '',
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    const captainData = {
      fullname: {
        firstname: formData.firstName,
        lastname: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
        capacity: Number(formData.vehicleCapacity),
        vehicleType: formData.vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          vehicleColor: '',
          vehiclePlate: '',
          vehicleCapacity: '',
          vehicleType: '',
        });
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors([{ msg: err.response.data.message }]);
      } else {
        setErrors([{ msg: 'An unexpected error occurred.' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        {/* Error messages */}
        {errors.length > 0 && (
          <div className="mb-4">
            <ul className="text-red-600 text-sm">
              {errors.map((error, idx) => (
                <li key={idx}>{error.msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Logo */}
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver"
        />

        <form onSubmit={submitHandler}>
          {/* Name */}
          <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
          <div className="flex gap-4 mb-7">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            />
          </div>

          {/* Email */}
          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          />

          {/* Password */}
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          />

          {/* Vehicle Info */}
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              name="vehicleColor"
              type="text"
              placeholder="Vehicle Color"
              required
              value={formData.vehicleColor}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            />
            <input
              name="vehiclePlate"
              type="text"
              placeholder="Vehicle Plate"
              required
              value={formData.vehiclePlate}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            />
          </div>
          <div className="flex gap-4 mb-7">
            <input
              name="vehicleCapacity"
              type="number"
              placeholder="Vehicle Capacity"
              required
              value={formData.vehicleCapacity}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            />
            <select
              name="vehicleType"
              required
              value={formData.vehicleType}
              onChange={handleChange}
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
          >
            {loading ? 'Creating Account...' : 'Create Captain Account'}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{' '}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
