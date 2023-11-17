import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { motion } from "framer-motion";

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
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log(userCredential);
    } catch (error) {
      if (error instanceof Error) {
        setFieldError("email", error.message);
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
      <div className="flex flex-col gap-y-8 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeAnimation}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl text-white font-medium">Codename Ruka</h1>
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
                  className={`btn w-52 ${!isValid || isSubmitting ? 'text-white cursor-not-allowed bg-gray-400 border-0 hover:bg-gray-400' : 'text-white bg-[#28507d] hover:bg-[#1b2e49] border-2'}`}
                  type="submit"
                  initial="hidden"
                  animate="visible"
                  variants={fadeAnimation}
                  transition={{ delay: 0.8, duration: 0.6 }}
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
