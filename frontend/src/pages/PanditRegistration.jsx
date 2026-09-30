
import { useState } from "react";

function PanditRegistration() {
  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    city: "",
    village: "",
    experience: "",
    availability: "",
  });

  const [services, setServices] = useState([]);

  const serviceOptions = [
    "Puja",
    "Marriage Ceremony",
    "Ganesh Puja",
    "Satyanarayan Puja",
    "Festival Services",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (service) => {
    if (services.includes(service)) {
      setServices(
        services.filter((item) => item !== service)
      );
    } else {
      setServices([...services, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/pandits",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,
            services,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Application failed");
        return;
      }

      alert("Pandit application submitted successfully!");

      setForm({
        name: "",
        mobileNumber: "",
        city: "",
        village: "",
        experience: "",
        availability: "",
      });

      setServices([]);

    } catch (error) {
      console.error("Pandit application error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="pandit-registration">

      <h1>Pandit Registration</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          value={form.village}
          onChange={handleChange}
          required
        />

        <h3>Services</h3>

        {serviceOptions.map((service) => (
          <label key={service}>
            <input
              type="checkbox"
              checked={services.includes(service)}
              onChange={() =>
                handleServiceChange(service)
              }
            />

            {service}
          </label>
        ))}

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={form.availability}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Submit Application
        </button>

      </form>

    </div>
  );
}

export default PanditRegistration;

