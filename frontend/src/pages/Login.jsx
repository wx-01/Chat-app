import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Blend,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";



const Login = () => {
   const [showPassword, setSowPassword] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
    const { logIn, isLoging } = useAuthStore();
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      logIn(formData);
    };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="bg-base-200 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="bg-base-100 border-1 border-primary w-full max-w-md space-y-8 rounded-4xl">
          {/*logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group/side">
              <div className="size-12 rounded-xl bg-primary/9 pt-1 flex items-center justify-center group-hover/side:bg-primary/20 transition-colors">
                <MessageSquare className="size-9 text-base-content" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Log In</h1>
              <p className="text-base-content/60">
                Welcome Back !!!
              </p>
            </div>
          </div>
          {/*form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex justify-center"
          >
            <fieldset className="fieldset w-sm p-4">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pointer-events-none z-10 flex items-center">
                  <Mail className="size-5" />
                </div>
                <input
                  type="email"
                  className="input input-bordered pl-10 w-full"
                  placeholder="Email@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pointer-events-none z-10 flex items-center">
                  <Lock className="size-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered pl-10 w-full"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setSowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isLoging}
            >
              {isLoging ? (
                <>
                  <Blend className="size-5 animate-spin mr-2" /> Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
            </fieldset>
          </form>
          <div className="text-center mb-2">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
       {/* right side */}
       <AuthImagePattern 
       title="Join Now!"
       subtitle="Connect with friends, share friends and stay in touch with your loved ones."
        />
    </div>
  );
  
}

export default Login