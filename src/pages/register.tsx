import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "@/firebase";
import { ref, set } from "firebase/database";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().nullable().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values: RegisterFormValues, { setSubmitting, setFieldError }: any) => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
  
      // Store user data in Realtime Database
      const user = userCredential.user;
      const userRef = ref(database, `users/${user.uid}`);
      
      // Customize the user data as needed
      const userData = {
        email: user.email,
        // Add other user properties...
      };
  
      // Set user data in the database
      await set(userRef, userData);
  
      console.log("User data stored in the database:", userData);
  
      toast.success("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("email-already-exists")) {
          setFieldError("email", "Email already in use");
          toast.error("Email already in use");
        } else {
          setFieldError("email", error.message);
          toast.error(error.message);
        }
      } else {
        console.error("Unexpected error", error);
      }
    } finally {
      setSubmitting(false);
    }
  };  

  const fadeAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster position="top-center" />
      <div className="flex flex-col gap-y-8 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeAnimation}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl text-black font-medium">Codename Ruka</h1>
        </motion.div>
        <div className="w-64 sm:w-80 md:w-[30rem] bg-neutral-300 rounded-lg flex flex-col items-center px-6 pb-6 pt-2 gap-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount
          >
            {({ isValid, isSubmitting }) => (
              <Form className="w-full space-y-6">
                <div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeAnimation}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-black text-base">Email Address</span>
                      </label>
                      <Field
                        type="text"
                        placeholder="Type here"
                        name="email"
                        className="input input-bordered bg-white !outline-neutral-500 shadow"
                      />
                      <ErrorMessage name="email" component="p" className="text-red-500" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeAnimation}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-black text-base">Password</span>
                      </label>
                      <Field
                        type="password"
                        placeholder="Type here"
                        name="password"
                        className="input input-bordered bg-white !outline-neutral-500 shadow"
                      />
                      <ErrorMessage name="password" component="p" className="text-red-500" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeAnimation}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-black text-base">Confirm Password</span>
                      </label>
                      <Field
                        type="password"
                        placeholder="Type here"
                        name="confirmPassword"
                        className="input input-bordered bg-white !outline-neutral-500 shadow"
                      />
                      <ErrorMessage name="confirmPassword" component="p" className="text-red-500" />
                    </div>
                  </motion.div>
                </div>
                <div className="flex justify-center">
                  <motion.button
                    className={`btn w-52 ${!isValid || isSubmitting
                      ? 'text-white cursor-not-allowed bg-gray-400 border-0 hover:bg-gray-400'
                      : 'text-white bg-[#28507d] hover:bg-[#1b2e49] border-2'
                    }`}
                    type="submit"
                    initial="hidden"
                    animate="visible"
                    variants={fadeAnimation}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    onClick={() => {
                      console.log("clicked");
                    }}
                  >
                    Sign up
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
