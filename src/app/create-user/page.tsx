"use client"; // This marks the component as a client-side component

import { user } from "@/types/types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateUserForm = () => {
  const {
    register, // Register inputs
    handleSubmit, // Handle form submission
    formState: { errors }, // Get form errors
    reset,
  } = useForm<user>(); // Generic type for the form data

  const onSubmit = async (data: user) => {
    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      toast.success("User created successfully");
      reset();
      console.log("User created successfully:", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8 container-bg-design">
      <div className="w-[70%] mx-auto">
        <h3 className="text-3xl font-semibold text-center text-gray-100 mb-8">
          Create User
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm text-gray-100">
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm text-gray-100">
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* UID */}
          <div>
            <label htmlFor="uid" className="block text-sm text-gray-100">
              UID
            </label>
            <input
              id="uid"
              {...register("uid", { required: "UID is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.uid && (
              <p className="text-red-500 text-sm">{errors.uid.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm text-gray-100">
              Age
            </label>
            <input
              id="age"
              type="number"
              {...register("age", { required: "Age is required", min: 18 })}
              className="w-full p-2 border rounded"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm text-gray-100">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm text-gray-100">
              Country
            </label>
            <input
              id="country"
              {...register("country", { required: "Country is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm text-gray-100">
              City
            </label>
            <input
              id="city"
              {...register("city", { required: "City is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm text-gray-100"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-100">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: /^\S+@\S+$/i,
              })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Work */}
          <div>
            <label htmlFor="work" className="block text-sm text-gray-100">
              Work
            </label>
            <input
              id="work"
              {...register("work", { required: "Work is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.work && (
              <p className="text-red-500 text-sm">{errors.work.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
