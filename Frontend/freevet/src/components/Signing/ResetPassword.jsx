import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updatePassword } from "@/lib/auth";

function Resetimage() {
  return (
    <div className="hidden md:block h-full w-full">
      <img 
        src="https://eczkxdnpwbohewsyikux.supabase.co/storage/v1/object/public/Images/Screenshot%20(2352).png" 
        className="h-full w-full object-cover" 
        alt="Reset background" 
      />
    </div>
  )
}

function Resetform() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const errorMsg = params.get("error_description")
      if (errorMsg) {
        setError(decodeURIComponent(errorMsg.replace(/\+/g, ' ')))
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      setLoading(false)
      return
    }

    try {
      const { error } = await updatePassword(password)

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      }
    } catch (err) {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent p-6 md:p-8 flex flex-col justify-center">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">Create new password</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Type your new password below to update your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {success ? (
          <div className="flex flex-col gap-4 text-center">
            <p className="text-emerald-500 font-medium">Password updated successfully!</p>
            <p className="text-xs text-muted-foreground">Redirecting you to the login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-7">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  className="h-10"
                  placeholder="minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  className="h-10"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button type="submit" className="w-full h-10 font-medium" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
              <Link to="/login" className="mx-auto">
                <Button variant="link" className="text-muted-foreground hover:text-white text-xs p-0">
                  Cancel and go to login
                </Button>
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

function ResetPassword() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8">
      <div className=" w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl overflow-hidden items-stretch">
        <Resetimage />
        <Resetform />
      </div>
    </div>
  )
}

export default ResetPassword;
