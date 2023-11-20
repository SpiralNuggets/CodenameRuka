import React, {useState, useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {

  const [cookies, setCookie] = useCookies(["user"])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().nullable().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: LoginFormValues, { setSubmitting, setFieldError }: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log(userCredential);
      toast.success("Logged in successfully!");
      if (userCredential.user) {
        setCookie("user", userCredential.user, { // im putting the whole user object in the cookie
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });

        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("invalid-login-credentials")) {
          setFieldError("email", "Invalid login credentials");
          toast.error("Invalid login credentials");
        }
      } else {
        console.error("Unexpected error", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  const fadeAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
      <div className="h-screen flex justify-center items-center">
        <Toaster
        position="top-center"
        />
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
                </div>
                <div className="flex justify-center">
                  <motion.button
                    className={`btn w-52 ${!isValid || isSubmitting ? 'text-white cursor-not-allowed bg-gray-400 border-0 hover:bg-gray-400' : 'text-white bg-[#28507d] hover:bg-[#1b2e49] border-2'}`}
                    type="submit"
                    initial="hidden"
                    animate="visible"
                    variants={fadeAnimation}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Login
                  </motion.button>
                </div>

              </Form>
              )}
            </Formik>
            <div className="bg-black w-full h-[1px]"></div>
            <div className="flex justify-center">
              <motion.button
                className="btn w-52 border-2 bg-[#c48221] hover:bg-[#8e601d] text-white"
                initial="hidden"
                animate="visible"
                variants={fadeAnimation}
                transition={{ delay: 0.8, duration: 0.6 }}
                onClick={() => window.location.href = "/register"}
              >
                Sign up
              </motion.button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
