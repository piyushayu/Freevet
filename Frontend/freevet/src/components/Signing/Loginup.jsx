import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/services/Slice";

import { loginUser, signInWithGoogle, sendPasswordResetEmail } from "@/lib/auth";

function Loginimage() {
  return (
    <div className="w-full h-48 sm:h-64 md:h-full bg-white flex items-center justify-center border-none md:border-r border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <img 
        src="https://eczkxdnpwbohewsyikux.supabase.co/storage/v1/object/public/Images/Screenshot%20(2352).png" 
        className="w-full h-full object-cover" 
        alt="Login background" 
      />
    </div>
  )
}

function Loginform() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isResetMode, setIsResetMode] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleResetRequest = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { error } = await sendPasswordResetEmail(email)
      if (error) {
        setError(error.message)
      } else {
        setSuccessMessage("Password reset link has been sent to your email!")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError("An unexpected error occurred during Google sign in.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await loginUser(email, password)

      if (error) {
        setError(error.message)
      } else {
        dispatch(login({ userData: { email , id : data.user.id } }))
        navigate("/profile")
      }
    } catch (err) {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  if (isResetMode) {
    return (
      <Card className="w-full border-none shadow-none bg-transparent p-6 md:p-8 flex flex-col justify-center">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight">Reset your password</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Enter your email below to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleResetRequest}>
            <div className="flex flex-col gap-7">
              <div className="grid gap-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="h-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              {successMessage && (
                <p className="text-sm text-emerald-500 font-medium">{successMessage}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button type="submit" className="w-full h-10 font-medium" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground hover:text-white text-xs underline-offset-4 hover:underline"
                onClick={() => {
                  setIsResetMode(false)
                  setError(null)
                  setSuccessMessage(null)
                }}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent p-6 md:p-8 flex flex-col justify-center">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">Login to your account</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Enter your email below to Login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7">
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(true)
                    setError(null)
                    setSuccessMessage(null)
                  }}
                  className="ml-auto inline-block text-xs text-muted-foreground underline-offset-4 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Forgot your password?
                </button>
              </div>
              <Input
                id="login-password"
                type="password"
                required
                className="h-10"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button type="submit" className="w-full h-10 font-medium" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 font-medium flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Login with Google
            </Button>

            <div className="flex flex-row items-center justify-center text-xs text-muted-foreground mt-2">
              <span>Don't have any account?</span>
              <CardAction className="inline ml-1">
                <Link to="/signup"><Button variant="link" className="p-0 mb-0.5 text-primary underline-offset-4 hover:underline">
                  Signup
                </Button></Link>
              </CardAction>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Logincomponent() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8">
      {/* Unified Split Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden items-stretch">
        <Loginimage />
        <Loginform />
      </div>
    </div>
  )
}

export default Logincomponent;